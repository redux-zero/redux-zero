declare class Svelte {
    constructor(options: { target: Element, data?: any });

    get(name: string);
    set(data: any);

    on(
        eventName: string,
        callback?: (event?: any) => any)
        : () => { cancel: () => any };

    fire(eventName: string, event?: any);

    observe(
        name: string,
        callback: (newValue?, oldValue?) => any,
        options?: { init?: boolean, defer?: boolean })
        : () => { cancel: () => any };

    teardown();
}
