import { PropsWithClassName, useClassnames } from '@kkitron/shared/utils';

import './spinner.scss';

export type SpinnerProps = PropsWithClassName<{
  size?: number;
  boldness?: number;
}>;

export function Spinner({ className, size = 6, boldness = 0.5 }: SpinnerProps) {
  const classNames = useClassnames(className, 'kk-spinner');
  const styles = {
    width: `${size}rem`,
    height: `${size}rem`,
    borderWidth: `${boldness}rem`,
  };

  return (
    <div
      className={classNames}
      style={styles}
    ></div>
  );
};
