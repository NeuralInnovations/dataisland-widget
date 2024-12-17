import { LitElement, html } from 'lit';
import { styles } from './index.css';
import { property } from 'lit/decorators.js';
import { button } from '../../styles/components/chat-button.css';

export class ChatHeader extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: Boolean }) showLastChatButton = false;

  static styles = [button, styles];

  render() {
    return html` <div class="dataisland-widget-header">
      <div class="dataisland-widget-header__inner">
        ${this.showLastChatButton
          ? html`
              <button
                class="dataisland-widget-header__button"
                @click="${() => this.dispatchEvent(new Event('last-chat'))}"
                title="Will revert to the previous chat"
              >
                ${'Prev. chat'}
              </button>
            `
          : null}
        <h1 class="dataisland-widget-header__title">${this.title}</h1>
        <button
          class="dataisland-widget-header__button"
          @click="${() => this.dispatchEvent(new Event('new-chat'))}"
          title="The previous chat will be deleted after creating a new one"
        >
          ${'New chat'}
        </button>
      </div>

      <div
        class="dataisland-widget-header__close"
        @click="${() => this.dispatchEvent(new Event('toggle-chat'))}"
      >
        <svg
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.1667 5.83171C14.3048 5.96984 14.3824 6.15721 14.3824 6.35254C14.3824 6.54787 14.3048 6.73524 14.1667 6.87338L11.0417 9.99836L14.1667 13.1234C14.3048 13.2615 14.3824 13.4489 14.3824 13.6442C14.3824 13.8396 14.3048 14.0269 14.1667 14.165C14.0285 14.3032 13.8412 14.3808 13.6459 14.3808C13.4505 14.3808 13.2631 14.3032 13.125 14.165L10 11.04L6.87502 14.165C6.73684 14.3032 6.5495 14.3808 6.35418 14.3808C6.15882 14.3808 5.97147 14.3032 5.83335 14.165C5.69522 14.0269 5.61757 13.8396 5.61762 13.6442C5.61762 13.4489 5.69517 13.2615 5.83335 13.1234L8.95835 9.99836L5.83335 6.87336C5.69521 6.73522 5.61758 6.5479 5.61761 6.35252C5.6176 6.15719 5.69517 5.96987 5.83335 5.83169C5.97147 5.69356 6.1588 5.61599 6.35418 5.61596C6.54951 5.61598 6.73688 5.69355 6.87502 5.83169L10 8.95669L13.125 5.83171C13.2631 5.69358 13.4505 5.61599 13.6458 5.61598C13.8412 5.61596 14.0285 5.69359 14.1667 5.83171Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>`;
  }
}

customElements.define('chat-header', ChatHeader);
