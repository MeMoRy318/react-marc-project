import React, { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './BurgerMenu.module.scss';

type IProps = PropsWithChildren

const BurgerMenu: FC<IProps> = ( ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setIsOpen((prevState) => !prevState);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div ref={wrapperRef}>
            <div
                className={`${styles.menu__btn} ${isOpen && styles.active}`}
                onClick={handleMenuClick}
            >
                <span></span>
            </div>

            {isOpen && (
                <nav className={styles.menu__box} onClick={handleMenuClick}>
                    <li>
                        <Link className={styles.menu__item} to={'/'}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.menu__item} to={'/filter/28'}>
                            movie
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.menu__item} to={'/favorite'}>
                            Favorite
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.menu__item} to={'/'}>
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.menu__item} to={'/'}>
                            Twitter
                        </Link>
                    </li>
                </nav>
            )}
        </div>
    );
};

export { BurgerMenu };
