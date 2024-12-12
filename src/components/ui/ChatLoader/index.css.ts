import {css} from 'lit';

export const styles = css`
    .loader {
      text-align: center;
      margin: 10px 0;
    }

    .loader span {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin: 0 2px;
      background-color: #007bff;
      border-radius: 50%;
      animation: loader 1.4s infinite ease-in-out both;
    }

    .loader span:nth-child(1) {
      animation-delay: -0.32s;
    }

    .loader span:nth-child(2) {
      animation-delay: -0.16s;
    }

    @keyframes loader {
      0%, 80%, 100% {
        transform: scale(0);
      }
      40% {
        transform: scale(1);
      }
    }
  `;