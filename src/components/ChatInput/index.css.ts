import { css } from 'lit';

export const styles = css`
  .input-area {
    display: flex;
    align-items: center;
  }

  .input-area textarea {
    flex-grow: 2;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid #ddd;
    margin-right: 10px;
    font-family: inherit;
    resize: none;
  }

  .input-area button {
    flex-grow: 1;
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 0;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .input-area button:hover {
    background-color: #0056b3;
  }
`;
