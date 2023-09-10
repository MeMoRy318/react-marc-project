import React, { FC, PropsWithChildren } from 'react';

import styles from './Main.module.scss';
type IProps = PropsWithChildren

const Main: FC<IProps> = ({ children }) => {
    return (
        <main className={styles.main}>
            {children}
        </main>
    );
};

export { Main };
