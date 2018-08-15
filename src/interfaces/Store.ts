export default interface Store {
  middleware(...args: any[]): void;
  setState(f: any): void;
  subscribe(f: () => any): any;
  getState(): object;
  reset(): void;
};
