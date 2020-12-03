import React, { FC } from 'react';
import classNames from 'classnames';

export interface ContainerProps {
  className?: string;
}

const Container: FC<ContainerProps> = ({ className, children }) => (
  <div className={classNames('container', 'px-4', className)}>
    {children}
  </div>
);

export default Container;
