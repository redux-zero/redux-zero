import React from "react";
import { useSelector, useAction } from "redux-zero/react";

export default () => {
  const count = useSelector(({ count }) => count)

  const increment = useAction(({ count }) => ({ count: count + 1 }))
  const decrement = useAction(({ count }) => ({ count: count - 1 }))

  return (
    <div>
      <h1>{count}</h1>
      <div>
        <button onClick={increment}>increment</button>
        <button onClick={decrement}>decrement</button>
      </div>
    </div>
  )
};
