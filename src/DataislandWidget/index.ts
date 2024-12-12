import { LitElement, html } from 'lit';
import { styles } from './index.css';
import { property, state } from 'lit/decorators.js';
import { vars } from '../styles/vars.css'

import {
  dataIslandApp,
  CustomCredential,
  DataIslandApp,
  Chat,
  ChatAnswerType,
  Answer,
} from '@neuralinnovations/dataisland-sdk';
import { ChatModel, ClientSignature, StorageVars, TokenFromKey } from '../types';

import '../components/ChatHeader';
import '../components/ChatButton';
import '../components/ChatInput';
import '../components/ChatMessage';
import '../components/ChatPlaceholder';
import { getTokenFromKey } from '../utils/api';

class DataislandWidget extends LitElement {
  @property({ type: String }) apiKey!: string;
  @property({ type: String }) apiUrl!: string;
  @property({ type: String }) buttonImageUrl = '../assets/dataisland-logo.svg';
  @property({ type: String }) title = 'Dataisland Chat';

  @state() private message: string = '';
  @state() private messages: any[] = []; // Answer[]
  @state() private isChatOpen: boolean = false;
  @state() private sdk: DataIslandApp | null = null;
  @state() private clientSignature: ClientSignature | null;
  @state() private tokenFromKey: TokenFromKey | null = null;
  @state() private isChatInitialised: boolean | false = false;
  @state() private chat: Chat | null = null;
  @state() private messageLoading: boolean = false;

  static styles = [vars, styles];

  constructor() {
    super();
    this.clientSignature = null;
    this.isChatInitialised = localStorage.getItem(StorageVars.userId) ? true : false;
  }

  async connectedCallback() {
    super.connectedCallback()

    // to prevent inisialising user shoud pressed "get starged" button or alreadt has chat 
    if (this.isChatInitialised) this.initializeChat()
  }

  private startChat() {
    this.isChatInitialised = true;
    this.initializeChat()
  }

  private generateClientSignature(): void {
    const userMetadata = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }

    let userId = localStorage.getItem(StorageVars.userId);
    
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem(StorageVars.userId, userId);
    }

    this.clientSignature = {
      userId,
      userName: 'Anonymous',
      userMetadata: Object.values(userMetadata).join()
    }
  }

  async createChat () {
    // create new chat if no chats
    const {current} = this.sdk?.organizations!;
    const currentChats = this.sdk?.organizations.get(current)?.chats.collection;

    if (currentChats?.length) {
      this.chat = currentChats[0]
      const messages = await this.getMessagesDialog(this.chat.id) as Answer[]
      console.log('messages', messages)
    } else {
      const { current } = this.sdk?.organizations!
      const chat = await this.sdk?.organizations.get(current).chats.create(ChatModel.Dataisland, '')
      this.chat = chat || null;
    }
  }

  async initializeChat () {
    this.generateClientSignature()
    
    const {apiKey, apiUrl, clientSignature} = this;
    this.tokenFromKey = await getTokenFromKey(
      apiUrl,
      apiKey,
      clientSignature!.userId,
      clientSignature!.userName,
      clientSignature!.userMetadata
    )

    this.initializeSdk()
  }

  async initializeSdk () {
    if (this.apiUrl && this.tokenFromKey) {
      try {
        const {authSchemaName, userJwtToken} = this.tokenFromKey;

        this.sdk = await dataIslandApp('dataisland-client', async (builder) => {
          builder.useHost(this.apiUrl);
          builder.useCredential(
            new CustomCredential(authSchemaName, userJwtToken)
          );
        });

        console.log('this.sdk', this.sdk)

        this.createChat()
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
    this.messageLoading = true
    this.messages = [...this.messages,  {
      question: this.message,
      status: 0,
      id: String(Date.now()),
    }]
  }

  private async handleSendMessage() {
    if (!this.chat || this.message.trim() === '') return

    this.sendQuestionMessage()

    try {
      const answer = await this.chat.ask(this.message, ChatAnswerType.SHORT);

      answer?.subscribe(async (event) => {
        this.updateAnswer(event.data);
        if (this.messageLoading) this.messageLoading = false;
        console.log('event.data', event.data)
    });

    console.log(this.messages)

    } catch (error) {
      console.error('Failed to ask in chat:', error);
    } finally {
      this.message = '';
    }
  }

  updateAnswer = (answerData: any) => {
    const updatedMessages = [...this.messages];
    const lastMessageIndex = updatedMessages.length - 1;
    updatedMessages[lastMessageIndex] = {...answerData};
    this.messages = updatedMessages;
  };


  async getMessagesDialog (id: string): Promise<any | undefined> {
    if (!this.chat) {
      console.log('no chat', this.chat)
      return
    }

    try {
        this.messageLoading = true;

        const { current } = this.sdk?.organizations!;
        const messages = this.sdk?.organizations.get(current).chats.get(id).collection as Answer[];

        if (!messages) return

        this.messages = messages
        return messages;
    } catch (e: any) {
        console.log('error', e)
    } finally {
        this.messageLoading = false
    }
  };

  render() {
    return html`
      <div class="dataisland-widget">
  
        ${!this.isChatOpen ? html`
          <chat-button .buttonImageUrl="${this.buttonImageUrl}" @toggle-chat="${this.toggleChat}"></chat-button>
        ` : null}
        
               <!-- TODO: Make as slot -->
        <div class="dataisland-widget__popup ${this.isChatOpen ? 'open' : ''}">
          <chat-header 
            .title="${this.title}"
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
