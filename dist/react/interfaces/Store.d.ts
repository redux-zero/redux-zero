export default interface Store {
    setState: Function;
    subscribe: Function;
    unsubscribe: Function;
    getState: Function;
}
