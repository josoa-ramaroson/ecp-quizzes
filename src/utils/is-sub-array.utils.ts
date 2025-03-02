export function isSubArray<T>(main: T[], sub: T[]) {
  let index = -1;
  return sub.every(
    (element) => (index = main.indexOf(element, index + 1)) !== -1,
  );
}
