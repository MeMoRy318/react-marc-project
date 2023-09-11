import React, { FC, PropsWithChildren } from 'react';

import { IMovies } from '../../interface';
import { StarsRating } from '../../UI';
import { urls } from '../../configs';

import styles from './SearchMovieItem.module.scss';

interface IProps extends PropsWithChildren {
    movie: IMovies
}

const SearchMovieItem: FC<IProps> = ({ movie }) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { poster_path, title, overview, vote_average, release_date } = movie;
    const text = overview.split(' ').splice(0, 14).join(' ');

    return (
        <div className={styles.movieItem}>
            <img className={styles.movieItem__image} src={poster_path ? urls.posterUrl.base + poster_path : urls.notFoundPoster.base} alt={title} />
            <div className={styles.movieItem__info}>
                <h2 className={styles.movieItem__title}>{title}</h2>
                <div className={styles.movieItem__details}>
                    <span className={styles.movieItem__label}>Realise</span>
                    <span className={styles.movieItem__date}>{release_date}</span>
                </div>
                <div className={styles.movieItem__details}>
                    <span className={styles.movieItem__label}>Rating</span>
                    <StarsRating rating={vote_average}/>
                </div>
                <div className={styles.movieItem__details}>
                    <span>{text}</span>
                </div>
            </div>
        </div>
    );
};

export { SearchMovieItem };
