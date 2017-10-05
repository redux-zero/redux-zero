/// <reference types="react" />
import * as React from "react";
export default function connect(mapToProps: any): (Child: any) => {
    new (props?: {}, context?: any): {
        state: any;
        update: () => void;
        getProps(): any;
        componentWillMount(): void;
        componentWillUnmount(): void;
        render(props: any, state: any, context: any): JSX.Element;
        setState<K extends never>(f: (prevState: {}, props: {}) => Pick<{}, K>, callback?: () => any): void;
        setState<K extends never>(state: Pick<{}, K>, callback?: () => any): void;
        forceUpdate(callBack?: () => any): void;
        props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<{}>, nextContext: any): void;
        shouldComponentUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUpdate?(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): void;
        componentDidUpdate?(prevProps: Readonly<{}>, prevState: Readonly<{}>, prevContext: any): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
    };
};
