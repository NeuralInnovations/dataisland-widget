import { css } from 'lit';

export const styles = css`
    .dataisland-widget {
      --border-color: #000;
      --background-color: #f0f0f0;
    }
    :host {
      font-family: 'Roboto', sans-serif;
      color: #333;
    }

    /* Стиль для попапа */
    .dataisland-widget__popup {
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

    .dataisland-widget__popup.open {
      transform: scale(1);
    }

    .messages {
        display: flex;
        flex-direction: column;
        gap: 10px;
        flex-grow: 1;
        overflow-y: auto;
        margin-bottom: 10px;
        padding: 10px;
        background-color: #f3f4f6;
    }
    .messages__item {
        position: relative;
        display: flex;
        justify-content: flex-start;
        padding: 0.3rem;
        border-radius: 10px 0 10px 10px;
        white-space: normal;
        background: #fff;
        margin-right: auto;
    }
    .messages__item:nth-child(odd) {
        justify-content: flex-end;
        margin-left: auto;
        margin-right: 0;
    }
    .dataisland-widget__placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .dataisland-widget__placeholder-img {
        width: 50px;
    }
  `;