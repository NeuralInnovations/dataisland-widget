import { css } from 'lit';

export const styles = css`
  .dataisland-widget-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
  }

  .dataisland-widget-header__title {
    flex-grow: 1;
    text-align: center;
    width: 100%;
    margin: 0;
    font-size: 1rem;

  }
  .dataisland-widget-header__close {
    color: var(--dataisland-widget-header-close-color);
    cursor: pointer;
    transition: color 0.2s ease-in-out;
  }
  .dataisland-widget-header__close:hover {
    color: var(--dataisland-widget-header-close-color-hover);
  }
`;
