import React, { FC, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { useInView } from 'react-intersection-observer';

import { IMovies } from '../../interface';
import { urls } from '../../configs';

import image from '../../assets/img/imageNotFound.png';

import styles from './MovieItem.module.scss';
interface IProps extends PropsWithChildren {
    movie: IMovies
}

const MovieItem: FC<IProps> = ({ movie }) => {
    const navigate = useNavigate();
    const { inView, ref } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { poster_path, title, vote_average, release_date, id } = movie;
    const [year] = release_date.split('-');
    const isNew = +year === new Date().getFullYear();

    const handleClickNavigate = () => {
        navigate(`/movieInfo/${id}`);
    };

    return (
        <div ref={ref} className={styles.movie} onClick={handleClickNavigate}>
            <span className={`${styles.movie__vote_average} ${vote_average < 5 && styles.red}`}>
                {vote_average}
            </span>
            {isNew && <span className={styles.movie__badge}>NEW</span>}
            <img
                className={styles.movie__image}
                src={
                    inView ?
                        poster_path ? `${urls.posterUrl.base}${poster_path}` : urls.notFoundPoster.base :
                        image
                }
                alt={title}
            />
            <h2 className={styles.movie__title}>{title}</h2>
            <span className={styles.movie__release_date}>{year}, Movie</span>
        </div>
    );
};

export { MovieItem };
