export const first = <T>(theArray: T[]): T | undefined => {
  return theArray[0];
};

export const rest = <T>(theArray: T[]): T[] => {
  return theArray.slice(1);
};

export const reduce = <T, U>(
  reduceFn: (acc: U, value: T) => U,
  acc: U,
  theArray: T[],
): U =>
  theArray.length === 0
    ? acc
    : reduce(reduceFn, reduceFn(acc, first(theArray) as T), rest(theArray));

export const filter = <T>(filterFn: (item: T) => boolean, theArray: T[]): T[] =>
  reduce((acc: T[], x: T) => (filterFn(x) ? acc.concat(x) : acc), [], theArray);

/**
 * Para is a recursive function that takes a reduce function, an accumulator, and an array.
 *
 * Paramorphisms are a generalization of folds, which are a generalization of maps.
 *
 * This concept allows the folding function to not only operate on the accumulated value
 * and the current item (as in a typical fold or reduce operation)
 * but also to have access to the remainder of the structure being folded.
 * This can be particularly useful for operations where knowing the rest of the structure at each step is beneficial.
 */
export const para = <T, U>(
  reduceFn: (acc: U, current: T | undefined, restOfArray: T[]) => U,
  acc: U,
  theArray: T[],
): U =>
  theArray.length === 0
    ? acc
    : para(reduceFn, reduceFn(acc, first(theArray), theArray), rest(theArray));
