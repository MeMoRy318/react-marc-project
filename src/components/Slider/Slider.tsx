import React, { FC, PropsWithChildren, useEffect } from 'react';

import { useInView } from 'react-intersection-observer';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { movieAction } from '../../redux/slices';
import { Carousel } from '../../UI';

type IProps = PropsWithChildren

const Slider: FC<IProps> = () => {
    const dispatch = useAppDispatch();
    const { popularMovies } = useAppSelector(state => state.movieReducer);
    const { inView, ref } = useInView({ threshold: 1 });

    useEffect(() => {
        dispatch(movieAction.getPopular({ sort_by: 'popularity.desc' }));
    }, [dispatch]);

    return (
        <div style={{ height: '60vh', background: 'black' }} ref={ref}>
            <Carousel delay={5000} play={inView} image={popularMovies} width={'100%'} height={'60vh'}/>
        </div>
    );
};

export { Slider };
