export default interface Store<S = any> {
  middleware(...args: any[]): void;
  setState(f: ((state: S) => Partial<S>) | Partial<S>): void;
  subscribe(f: Function): () => void;
  getState(): S;
  reset(): void;
};
