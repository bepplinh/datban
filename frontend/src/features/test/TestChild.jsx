import React from "react";

const TestChild = React.memo(({ onClick }) => {
  console.log("Child render");
  return <button onClick={onClick}>Say Hello</button>;
});

export default TestChild;