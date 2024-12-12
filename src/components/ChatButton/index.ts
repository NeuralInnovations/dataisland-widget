import { LitElement, html } from 'lit';
import { styles } from './index.css';
import { property } from 'lit/decorators.js';

export class ChatButton extends LitElement {
  @property ({type: String}) buttonImageUrl = ''

  static styles = styles

  render() {
    return html`
      <button class="dataisland-widget-button" @click="${() => this.dispatchEvent(new Event('toggle-chat'))}">
        <img src="${this.buttonImageUrl}"/>
      </button>
    `;
  }
}

customElements.define('chat-button', ChatButton);
