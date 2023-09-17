import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from '../FilterMovieList/FilterMovieList.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { favoriteActions } from '../../redux/slices';
import { FilterMovieItem } from '../FilterMovieItem/FilterMovieItem';
import { Pagination } from '../../UI';

type IProps = PropsWithChildren

const FavoriteMovieList: FC<IProps> = () => {

    const { movies, page, totalPages } = useAppSelector(state => state.favoriteReducer);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams({ page: '1' });

    useEffect(() => {
        dispatch(favoriteActions.getAll({ page: +searchParams.get('page') }));
    }, [dispatch, searchParams]);

    return (
        <div className={styles.filterMovieList}>
            {!!movies.length && movies.map(value => <FilterMovieItem key={value.id} movie={value}/>)}
            {!!movies.length && totalPages > 1 && <Pagination page={page} totalPages={totalPages}/>}
        </div>
    );
};

export { FavoriteMovieList };
