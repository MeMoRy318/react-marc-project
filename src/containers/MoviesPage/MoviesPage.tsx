import React, { FC, PropsWithChildren } from 'react';

import { MoviesList, Slider } from '../../components';

import styles from './MoviesPage.module.scss';

type IProps = PropsWithChildren

const MoviesPage: FC<IProps> = () => {
    return (
        <>
            <Slider/>
            <div className={styles.movies}>
                <MoviesList/>
            </div>
        </>
    );
};

export default MoviesPage;
