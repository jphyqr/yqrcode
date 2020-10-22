const { useEffect, useState } = require("react");

const useOutsideClick = (node, onOutsideClick) => {
  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      console.log("inside click");
      return;
    }
    // outside click
    console.log("outsider click");
    onOutsideClick();
  };

  useEffect(() => {
    // add whn mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return;
};

const useScreenWidth = () => {
  const [width, setWidth] = useState(0);
  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  }, [width]);

  return [width];
};

export { useOutsideClick, useScreenWidth };
rsf;
