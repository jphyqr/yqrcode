import React, { useContext, useEffect, useRef } from "react";
import { ScrollableProvider, ScrollableContext } from "./ScrollableProvider";
const LockedDiv = ({ children, iosMobileScroll }) => {
  const elementRef = useRef(null);

  const [setNonScrollable, nonScrollableDivs] = useContext(ScrollableContext);

  //   useEffect(() => {
  //     const unregisterNonScrollableDiv = iosMobileScroll.registerNonScrollableDiv(
  //       elementRef.current
  //     );

  //     return unregisterNonScrollableDiv();
  //   }, []);

  useEffect(
    (e) => {
      console.log("Nested Div UE", elementRef.current);
      setNonScrollable([elementRef.current]);
    },
    [elementRef]
  );

  return (
    <div ref={elementRef} className="className">
      {children}
    </div>
  );
};

export default LockedDiv;
