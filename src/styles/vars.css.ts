import { css } from 'lit';

// default css variables
export const vars = css`
  :host {
    --primary-color: #007bff;
    --secondary-color: #6c757d;

    --input-height: 37px;

    --dataisland-widget-transition-duration: 0.2s;

    --dataisland-widget-font-family: 'Roboto', sans-serif;
    --dataisland-widget-font-color: #333;

    --dataisland-widget-color-transition: color
      var(--dataisland-widget-transition-duration) ease-in-out;

    /* popup */
    --dataisland-widget-popup-border-radius: 10px;

    /* inner */
    --dataisland-widget-inner-border-radius: 10px;

    --dataisland-widget-position-button: 20px;

    /* header */
    --dataisland-widget-header-close-color: #9b9c9f;
    --dataisland-widget-header-close-color-hover: #cccdd0;
  }
`;
