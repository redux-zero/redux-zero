export default function createStore(state?: {}): {
    setState(update: any): void;
    subscribe(f: any): void;
    unsubscribe(f: any): void;
    getState(): {};
};
