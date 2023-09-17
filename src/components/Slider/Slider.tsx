import React, { FC, PropsWithChildren, useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { movieAction } from '../../redux/slices';
import { Carousel } from '../../UI';
import { ThemeContext } from '../../hok';

import styles from './Slider.module.scss';
type IProps = PropsWithChildren

const Slider: FC<IProps> = () => {
    const dispatch = useAppDispatch();
    const { trigger } = useContext(ThemeContext);
    const { popularMovies } = useAppSelector(state => state.movieReducer);
    const { inView, ref } = useInView({ threshold: 1 });

    useEffect(() => {
        dispatch(movieAction.getPopular({ sort_by: 'popularity.desc' }));
    }, [dispatch]);

    return (
        <div className={`${!trigger ? styles.slider : styles.active}`} ref={ref}>
            <Carousel delay={5000} play={inView} image={popularMovies} width={'100%'} height={'60vh'}/>
        </div>
    );
};

export { Slider };
