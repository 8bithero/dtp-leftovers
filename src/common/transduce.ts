/* eslint-disable @typescript-eslint/no-explicit-any */
type fn = (...args: any[]) => void;

const comp = (f: fn, g: fn) => (x: fn) => f(g(x));

const compose = (...fs: fn[]) => fs.reduce(comp, (x: fn) => x);

const append = (xs: fn[], x: fn) => xs.concat([x]);

export const transduce =
  (...ts: fn[]) =>
  (xs: any) =>
    xs.reduce(ts.reduce(comp)(append), []);

export const filterer = (f: any) => (k: fn) => (acc: fn[], x: fn) =>
  f(x) ? k(acc, x) : acc;
