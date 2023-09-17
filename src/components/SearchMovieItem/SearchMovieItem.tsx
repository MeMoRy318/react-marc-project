import React, { FC, PropsWithChildren } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

import { IMovies } from '../../interface';
import { StarsRating } from '../../UI';
import { urls } from '../../configs';
import image from '../../assets/img/imageNotFound.png';

import styles from './SearchMovieItem.module.scss';
interface IProps extends PropsWithChildren {
    movie: IMovies
    callback:() => void
}

const SearchMovieItem: FC<IProps> = ({ movie, callback }) => {

    const navigate = useNavigate();
    const { inView, ref } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { poster_path, title, overview, vote_average, release_date, id } = movie;
    const text = overview.split(' ').splice(0, 14).join(' ');

    const handleClick = () => {
        callback();
        navigate(`/movieInfo/${id}`);
    };

    return (
        <div ref={ref} className={styles.movieItem} onClick={handleClick}>
            <img className={styles.movieItem__image}
                src={
                    inView ?
                        poster_path ? urls.posterUrl.base + poster_path : image :
                        image
                }
                alt={title}
            />
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
