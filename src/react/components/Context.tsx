import * as React from "react";

let Context;

if ("createContext" in React) {
  Context = React.createContext(undefined);
} else {
  Context = {
    Provider: ({ children }) => React.Children.only(children)
  };
}

export default Context;
