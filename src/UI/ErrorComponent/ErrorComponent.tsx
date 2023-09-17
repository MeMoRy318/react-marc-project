import React, { FC, PropsWithChildren } from 'react';

import styles from './ErrorComponent.module.scss';

interface IProps extends PropsWithChildren {
    message: string
}

const ErrorComponent: FC<IProps> = ({ message }) => {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>!</div>
            <p className={styles.message}>{message}</p>
        </div>
    );
};

export { ErrorComponent };
