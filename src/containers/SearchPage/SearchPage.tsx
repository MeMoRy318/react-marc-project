import React, { FC, PropsWithChildren } from 'react';

import { useParams } from 'react-router-dom';

import styles from '../FilterMoviePage/FilterMoviePage.module.scss';
import { FilterForm, SearchMovieList } from '../../components';

type IProps = PropsWithChildren

const SearchPage: FC<IProps> = () => {
    const { query } = useParams<{query:string}>();

    return (
        <div className={styles.filterMovie}>
            <FilterForm/>
            <SearchMovieList query={query}/>
        </div>
    );
};

export default SearchPage;
