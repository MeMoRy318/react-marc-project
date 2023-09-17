import React, { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { filterActions, genreAction } from '../../redux/slices';
import { createArrayYears } from '../../utility';

import { IFilterFormParams, IGenre } from '../../interface';

import styles from './FilterForm.module.scss';

type IProps = {};

const FilterForm: FC<IProps> = () => {
    const { register, handleSubmit, reset } = useForm<IFilterFormParams>();

    const { genres } = useAppSelector((state) => state.genreReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const years = createArrayYears().sort((a, b) => b - a);

    useEffect(() => {
        if (!genres.length) dispatch(genreAction.getAll());
    }, [dispatch, genres]);

    const onSubmit: SubmitHandler<IFilterFormParams> = (data) => {
        navigate(`/filter/${data.with_genres}`);
        dispatch(filterActions.addParams(data));
    };

    const renderGenreOptions = (genre: IGenre) => (
        <option key={genre.id} value={genre.id}>
            {genre.name}
        </option>
    );

    const resetForm = () => {
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.filterForm}>
            <section className={styles.filterForm__sticky}>
                <h1>All movies</h1>
                <p className={styles.filterForm__text}>A selection of films from around the world</p>
                <div className={`${styles.filterForm__inputBoxSort}`}>
                    <h2 className={styles.filterForm__title}>Release year</h2>
                    <select className={styles.filterForm__inputSort} {...register('primary_release_year')}>
                        <option value="">All years</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.filterForm__inputBoxVote}>
                    <h2 className={styles.filterForm__title}>Vote average</h2>
                    <input
                        className={styles.filterForm__inputVote}
                        type="number"
                        min={1}
                        max={10}
                        defaultValue={1}
                        {...register('vote_average.gte')}
                    />
                    <input
                        className={styles.filterForm__inputVote}
                        type="number"
                        min={1}
                        max={10}
                        defaultValue={10}
                        {...register('vote_average.lte')}
                    />
                </div>

                <div className={styles.filterForm__inputBoxSort}>
                    <h2 className={styles.filterForm__title}>Sort by</h2>
                    <select className={styles.filterForm__inputSort} {...register('sort_by')} defaultValue="popularity.asc">
                        <option value="popularity.desc">Popularity</option>
                        <option value="vote_count.desc">Vote count</option>
                        <option value="vote_average.desc">Rating</option>
                    </select>
                </div>

                <div className={`${styles.filterForm__inputBoxSort}`}>
                    <h2 className={styles.filterForm__title}>Genres</h2>
                    <select className={styles.filterForm__inputSort} {...register('with_genres')}>
                        <option value={28} defaultChecked={true}>All genres</option>
                        {!!genres.length && genres.map(renderGenreOptions)}
                    </select>
                </div>

                <div className={styles.filterForm__buttonBox}>
                    <button className={styles.filterForm__buttonApply} type="submit">
                        Apply
                    </button>
                    <button className={styles.filterForm__buttonReset} type="button" onClick={resetForm}>
                        Reset
                    </button>
                </div>
            </section>
        </form>
    );
};

export { FilterForm };
