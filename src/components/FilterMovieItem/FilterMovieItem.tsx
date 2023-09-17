import React, { FC, memo, PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import { IMovies } from '../../interface';
import { StarsRating } from '../../UI';
import { urls } from '../../configs';
import image from '../../assets/img/imageNotFound.png';

import { useAppDispatch } from '../../hooks';

import { favoriteActions } from '../../redux/slices';

import styles from './FilterMovieItem.module.scss';
interface IProps extends PropsWithChildren {
    movie:IMovies
}

const FilterMovieItem: FC<IProps> = ({ movie }) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { title, poster_path: img, vote_average: rating, overview, release_date, id } = movie;

    const { inView, ref } = useInView({ triggerOnce: true, threshold: 0.1 });
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const result = pathname.includes('favorite');

    const [year] = release_date.split('-');
    const text = overview.substring(0, 140);

    const handleClickAddFavorite = (e:React.MouseEvent) => {
        e.stopPropagation();
        dispatch(favoriteActions.deleteOrAdd({ id, boolean: true }));
    };
    const handleClickDeleteFavorite = (e:React.MouseEvent) => {
        e.stopPropagation();
        dispatch(favoriteActions.deleteOrAdd({ id, boolean: false }));
    };
    return (
        <div ref={ref} className={styles.movie__row} onClick={() => navigate(`/movieInfo/${id}`)}>

            <div className={styles.movie__img}>
                <img src={
                    inView ?
                        !!img ? urls.posterUrl.base + img : image :
                        image
                } alt={title}/>
            </div>

            <div className={styles.movie__body}>
                <div className={styles.movie__title}>{title}</div>
                <div className={styles.movie__rating}>
                    <div>{year},</div>
                    <StarsRating rating={rating}/></div>
                <div className={styles.movie__text}>{text}</div>
            </div>

            <div className={styles.movie__btnBox}>
                {
                    !result ?
                        <button className={styles.movie__btn} onClick={handleClickAddFavorite}>Add Favorite</button>
                        :
                        <button className={styles.movie__btn} onClick={handleClickDeleteFavorite}>Delete Favorite</button>
                }
            </div>
        </div>
    );
};

const MemoizedFilterMovieItem = memo(FilterMovieItem);

export { MemoizedFilterMovieItem as FilterMovieItem };
