import React, { FC, PropsWithChildren } from 'react';
import { useParams } from 'react-router-dom';

import { FilterForm, FilterMovieList } from '../../components';

import styles from './FilterMoviePage.module.scss';

type IProps = PropsWithChildren

const FilterMoviePage: FC<IProps> = () => {

    const { paramsId } = useParams<{paramsId:string}>();


    return (
        <div className={styles.filterMovie}>
            <FilterForm/>
            <FilterMovieList id={paramsId}/>
        </div>
    );
};

export default FilterMoviePage;
