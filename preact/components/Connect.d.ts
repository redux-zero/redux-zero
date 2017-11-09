import { Component } from "preact";
export default class Connect extends Component<any, {}> {
    unsubscribe: any;
    state: any;
    actions: {};
    componentWillMount(): void;
    componentWillUnmount(): void;
    getProps(): any;
    getActions(): {};
    update: () => void;
    render({children}: {
        children: any;
    }, state: any, {store}: {
        store: any;
    }): any;
}
