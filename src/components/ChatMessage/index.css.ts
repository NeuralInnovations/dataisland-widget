import { css } from 'lit';

export const styles = css`
  :host {
    flex-grow: 1;
    overflow-y: hidden;

    p {
      margin: 0;
    }

    --padding: 10px;
  }

  .messages {
    display: flex;
    flex-direction: column;
    height: calc(100% - (var(--input-height)) + var(--padding));
    height: calc(100% - 27px);
    gap: 10px;
    padding: var(--padding);
    border-radius: var(--dataisland-widget-inner-border-radius);
    background-color: #f3f4f6;
    overflow-y: scroll;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .messages::-webkit-scrollbar {
    display: none;
  }

  .messages__item {
    position: relative;
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
