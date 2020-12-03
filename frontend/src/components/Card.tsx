import React, { FC, ReactElement } from 'react';
import classNames from 'classnames';
import Loading from './Loading';
import './Card.sass';

export interface CardProps {
  cover?: string;
  header?: ReactElement;
  className?: string;
  loading?: boolean;
  placeholderHeight?: string | number;
}

const Card: FC<CardProps> = ({
  cover,
  children,
  className,
  header,
  loading,
  placeholderHeight,
}) => (
  <div className={classNames('card', className)}>
    {cover && <div className="card-image">
      <figure className="image is-4by3">
        <img src="https://bulma.io/images/placeholders/1280x960.png" alt=""/>
      </figure>
    </div>}
    <div className="card-content">
      {header && <div className="media">
        {header}
      </div>}

      <div className={classNames('card-content', { 'is-loading': loading })}
           style={{ height: loading ? placeholderHeight : undefined }}>
        {loading ? <Loading /> : children}
      </div>
    </div>
  </div>
);

export default Card;
