import {
  ButtonHTMLAttributes,
  MouseEventHandler,
  PropsWithChildren,
} from 'react';

import { PropsWithClassName, useClassnames } from '@kkitron/shared/react-utils';

import { Spinner } from '../spinner';

import './button.scss';

export type ButtonProps = PropsWithChildren<PropsWithClassName<{
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  text?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}>>;

export function Button({
  className,
  children,
  type,
  text,
  disabled,
  loading,
  onClick,
}: ButtonProps) {
  const classNames = useClassnames(
    className,
    'kk-button',
    't-button-upp-20',
    disabled && 'kk-button--disabled',
    loading && 'kk-button--loading',
  );

  const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
    if (disabled || !onClick) {
      return;
    }

    onClick(event);
  };

  return (
    <button
      type={type}
      className={classNames}
      onClick={handleClick}
    >
      <div className="kk-button__text">{children || text}</div>
      {loading && <Spinner size={6.5} className="ml-4" />}
    </button>
  );
};
