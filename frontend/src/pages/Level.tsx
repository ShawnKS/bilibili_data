import React, { FC } from 'react';
import Card from '../components/Card';
import Container from '../components/Container';
import { useApi } from '../common/use-api';
import DataApi from '../services/data';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { colors } from '../common/styles';

const Level: FC = () => {
  const [data, isLoading] = useApi(DataApi.level);

  return (
    <Container className="py-5">
      <Card loading={isLoading} placeholderHeight={400} className="has-text-centered">
        <h1 className="title">Bilibili 用户等级统计</h1>
        {data ? <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Area dataKey="value" fill={colors.blue} />
          </AreaChart>
        </ResponsiveContainer> : '出错了'}
      </Card>
    </Container>
  );
};

export default Level;
