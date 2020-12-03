import React, { FC } from 'react';
import './Loading.sass';

export interface LoadingProps {
  title?: string;
  subtitle?: string;
}

const Loading: FC<LoadingProps> = ({ title, subtitle }) => {
  return (
    <div className="has-text-centered">
      <div className="loading mb-3">
        <span/><span/><span/><span/><span/>
      </div>
      {title && <p className="title is-4">{title}</p>}
      {subtitle && <p className="subtitle is-6">{subtitle}</p>}
    </div>
  );
};

export default Loading;
