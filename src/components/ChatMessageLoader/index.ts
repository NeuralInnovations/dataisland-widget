import { LitElement, html } from 'lit';
import { styles } from './index.css';

export class ChatMessageLoader extends LitElement {
  static styles = styles;

  render() {
    return html`<div class="dataisland-widget-loader"></div>`;
  }
}

customElements.define('chat-message-loader', ChatMessageLoader);
