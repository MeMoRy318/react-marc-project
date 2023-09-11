import React, { FC, PropsWithChildren } from 'react';

import { BurgerMenu, Logotype, SearchInput, ToggleSwitch, UserInfo } from '../../UI';

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
            <div className={styles.header__User_info}>
                <ToggleSwitch/>
                <UserInfo/>
            </div>
        </header>
    );
};

export { Header };
