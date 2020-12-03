import React, { FC, useCallback, useContext, useState } from 'react';
import Container from '../components/Container';
import Card from '../components/Card';
import UserContext, { User, UserActionTypes } from '../store/user-context';
import useForm from 'react-hook-form';
import AuthApi from '../services/auth';
import FormField from '../components/FormField';
import Input from '../components/Input';
import classNames from 'classnames';

type FormValues = Omit<User, 'username'>;

const UserCenter: FC = () => {
  const { state: { user }, dispatch: dispatchUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const { username, ...defaultValues } = user || {};
  const form = useForm<FormValues>({ defaultValues });
  const { handleSubmit, errors, register } = form;

  const handleFormSubmit = useCallback(handleSubmit(async (values: FormValues) => {
    if (!user) { return; }
    // 极其愚蠢的数据处理
    if (typeof values.gender === 'string') {
      values.gender = parseInt(values.gender, 10);
    }
    setIsLoading(true);
    try {
      await AuthApi.updateUser(values);
      dispatchUser({
        type: UserActionTypes.CommitUser,
        payload: {
          username: user.username,
          ...values,
        },
      });
      alert('用户数据更新成功');
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  }), [handleSubmit, user]);

  const hasError = !!errors.gender || !!errors.name || !!errors.email || !!errors.sign;

  return (
    <Container className="py-5">
      <Card>
        <h1 className="title">修改用户信息</h1>
        <form onSubmit={handleFormSubmit}>
          <FormField label="用户名">
            <input className="input" value={username} disabled/>
          </FormField>

          <FormField label="性别">
            <div className="select is-fullwidth is-rounded">
              <select name="gender" ref={register}>
                <option value="1">男</option>
                <option value="0">女</option>
              </select>
            </div>
          </FormField>

          <Input label="昵称"
                 fieldName="name"
                 min={6}
                 max={16}
                 form={form}
                 disabled={isLoading}
                 loading={isLoading}/>
          <Input label="签名"
                 fieldName="sign"
                 max={255}
                 form={form}
                 disabled={isLoading}
                 loading={isLoading}/>
          <Input label="邮箱"
                 fieldName="email"
                 form={form}
                 type="email"
                 disabled={isLoading}
                 loading={isLoading}/>
          <button className={classNames('button is-primary mt-4', { 'is-loading': isLoading })}
                  type="submit"
                  disabled={isLoading || hasError}>
            保存修改
          </button>
        </form>
      </Card>
    </Container>
  );
};

export default UserCenter;
