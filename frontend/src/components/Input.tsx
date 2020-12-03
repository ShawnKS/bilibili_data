import React, { FC, HTMLProps } from 'react';
import useForm from 'react-hook-form';
import FormField from './FormField';
import { Validate } from 'react-hook-form/dist/types';
import classNames from 'classnames';

type Validator = Validate | Record<string, Validate>;

export interface InputProps {
  /** 最大位数 */
  max?: number;
  /** 最小位数 */
  min?: number;
  /** 正则验证 */
  pattern?: RegExp
  /** 正则验证失败的提示 */
  patternMessage?: string
  /** 是否为必填 */
  required?: boolean
  /** 字段的label，会用于label显示和自动生成的表单验证错误信息 */
  label?: string
  /** 字段名称 */
  fieldName: string
  /** 字段帮助提示文字 */
  help?: string
  /** React Hooks Form的表单 */
  form: ReturnType<typeof useForm>
  /** 自定义验证字段 */
  validate?: Validator | {
    value: Validator;
    message: string;
  }
  loading?: boolean;
}

type Props = Omit<Omit<Omit<Omit<HTMLProps<HTMLInputElement>, 'pattern'>, 'maxLength'>, 'minLength'>, 'form'> & InputProps

/**
 * 输入框，自带FormField包装
 */
const Input: FC<Props> = (props) => {
  const { max, min, loading, required = false, pattern, label, patternMessage, fieldName, form, validate, help, ...rest } = props;
  const { register, errors } = form;

  const title = `“${label || fieldName}”`;
  const ref = register({
    required: required && `${title}是必填的`,
    maxLength: typeof max !== 'undefined' ? { value: max, message: `${title}不能多于 ${max} 位` } : undefined,
    minLength: typeof min !== 'undefined' ? { value: min, message: `${title}不能少于 ${min} 位` } : undefined,
    pattern: typeof pattern !== 'undefined' ? { value: pattern, message: patternMessage || `${title}格式不正确` } : undefined,
    validate,
  });

  return (
    <FormField error={errors[fieldName]} label={label} required={required} help={help} loading={loading}>
      <input className={classNames('input', { 'is-danger': !!errors[fieldName] })}
             type="text"
             name={fieldName}
             maxLength={max}
             ref={ref}
             {...rest} />
    </FormField>
  );
};

export default Input;
