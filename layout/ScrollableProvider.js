import React, { useEffect, useState } from "react";

const ScrollableContext = React.createContext([{}, () => {}]);

const ScrollableProvider = (props) => {
  const [nonScrollableDivs, setNonScrollable] = useState([]);
  const [scrollableDivs, setScrollable] = useState([]);

  // useEffect(() => {
  //   console.log("here should we check? ", nonScrollableDivs);
  // }, [nonScrollableDivs]);

  useEffect(() => {
    const preventUnwantedScroll = (e) => {
      console.log("Entering preventUnwatd SCroll Check", e);
      const { target } = e;
      const isTargetScrollable = scrollableDivs.some((scrollableDiv) =>
        scrollableDiv.contains(target)
      );
      const isTargetScrollBlocked = nonScrollableDivs.some((nonScrollableDiv) =>
        nonScrollableDiv.contains(target)
      );
      if (isTargetScrollBlocked && !isTargetScrollable) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      return true;
    };

    console.log("Scrollable PRovider UE");
    const removeWindowTouchMoveListener = window.addEventListener(
      "touchmove",
      preventUnwantedScroll,
      {
        passive: false,
      }
    );

    return removeWindowTouchMoveListener;
  }, []);

  return (
    <ScrollableContext.Provider value={[setNonScrollable, nonScrollableDivs]}>
      {props.children}
    </ScrollableContext.Provider>
  );
};

export { ScrollableContext, ScrollableProvider };
