document.addEventListener(
  "keydown",
  (event) => {
    const keyName = event.key;
    if (keyName === "Control") {
      return;
    }
    if (event.ctrlKey) {
      // console.log(`Combination of ctrlKey + ${keyName}`);
    } else {
      // console.log(`Key pressed ${keyName}`);
      dispatch(keyName);
    }
  },
  false
);

document.addEventListener(
  "keyup",
  (event) => {
    const keyName = event.key;
    if (keyName === "Control") {
      // console.log("Control key was released");
    }
  },
  false
);
