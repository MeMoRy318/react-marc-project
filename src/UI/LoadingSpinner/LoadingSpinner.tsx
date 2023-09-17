import React, { FC, PropsWithChildren } from 'react';

import styles from './LoadingSpinner.module.scss';

type IProps = PropsWithChildren

const LoadingSpinner: FC<IProps> = () => {
    return (
        <div className={styles.container}>
            <div className={styles.spinner}></div>
        </div>
    );
};

export { LoadingSpinner };
