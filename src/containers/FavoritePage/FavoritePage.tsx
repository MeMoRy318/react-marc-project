import React, { FC, PropsWithChildren } from 'react';

import styles from '../FilterMoviePage/FilterMoviePage.module.scss';
import { FavoriteMovieList, FilterForm } from '../../components';

type IProps = PropsWithChildren

const FavoritePage: FC<IProps> = () => {
    return (
        <div className={styles.filterMovie}>
            <FilterForm/>
            <FavoriteMovieList/>
        </div>
    );
};

export default FavoritePage;
