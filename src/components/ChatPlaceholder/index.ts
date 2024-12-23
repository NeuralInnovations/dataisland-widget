import { LitElement, html } from 'lit';
import { styles } from './index.css';
import logoSecondary from '../../../public/dataisland-logo-secondary.svg';
import { localized, msg } from '@lit/localize';

@localized()
class ChatPlaceholder extends LitElement {
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
          ${msg('I am ready to answer your questions.')}
        </p>
      </div>
    `;
  }
}

customElements.define('chat-placeholder', ChatPlaceholder);
