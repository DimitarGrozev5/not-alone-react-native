export const toggle = <T>(condition: boolean, style: T) =>
  condition ? style : ({} as T);
