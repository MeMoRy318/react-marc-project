import React, { FC, PropsWithChildren } from 'react';

import { useAppSelector } from '../../hooks';

import { ErrorComponent, LoadingSpinner } from '../../UI';

import styles from './Main.module.scss';
type IProps = PropsWithChildren

const Main: FC<IProps> = ({ children }) => {
    const { isLoading, error } = useAppSelector(state => state.loadingAndErrorReducer);

    return (
        <main className={styles.main}>
            {isLoading && <LoadingSpinner/>}
            {!!error && <ErrorComponent message={error}/>}
            {children}
        </main>
    );
};

export { Main };
