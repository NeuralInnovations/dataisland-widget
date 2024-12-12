import { css } from 'lit';

export const styles = css`
  :host {
    --dataisland-widget-position-button: 20px;
  }

  .dataisland-widget-button {
    position: fixed;
    bottom: var(--dataisland-widget-position-button);
    right: 20px;
    /* background-color: #007bff; */
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
  }

  .dataisland-widget-button img {
    width: 90%
  }

  .dataisland-widget-button:hover {
    background-color: #daecff;
  }
`;
