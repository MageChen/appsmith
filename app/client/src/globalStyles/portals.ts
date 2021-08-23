import { createGlobalStyle } from "styled-components";
import { Layers } from "constants/Layers";
import { Classes } from "@blueprintjs/core";

export const PortalStyles = createGlobalStyle`
  #header-root {
    position: relative;
    z-index: ${Layers.header};
  }
  
  #tooltip-root {
    position: absolute;
    top: 0;
    width: 100vw;
    z-index: ${Layers.max};
  }

  .bp3-portal {
    z-index: ${Layers.portals};
  }

  .bp3-overlay-backdrop {
    background: unset;
  }

  .t--global-search-modal {
    box-shadow: 0px 4px 25px 10px rgba(0,0,0,0.25);
  }

  .file-picker-dialog.bp3-dialog .${Classes.DIALOG_BODY} {
    padding: 0;
  }

  .bp3-portal.inline-comment-thread {
    z-index: ${Layers.appComments};
  }
`;
