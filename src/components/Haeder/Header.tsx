import React, { FC, PropsWithChildren } from 'react';

import { BurgerMenu, Logotype, SearchInput } from '../../UI';

import styles from './header.module.scss';

type IProps = PropsWithChildren

const Header: FC<IProps> = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header__naw}>
                <BurgerMenu/>
                <Logotype/>
            </div>
            <SearchInput/>
        </header>
    );
};

export { Header };
