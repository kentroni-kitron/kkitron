import { ChangeEventHandler, InputHTMLAttributes } from 'react';

import { PropsWithClassName, useClassnames } from '@kkitron/shared/react-utils';

import './input.scss';

export type InputProps = PropsWithClassName<{
  id: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  label?: string;
  placeholder?: string;
  error?: string;
  value: string;
  setValue: (value: string) => void;
}>;

export function Input({
  id,
  type = 'text',
  className,
  label,
  placeholder,
  error,
  value,
  setValue,
}: InputProps) {
  const classNames = useClassnames(
    className,
    'kk-input',
    error && 'kk-input--error',
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setValue(event.target.value);
  };

  const withInfo = label || typeof error === 'string';

  return (
    <div className={classNames}>
      {withInfo && (
        <div className="kk-input__info">
          {label && (
            <label className="kk-input__label t-input-label-upp-14" htmlFor={id}>{
              label
            }</label>
          )}
          {error && (
            <span className="kk-input__error t-input-tech-12">{
              error
            }</span>
          )}
        </div>
      )}
      <input
        id={id}
        type={type}
        className="kk-input__element t-input-14"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};
