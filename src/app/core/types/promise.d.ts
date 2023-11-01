declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Promise<T> {
    toArray<T, U = Error>(this: Promise<T>): Promise<[U | null, T | undefined]>;
  }
}

export {};
