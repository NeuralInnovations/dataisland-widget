import { LitElement, html } from 'lit';
import { styles } from './index.css';
import logoSecondary from '../../assets/dataisland-logo-secondary.svg';

export class ChatPlaceholder extends LitElement {
  static styles = styles;

  render() {
    return html`
      <div class="dataisland-widget__placeholder">
        <img
          class="dataisland-widget__placeholder-img"
          src="${logoSecondary}"
          alt="logo"
        />
        <p class="dataisland-widget__placeholder-text">
          Я готовий відповісти на ваші питання
        </p>
      </div>
    `;
  }
}

customElements.define('chat-placeholder', ChatPlaceholder);
