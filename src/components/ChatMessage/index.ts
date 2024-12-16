import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { styles } from './index.css';
import MarkdownIt from 'markdown-it';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import '../ChatPlaceholder';
import '../ChatMessageLoader';

class ChatMessages extends LitElement {
  @property({ type: Array }) messages: any[] = [];
  @property({ type: Boolean }) loading: boolean = true;

  private markdown = new MarkdownIt(); // Создание экземпляра MarkdownIt

  @query('.messages') private messagesContainer!: HTMLElement;

  static styles = styles;
  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    if (
      (changedProperties.has('messages') || changedProperties.has('loading')) &&
      this.messages.length
    ) {
      this.scrollToBottom();
    }
  }

  private scrollToBottom() {
    console.log('scrollToBottom');
    if (this.messagesContainer) {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
  }

  render() {
    return html`
      <div class="messages">
        ${this.messages.length === 0
          ? html`<chat-placeholder></chat-placeholder>`
          : this.messages.map((msg: any, i: number) => {
              return html`
                <div class="messages__item">${msg._question}</div>

                ${this.loading && i === this.messages.length - 1
                  ? html`<div class="messages__item">
                      <chat-message-loader></chat-message-loader>
                    </div>`
                  : html`
                      <div class="messages__item">
                        ${unsafeHTML(this.markdown.render(msg._answer))}
                      </div>
                    `}
              `;
            })}
      </div>
    `;
  }
}

customElements.define('chat-messages', ChatMessages);
