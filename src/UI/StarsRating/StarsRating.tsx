import React, { FC, PropsWithChildren } from 'react';

import styles from './StarsRating.module.scss';
interface IProps extends PropsWithChildren {
    rating: number
}

const StarsRating: FC<IProps> = ({ rating }) => {
    return (
        <div className={styles.rating}>
            <div className={styles.rating_stars}>

                <div className={styles.rating_stars_back}>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                </div>

                <div className={styles.rating_stars_fill}
                    style={{ width: `${Math.round(rating * 5) * 2}%` }}>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                    <span/>
                </div>

            </div>
        </div>
    );
};

export { StarsRating };
