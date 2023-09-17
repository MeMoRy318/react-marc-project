import React, { FC, PropsWithChildren, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { filterActions } from '../../redux/slices';
import { FilterMovieItem } from '../FilterMovieItem/FilterMovieItem';

import { Pagination } from '../../UI';


import styles from './FilterMovieList.module.scss';

interface IProps extends PropsWithChildren{
    id:string
}

const FilterMovieList: FC<IProps> = ({ id }) => {

    const { movies, page, totalPage, params } = useAppSelector(state => state.filterReducer);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams({ page: '1' });

    useEffect(() => {
        if (params) {
            dispatch(filterActions.getFilterMovie({
                ...params,
                with_genres: id,
                page: +searchParams.get('page'),
                'vote_average.gte': +params.vote_average.gte,
                'vote_average.lte': +params.vote_average.lte,
            }));
        }else {
            dispatch(filterActions.getFilterMovie({ with_genres: id, page: +searchParams.get('page') }));
        }
    }, [id, dispatch, searchParams, params]);

    return (
        <div className={styles.filterMovieList}>
            {movies.length > 0 ? (
                movies.map((value) => <FilterMovieItem key={value.id} movie={value} />)
            ) : (
                <p>No movies found.</p>
            )}
            {movies.length > 0 && <Pagination page={page} totalPages={totalPage} />}
        </div>
    );
};

export { FilterMovieList };
