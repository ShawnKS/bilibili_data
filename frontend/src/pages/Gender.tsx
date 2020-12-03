import React, { FC } from 'react';
import Card from '../components/Card';
import Container from '../components/Container';
import { useApi } from '../common/use-api';
import DataApi from '../services/data';
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const Gender: FC = () => {
  const [data, isLoading] = useApi(DataApi.gender);

  return (
    <Container className="py-5">
      <Card loading={isLoading} placeholderHeight={400} className="has-text-centered">
        <h1 className="title">Bilibili 用户性别统计</h1>
        {data ? <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie data={data}
                 dataKey="value"
                 nameKey="name"
                 innerRadius="50%"
                 label
                 animationDuration={700} />
            <Tooltip/>
            <Legend/>
          </PieChart>
        </ResponsiveContainer> : '出错了'}
      </Card>
    </Container>
  );
};

export default Gender;
