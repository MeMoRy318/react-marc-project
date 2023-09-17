import React, { FC, PropsWithChildren, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from '../../UI';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { movieAction } from '../../redux/slices';
import { MovieItem } from '../MovieItem/MovieItem';

import styles from './MoviesList.module.scss';

type IProps = PropsWithChildren;

const MoviesList: FC<IProps> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { movies, page, total_pages: totalPages } = useAppSelector(({ movieReducer }) => movieReducer);

    useEffect(() => {
        if (!movies.length) dispatch(movieAction.getAll(null));
    }, [dispatch]);

    const handleClickPagination = () => {
        dispatch(movieAction.getAll({ page: page + 1 }));
    };

    const handleClickSeeEverything = () => {
        navigate('/filter/28');
    };

    return (
        <>
            <div className={styles.buttonRow}>
                <Button onClick={handleClickSeeEverything}>See Everything</Button>
            </div>
            <div className={styles.movieRow}>
                {!!movies.length && movies.map((movie) => <MovieItem movie={movie} key={movie.id} />)}
            </div>
            <div className={styles.buttonCenter}>
                <Button onClick={handleClickPagination} disabled={page === totalPages}>
                    Show More
                </Button>
            </div>
        </>
    );
};

export { MoviesList };
