/// <reference types="react" />
import * as React from "react";
import Props from "../../interfaces/Props";
import Store from "../../interfaces/Store";
export default class Provider extends React.Component<Props, {}> {
    static childContextTypes: {
        store: (props: object, propName: string, componentName: string) => Error;
    };
    getChildContext(): {
        store: Store;
    };
    render(): React.ReactElement<any>;
}
