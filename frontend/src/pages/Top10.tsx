import React, { FC } from 'react';
import Card from '../components/Card';
import Container from '../components/Container';
import { useApi } from '../common/use-api';
import DataApi from '../services/data';
import BilibiliUserTable from '../components/BilibiliUserTable';

const Top10: FC = () => {
  const [data, isLoading] = useApi(DataApi.top10);

  return (
    <Container className="py-5">
      <Card loading={isLoading} placeholderHeight={400}>
        <h1 className="title">Bilibili 最火 UP 主</h1>
        <BilibiliUserTable loading={isLoading} data={data} />
      </Card>
    </Container>
  );
};

export default Top10;
