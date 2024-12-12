import { LitElement, html } from 'lit';
import { styles } from './index.css';

export class ChatPlaceholder extends LitElement {
  static styles = styles;

  render() {
    return html`
      <div class="dataisland-widget__placeholder">
        <img
          class="dataisland-widget__placeholder-img"
          src="../../assets/dataisland-logo-secondary.svg"
        />
        <p class="dataisland-widget__placeholder-text">
          Я готов ответить на ваши вопросы
        </p>
      </div>
    `;
  }
}

customElements.define('chat-placeholder', ChatPlaceholder);
