import React, { FC, memo, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { creditAction } from '../../redux/slices';
import { PosterPreview } from '../PosterPreview/PosterPreview';
import { ICast } from '../../interface';
import { splitArrayIntoChunks } from '../../utility';

import styles from './PosterList.module.scss';

interface IProps extends PropsWithChildren{
    id:string
}

const PosterList: FC<IProps> = ({ id }) => {
    const { cast } = useAppSelector(state => state.creditReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(creditAction.getAll({ id: +id }));
    }, [id, dispatch]);

    const [count, setCount] = useState<number>(1);

    const { chunk, totalCount } = useMemo(() => {
        return splitArrayIntoChunks<ICast>(cast, count);
    }, [cast, count]);

    const handleNext = () => {
        setCount((prevCount) => Math.min(prevCount + 1, totalCount));
    };

    const handlePrev = () => {
        setCount((prevCount) => Math.max(prevCount - 1, 1));
    };

    return (
        <div className={styles.posters}>
            <div className={styles.buttonContainer}>
                <button className={styles.posters__button} onClick={handlePrev}>
                    <FaArrowCircleLeft />
                </button>
                <button className={styles.posters__button} onClick={handleNext}>
                    <FaArrowCircleRight />
                </button>
            </div>
            <div className={styles.posters__card}>
                {chunk.map((item) => (
                    <PosterPreview cast={item} key={item.id} />
                ))}
            </div>
        </div>
    );
};
const MemoizedPosterList = memo(PosterList);

export { MemoizedPosterList as PosterList };

