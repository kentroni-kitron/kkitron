import { PropsWithChildren } from 'react';

import { PropsWithClassName, useClassnames } from '@kkitron/shared/utils';

import './card.scss';

export type CardProps = PropsWithChildren<PropsWithClassName<{
  title?: string;
}>>;

export function Card({ className, title, children }: CardProps) {
  const classNames = useClassnames(className, 'kk-card');

  return (
    <div className={classNames}>
      {title && <div className="kk-card__title t-title-main-upp-20">{title}</div>}
      <div className="kk-card__content">
        {children}
      </div>
    </div>
  );
};
