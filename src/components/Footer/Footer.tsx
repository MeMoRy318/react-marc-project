import React, { FC, PropsWithChildren } from 'react';

import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

type IProps = PropsWithChildren

const Footer: FC<IProps> = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__row}>
                <Link  to={'/'} className={styles.footer__logo}>
                    <span className={styles.footer__logo_blue}>KINO</span><span>MOVIE</span>
                </Link>
                <nav className={styles.footer__nav}>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/filter/28'}>Movie</Link>
                    <Link to={'/favorite'}>Favorite</Link>
                </nav>
                <div className={styles.footer__year}>
                    <div>
                        © {new Date().getFullYear()} Kinomovie
                    </div>
                </div>
            </div>
        </footer>
    );
};

export { Footer };
