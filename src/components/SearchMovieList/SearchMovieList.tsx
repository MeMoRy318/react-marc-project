import React, { FC, PropsWithChildren, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import styles from '../FilterMovieList/FilterMovieList.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { searchAction } from '../../redux/slices';
import { FilterMovieItem } from '../FilterMovieItem/FilterMovieItem';
import { Pagination } from '../../UI';

interface IProps extends PropsWithChildren{
    query:string
}

const SearchMovieList: FC<IProps> = ({ query }) => {

    const { movies, page, totalPages } = useAppSelector(state => state.searchReducer);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams({ page: '1' });

    useEffect(() => {
        dispatch(searchAction.searchMovies({ query, page: +searchParams.get('page'), isQuerySearch: true }));
    }, [query, dispatch, searchParams]);

    return (
        <div className={styles.filterMovieList}>
            {!!movies.length && movies.map(value => <FilterMovieItem key={value.id} movie={value}/>)}
            {!!movies.length && <Pagination page={page} totalPages={totalPages}/>}
        </div>
    );
};

export { SearchMovieList };
