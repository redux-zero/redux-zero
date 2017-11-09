import { Component } from "preact";
import Props from "../../interfaces/Props";
import Store from "../../interfaces/Store";
export default class Provider extends Component<Props, {}> {
    getChildContext(): {
        store: Store;
    };
    render(): JSX.Element;
}
