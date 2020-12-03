import React, { FC } from 'react';
import { FieldError } from 'react-hook-form/dist/types';
import './FormField.sass';
import classNames from 'classnames';

export interface FormFieldProps {
  /** 输入框的 label */
  label?: string
  /** 表单验证错误 */
  error?: FieldError
  /** 如果为true，会在label后显示一个红色的"*" */
  required?: boolean
  /** 输入项说明 */
  help?: string
  /** 加载中 */
  loading?: boolean
}

/**
 * 统一输入框容器，带有label和错误提示
 */
const FormField: FC<FormFieldProps> = ({ label, loading, children, error, required = false, help }) => {
  return (
    <div className="field">
      {label && <label className={classNames('label', { 'is-danger': error })}>
        {label}
        {required && <span className="required-star is-danger ml-1">*</span>}
      </label>}
      <div className={classNames('control', { 'is-loading': loading })}>
        {children}
      </div>
      {help && <p className="help">{help}</p>}
      {error && <p className="help is-danger">{error.message}</p>}
    </div>
  );
};

export default FormField;
