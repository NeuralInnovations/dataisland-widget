import { LitElement, html } from 'lit';
import { styles } from './index.css';

class LoadingSpinner extends LitElement {
  static styles = styles;

  render() {
    return html`
      <div class="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
  }
}

customElements.define('loading-spinner', LoadingSpinner);
