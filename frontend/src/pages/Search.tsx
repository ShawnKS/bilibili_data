import React, { FC, useCallback, useEffect, useState } from 'react';
import DataApi, { BilliUserData } from '../services/data';
import Container from '../components/Container';
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import BilibiliUserTable from '../components/BilibiliUserTable';
import { FaSearch } from 'react-icons/all';
import classNames from 'classnames';

const Search: FC = () => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [query, setQuery] = useState('');
  const [data, setData] = useState<BilliUserData[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = useCallback((query: string = '', page: number = 1) => {
    setIsLoading(true);
    DataApi.search(query, page)
      .then(({ items, pageCount }) => {
        setData(items);
        setPageCount(pageCount);
      })
      .catch(() => {})
      .finally(() => {
      setIsLoading(false);
    });
  }, []);

  const handleSearch = useCallback(() => {
    loadData(query, page);
  }, [page, query, loadData]);

  const handleTextChange = useCallback((evt) => {
    setQuery(evt.target.value);
  }, []);

  useEffect(loadData, [loadData]);

  const handlePageChange = useCallback((p: number) => {
    setPage(p);
    loadData(query, p);
  }, [loadData, query]);

  return (
    <Container className="py-5">
      <Card>
        <h1 className="title">搜索数据</h1>

        <div className="field has-addons">
          <div className={classNames('control is-expanded', { 'is-loading': isLoading })}>
            <input className="input"
                   onChange={handleTextChange}
                   value={query}
                   placeholder="输入关键词…"
                   disabled={isLoading} />
          </div>
          <div className="control">
            <button className={classNames('button is-primary', { 'is-loading': isLoading })}
                    onClick={handleSearch}
                    disabled={isLoading}>
              <span className="icon mr-0"><FaSearch /></span>
            </button>
          </div>
        </div>

        <hr/>

        <BilibiliUserTable data={data} loading={isLoading} />

        <hr/>

        {!isLoading && <Pagination currentPage={page} pageCount={pageCount} onChange={handlePageChange} />}
      </Card>
    </Container>
  );
};

export default Search;
