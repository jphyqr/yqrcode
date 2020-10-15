import React from "react";

const HorizontalSpacer = ({ width }) => {
  return (
    <div className="spacer">
      <style jsx>
        {`
          .spacer {
            width: ${width}px;
          }
        `}
      </style>
    </div>
  );
};

export default HorizontalSpacer;
