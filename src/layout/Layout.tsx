import React, { FC, PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

import { Footer, Header } from '../components';
import { Main } from '../hok';

import styles from './Layout.module.scss';

type IProps = PropsWithChildren

const Layout: FC<IProps> = () => {


    return (
        <div className={styles.wrapper}>
            <Header/>
            <Main>
                <Outlet/>
            </Main>
            <Footer/>
        </div>
    );
};

export default Layout;
