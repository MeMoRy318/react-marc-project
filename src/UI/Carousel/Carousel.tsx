import React, { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { IPopularMovies } from '../../interface';

import styles from './Slider.module.scss';


interface IProps extends PropsWithChildren {
    image: IPopularMovies[]
    delay: number
    play: boolean
    width:string
    height:string
}

const Carousel: FC<IProps> = ({ delay, play, image, width, height }) => {
    const timerRef = useRef(null);
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        if (play) {
            timerRef.current = setInterval(() => {
                setIndex((prevState) => {
                    if (prevState === image.length - 1) return 0;
                    return prevState + 1;
                });
            }, delay);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [play, delay, image]);

    const handleNext = () => {
        if (image.length - 1 === index ) setIndex(0);
        setIndex(prevState => prevState + 1);
    };

    const handlePre = () => {
        if (!index) setIndex(image.length - 1);
        setIndex(prevState => prevState - 1);
    };

    return (
        <div className={styles.carousel} style={{ height }}>


            {image.map((value, i) => (
                <div key={i} style={{ display: index === i ? 'block' : 'none', width }}>

                    <div className={styles.carousel__img} style={{ backgroundImage: `url(${value.image})`, width, height }}>
                        <span onClick={handlePre} className={styles.carousel__icon_left}><FaChevronLeft/></span>
                        <span onClick={handleNext} className={styles.carousel__icon_right}><FaChevronRight/></span>
                    </div>

                </div>
            ))}


        </div>
    );
};

export { Carousel };
