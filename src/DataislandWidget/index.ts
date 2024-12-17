import { LitElement, html } from 'lit';
import { styles } from './index.css';
import { property, state } from 'lit/decorators.js';
import { vars } from '../styles/vars.css';

import {
  dataIslandApp,
  CustomCredential,
  DataIslandApp,
  Chat,
  ChatAnswerType,
  Answer,
} from '@neuralinnovations/dataisland-sdk';
import {
  ClientSignature,
  CreateChatMode,
  StorageVars,
  TokenFromKey,
} from '../types';

import '../components/ChatHeader';
import '../components/ChatButton';
import '../components/ChatInput';
import '../components/ChatMessage';
import '../components/ChatPlaceholder';
import logo from '../../public/dataisland-logo.svg';
import { getTokenFromKey } from '../utils/api';
import { createChat, deleteChat, getChats } from '../utils/chat';

class DataislandWidget extends LitElement {
  @property({ type: String }) apiKey: string = '';
  @property({ type: String }) apiUrl: string = '';
  @property({ type: String }) buttonImageUrl = logo;
  @property({ type: String }) title = 'Dataisland Chat';

  @state() private message: string = '';
  @state() private messages: any[] = [];
  @state() private isChatOpen: boolean = false;
  @state() private sdk: DataIslandApp | null = null;
  @state() private clientSignature: ClientSignature | null;
  @state() private tokenFromKey: TokenFromKey | null = null;
  @state() private isChatInitialised: boolean | false = false;
  @state() private chat: Chat | null = null;
  @state() private chats: Chat[] | null = null;
  @state() private messageLoading: boolean = false;

  static styles = [vars, styles];

  private computedApiUrl(): string {
    return this.apiUrl ? this.apiUrl : import.meta.env.VITE_API_URL;
  }
  private computedApiKey(): string {
    return this.apiKey ? this.apiKey : import.meta.env.VITE_API_KEY;
  }

  constructor() {
    super();
    this.clientSignature = null;
    this.isChatInitialised = localStorage.getItem(StorageVars.userId)
      ? true
      : false;
  }

  async connectedCallback() {
    super.connectedCallback();
    if (this.isChatInitialised) this.initializeChat();
  }

  private startChat() {
    this.isChatInitialised = true;
    this.initializeChat();
  }

  private generateClientSignature(): void {
    const userMetadata = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    let userId = localStorage.getItem(StorageVars.userId);

    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem(StorageVars.userId, userId);
    }

    this.clientSignature = {
      userId,
      userName: 'Anonymous',
      userMetadata: Object.values(userMetadata).join(),
    };
  }

  async createChatHandler(mode: CreateChatMode) {
    const chats = getChats(this.sdk);
    this.chats = chats as Chat[];

    if (mode === CreateChatMode.initial) {
      if (chats?.length) {
        this.chat = chats[0];
      } else {
        this.chat = await createChat(this.sdk);
      }
    } else if (mode === CreateChatMode.new) {
      const prevChat = this.getPrevChat();

      if (!prevChat) throw Error('No previous chat.');

      await deleteChat(this.sdk, prevChat.id);
      this.chat = await createChat(this.sdk);
    }

    if (this.chat) (await this.getMessagesDialog(this.chat.id)) as Answer[];

    console.log('this.chats', this.chats);
  }

  getPrevChat(): Chat | null {
    return this.chats?.filter((chat) => chat.id !== this.chat?.id)[0] ?? null;
  }

  async revertChat() {
    const lasChat = this.getPrevChat();
    if (!lasChat) throw Error('no lastChat');

    this.chat = lasChat;
    this.getMessagesDialog(lasChat.id);
    console.log('lasChat', lasChat);
  }

  async initializeChat() {
    console.log('initializeChat');
    this.generateClientSignature();

    const { clientSignature } = this;
    this.tokenFromKey = await getTokenFromKey(
      this.computedApiUrl(),
      this.computedApiKey(),
      clientSignature!.userId,
      clientSignature!.userName,
      clientSignature!.userMetadata
    );

    this.initializeSdk();
  }

  async initializeSdk() {
    if (this.computedApiUrl && this.tokenFromKey) {
      try {
        const { authSchemaName, userJwtToken } = this.tokenFromKey;

        this.sdk = await dataIslandApp('dataisland-client', async (builder) => {
          builder.useHost(this.computedApiUrl());
          builder.useCredential(
            new CustomCredential(authSchemaName, userJwtToken)
          );
        });

        console.log('this.sdk', this.sdk);

        this.createChatHandler(CreateChatMode.initial);
      } catch (error) {
        console.error('Failed to initialize SDK:', error);
      }
    } else {
      console.error('apiUrl not provided');
    }
  }

  private toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  private sendQuestionMessage() {
    this.messageLoading = true;
    this.messages = [
      ...this.messages,
      {
        _question: this.message,
        status: 0,
        id: String(Date.now()),
      },
    ];
  }

  private async handleSendMessage() {
    if (!this.chat || this.message.trim() === '') return;

    this.sendQuestionMessage();

    try {
      const answer = await this.chat.ask(this.message, ChatAnswerType.SHORT);

      answer?.subscribe(async (event) => {
        this.updateAnswer(event.data);
        if (this.messageLoading) this.messageLoading = false;
        console.log('event.data', event.data);
      });

      console.log(this.messages);
    } catch (error) {
      console.error('Failed to ask in chat:', error);
    } finally {
      this.message = '';
    }
  }

  updateAnswer = (answerData: any) => {
    const updatedMessages = [...this.messages];
    const lastMessageIndex = updatedMessages.length - 1;
    updatedMessages[lastMessageIndex] = { ...answerData };
    this.messages = updatedMessages;
  };

  async getMessagesDialog(chatId: string): Promise<any | undefined> {
    if (!this.chat) {
      console.log('no chat', this.chat);
      return;
    }

    try {
      this.messageLoading = true;

      const currentOrgId = this.sdk?.organizations.current ?? '';
      const messages = this.sdk?.organizations
        .get(currentOrgId)
        .chats.get(chatId).collection as Answer[];

      if (!messages) return;

      this.messages = messages;
      return messages;
    } catch (e: any) {
      console.log('error', e);
    } finally {
      this.messageLoading = false;
    }
  }

  render() {
    return html`
      <div class="dataisland-widget">
        ${!this.isChatOpen
          ? html`
              <chat-button
                .buttonImageUrl="${this.buttonImageUrl}"
                @toggle-chat="${this.toggleChat}"
              ></chat-button>
            `
          : null}

        <div
          class="dataisland-widget__wrapper ${this.isChatOpen ? 'open' : ''}"
        >
          <chat-header
            .title="${this.title}"
            .showLastChatButton="${!!this.chats && this.chats?.length > 1}"
            @last-chat="${this.revertChat}"
            @new-chat="${() => this.createChatHandler(CreateChatMode.new)}"
            @toggle-chat="${this.toggleChat}"
          >
          </chat-header>

          <chat-messages
            .messages="${this.messages}"
            .loading="${this.messageLoading}"
          >
          </chat-messages>

          <chat-input
            .message="${this.message}"
            .isChatInitialised="${this.isChatInitialised}"
            @message-input="${(e: any) => (this.message = e.detail)}"
            @send-message="${this.handleSendMessage}"
            @start-chat="${this.startChat}"
          >
          </chat-input>
        </div>
      </div>
    `;
  }
}

customElements.define('dataisland-widget', DataislandWidget);
