export default interface Store {
  middleware(...args: any[]): void;
  setState(f: Function | object): void;
  subscribe(f: Function): () => void;
  getState(): object;
  reset(): void;
};
