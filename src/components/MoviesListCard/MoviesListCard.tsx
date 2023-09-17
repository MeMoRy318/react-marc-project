import React, { FC, PropsWithChildren, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { movieAction } from '../../redux/slices';
import { MovieInfo } from '../MovieInfo/MovieInfo';

import { PosterList } from '../PosterList/PosterList';

import { Player } from '../../UI';

import styles from './MoviesListCard.module.scss';

interface IProps extends PropsWithChildren{
    movieId:string
}

const MoviesListCard: FC<IProps> = ({ movieId }) => {

    const { movie } = useAppSelector(state => state.movieReducer);
    const dispatch = useAppDispatch();
    const [trigger, setTrigger] = useState<boolean>(false);

    useEffect(() => {
        dispatch(movieAction.getById({ id: +movieId }));
    }, [movieId, dispatch]);

    return (
        <div className={styles.moviesList}>
            {trigger && <Player trigger={setTrigger} id={+movieId}/>}
            {!!movie && <MovieInfo movie={movie} trigger={setTrigger}/>}
            {!!movie &&  <PosterList id={movieId}/>}
        </div>
    );
};

export { MoviesListCard };
