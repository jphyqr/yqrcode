import React from "react";

import { dynamicComponents } from "../constants/types";

const ShowComponent = ({ component }) => {
  console.log("SHOW COMPONENT", component);
  const renderWidget = () => {
    let DynamicWidget;

    DynamicWidget = dynamicComponents[`${component}`];
    return <DynamicWidget />;
  };

  return (
    <div className="container">
      {renderWidget()}
      <style jsx>
        {`
          .container {
          }
        `}
      </style>
    </div>
  );
};

export default ShowComponent;
