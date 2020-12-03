import React, { FC, MouseEvent, useCallback } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/all';

/**
 * 生成从 start 到 end 的数组
 */
const range = (start: number, end: number): number[] => {
  const x = [];
  for (let i = start; i <= end; i++) {
    x.push(i);
  }
  return x;
};

export interface PaginationProps {
  /** 当前页码 */
  currentPage: number;
  /** 总页数 */
  pageCount: number;
  /** 页码改变时的回调 */
  onChange?: (page: number) => any
  className?: string
}

interface PageProps {
  page?: number;
  current?: number;
  handleChange?: (e: MouseEvent) => any
}

/**
 * 单个页码按钮
 */
const Page: FC<PageProps> = ({ page, current, handleChange }) => {
  if (!page) {
    return <li>
      <span className="pagination-ellipsis">
        <span className="icon"><FiMoreHorizontal /></span>
      </span>
    </li>;
  }

  return <li key={page}>
    <a className={`pagination-link${page === current ? ' is-current' : ''}`}
       aria-label={`前往第 ${page} 页`} onClick={handleChange} data-page={page}>
      {page}
    </a>
  </li>;
};

/**
 * 分页器
 */
const Pagination: FC<PaginationProps> = ({ currentPage, pageCount, onChange, className }) => {
  const handleChange = useCallback((e) => {
    const p = e.target.getAttribute('data-page');
    if (!p || isNaN(p)) return;
    const page = parseInt(p);
    if (!page || page <= 0 || page > pageCount || page === currentPage) return;
    onChange?.(page);
  }, [onChange, currentPage, pageCount]);

  if (pageCount === 1 && currentPage === 1) {
    return <></>;
  }

  const pageStart = currentPage - 2 >= 1 ? currentPage - 2 : 1;
  const pageEnd = currentPage + 2 > pageCount ? pageCount : currentPage + 2;

  return (
    <nav className={`pagination ${className}`} role="navigation" aria-label="pagination">
      {currentPage !== 1 && <a className="pagination-previous"
                               onClick={handleChange}
                               data-page={currentPage - 1}>
        <span className="icon mr-1"><FaArrowCircleLeft/></span>
        上一页
      </a>}
      {currentPage !== pageCount && <a className="pagination-next"
                                       onClick={handleChange}
                                       data-page={currentPage + 1}>
        下一页
        <span className="icon ml-1"><FaArrowCircleRight/></span>
      </a>}
      <ul className="pagination-list">
        {pageStart > 1 && <Page handleChange={handleChange} page={1} current={currentPage} />}
        {pageStart > 2 && <Page />}
        {range(pageStart, pageEnd).map((page) =>
          <Page handleChange={handleChange} page={page} current={currentPage} key={page} />)}
        {pageEnd < pageCount - 1 && <Page />}
        {pageEnd < pageCount && <Page handleChange={handleChange} page={pageCount} current={currentPage} />}
      </ul>
    </nav>
  );
};

export default Pagination;
