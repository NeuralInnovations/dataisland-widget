import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { styles } from './index.css';
import { msg } from '@lit/localize';

class ChatInput extends LitElement {
  @property({ type: String }) message: string = '';
  @property({ type: Boolean }) isChatInitialised: boolean = false;

  static styles = styles;

  private handleInput(e: Event) {
    this.message = (e.target as HTMLTextAreaElement).value;
    this.dispatchEvent(
      new CustomEvent('message-input', { detail: this.message })
    );
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        e.preventDefault();
        this.sendMessage();
      } else {
        e.preventDefault();
        this.sendMessage();
      }
    }
  }

  private sendMessage() {
    this.dispatchEvent(new Event('send-message'));
  }

  render() {
    return html`
      <div class="input-area">
        ${this.isChatInitialised
          ? html`
              <textarea
                .value="${this.message}"
                @input="${this.handleInput}"
                @keydown="${this.handleKeyDown}"
                rows="1"
              ></textarea>
              <button @click="${this.sendMessage}">Send</button>
            `
          : html`
              <button
                @click="${() => this.dispatchEvent(new Event('start-chat'))}"
              >
                ${msg('Get started')}
              </button>
            `}
      </div>
    `;
  }
}

customElements.define('chat-input', ChatInput);
