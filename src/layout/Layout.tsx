import React, { FC, PropsWithChildren, useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer, Header } from '../components';
import { Main, ThemeContext } from '../hok';

import styles from './Layout.module.scss';

type IProps = PropsWithChildren

const Layout: FC<IProps> = () => {
    const { trigger } = useContext(ThemeContext);

    return (
        <div className={`${styles.wrapper} ${trigger && styles.active}`}>
            <Header/>
            <Main>
                <Outlet/>
            </Main>
            <Footer/>
        </div>
    );
};

export default Layout;
