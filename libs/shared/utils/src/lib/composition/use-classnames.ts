import * as classnames from 'classnames';

export type PropsWithClassName<P = unknown> = P & {
  className?: string;
};

export const useClassnames = (
  ...classNames: Array<string | undefined | null | boolean>
): string => {
  return classnames(...classNames);
};
