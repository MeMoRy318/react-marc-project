import React, { FC, memo, PropsWithChildren } from 'react';

import { IMovie } from '../../interface';
import { urls } from '../../configs';
import { GenreBadge, StarsRating } from '../../UI';
import { useAppDispatch } from '../../hooks';
import { favoriteActions } from '../../redux/slices';

import styles from './MovieInfo.module.scss';

interface IProps extends PropsWithChildren{
    movie: IMovie
    trigger:React.Dispatch<React.SetStateAction<boolean>>
}

const MovieInfo: FC<IProps> = ({ movie, trigger }) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { title, vote_average, original_language, genres, budget, runtime, release_date, overview, id } = movie;

    const dispatch = useAppDispatch();

    const logoPatch = movie?.production_companies[0]?.logo_path ? urls.posterUrl.base + movie.production_companies[0].logo_path : urls.notFoundPoster.base;
    const backdropPath = movie?.poster_path ? urls.posterUrl.base + movie.poster_path : urls.notFoundPoster.base;
    const releaseDate = +release_date.split('-')[0];

    const handleClickPlay = () => {
        trigger(prevState => !prevState);
    };

    const handleClickAddFavorite = () => {
        dispatch(favoriteActions.deleteOrAdd({ id, boolean: true }));
    };

    return (
        <div className={styles.movieInfo}>
            <div style={{ backgroundImage: `url(${backdropPath})` }} className={styles.backdropPath}>

            </div>
            <div className={styles.content}>
                <div style={{ backgroundImage: `url(${logoPatch})` }} className={styles.logoPatch}></div>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.btn}>
                    <button onClick={handleClickPlay}>play</button>
                    <button onClick={handleClickAddFavorite}>favorite</button>
                </div>
                <div className={styles.description}>
                    <h2 className={styles.subTitle}>About the film</h2>
                    <div><span>Retying</span> <StarsRating rating={vote_average}/> </div>
                    <div><span>Countries</span> <span>{original_language}</span> </div>
                    <div><span>Genre</span> <div className={styles.genre}>{genres.map(value => <GenreBadge key={value.id} genre={value}/>)}</div> </div>
                    <div><span>Budget</span> <span>{budget}</span> </div>
                    <div><span>Runtime</span> <span>{runtime} min</span> </div>
                    <div><span>Release date</span> <span>{releaseDate}</span> </div>
                </div>
                <div className={styles.overview}>
                    <p>
                        <strong>Description</strong> {overview}
                    </p>
                </div>
            </div>
        </div>
    );
};

const MemoizedMovieInfo = memo(MovieInfo);

export { MemoizedMovieInfo as MovieInfo };
