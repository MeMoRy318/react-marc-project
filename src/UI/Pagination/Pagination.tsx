import React, { FC, memo, PropsWithChildren, useMemo } from 'react';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { useSearchParams } from 'react-router-dom';

import { createPagesArrayNumber } from '../../utility';

import styles from './Pagination.module.scss';
interface IProps extends PropsWithChildren{
    page:number
    totalPages:number
}

const Pagination: FC<IProps> = ({ page, totalPages }) => {

    const pages = useMemo(() => {
        return  createPagesArrayNumber(totalPages, page);
    }, [page, totalPages]);
    const [query, setQuery] = useSearchParams({ page: '1' });

    return (
        <div className={styles.pagination}>
            <div className={styles.pagination__row}>

                <div className={styles.pagination__btnBox}>
                    <button
                        className={styles.pagination__btnPrev}
                        disabled={page === 1}
                        onClick={() => setQuery({ page: String(+query.get('page') - 1) } )}>
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <FaChevronLeft className={styles.pagination__icon}/>
                    </button>
                </div>

                <div className={styles.pagination__page}>
                    {pages.map(value =>
                        <span key={value} className={ value === page ? styles.active : 'default'} onClick={() => setQuery({ page: String(value) })}>
                            {value}
                        </span>)}
                </div>

                <div className={styles.pagination__btnBox}>
                    <button className={styles.pagination__btnPrev} disabled={page === totalPages} onClick={() => setQuery({ page: String(+query.get('page') + 1) })}>
                        <FaChevronRight className={styles.pagination__icon}/>
                    </button>
                </div>

            </div>
        </div>
    );
};
const MemoizedPagination = memo(Pagination);

export { MemoizedPagination as Pagination };
