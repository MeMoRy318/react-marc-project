import React, { FC, PropsWithChildren } from 'react';
import { useParams } from 'react-router-dom';

import { MoviesListCard } from '../../components';

type IProps = PropsWithChildren

const MoviesListCardPage: FC<IProps> = () => {
    const { movieId } = useParams<{movieId:string}>();

    return (
        <div>
            <MoviesListCard movieId={movieId}/>
        </div>
    );
};

export default MoviesListCardPage;
