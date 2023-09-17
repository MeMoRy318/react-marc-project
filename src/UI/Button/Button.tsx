import React, { FC, PropsWithChildren } from 'react';

import styles from './Button.module.scss';
interface IProps extends PropsWithChildren {
    width?:string
    height?:string
    fontSize?:string
    onClick?: () => void
    disabled?:boolean
}

const Button: FC<IProps> = ({ width, height, fontSize, children, onClick, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={styles.button}
            style={{ width, height, fontSize }}>
            {children}
        </button>
    );
};

export { Button };
