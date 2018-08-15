export default interface Store {
  middleware(): void;
  setState(f: any): void;
  subscribe(f: () => any): any;
  getState(): object;
  reset(): void;
};
