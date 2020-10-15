import React from "react";

const VerticalSpacer = ({ height }) => {
  return (
    <span className="spacer">
      <style jsx>
        {`
          .spacer {
            min-height: ${height}px;
          }
        `}
      </style>
    </span>
  );
};

export default VerticalSpacer;
