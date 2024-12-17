import { css } from 'lit';

export const styles = css`
  :host {
    font-family: var(--dataisland-widget-font-family);
    color: var(--dataisland-widget-font-color);
    z-index: 1000;
  }

  .dataisland-widget__wrapper {
    position: fixed;
    bottom: var(--dataisland-widget-position-button);
    right: 20px;
    background-color: white;
    border-radius: 10px;
    width: 300px;
    height: 400px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    padding: 10px;
    display: flex;
    flex-direction: column;
    transform: scale(0);
    transition: transform 0.3s ease;
    transform-origin: bottom right;

    font-size: 0.8rem;
  }

  .dataisland-widget__wrapper.open {
    transform: scale(1);
  }
`;
