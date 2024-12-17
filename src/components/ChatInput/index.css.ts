import { css } from 'lit';

export const styles = css`
  .input-area {
    display: flex;
    align-items: center;
  }

  .input-area textarea {
    flex-grow: 2;
    padding: 10px;
    border-radius: var(--dataisland-widget-input-border-radius);
    border: 1px solid #ddd;
    margin-right: 10px;
    font-family: inherit;
    resize: none;
  }
`;
