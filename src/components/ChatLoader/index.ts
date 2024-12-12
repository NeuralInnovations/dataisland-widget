import { LitElement, html } from 'lit';
import { styles } from './index.css';

export class ChatLoader extends LitElement {
  static styles = styles;

  render() {
    return html`<div className="dataisland-widget-loader"></div>`;
  }
}

customElements.define('chat-loader', ChatLoader);
