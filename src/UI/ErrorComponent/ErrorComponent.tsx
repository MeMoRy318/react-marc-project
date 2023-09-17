import React, { FC, PropsWithChildren } from 'react';

import { FaArrowAltCircleLeft } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';

import styles from './ErrorComponent.module.scss';

interface IProps extends PropsWithChildren {
    message: string
}

const ErrorComponent: FC<IProps> = ({ message }) => {
    const navigate = useNavigate();

    const handleClickGoBak = () => {
        navigate(-1);
    };

    const handleClickGoHome = () => {
        navigate('/');
    };

    return (
        <div className={styles.container}>
            <div className={styles.pre}>
                <span onClick={handleClickGoBak}><FaArrowAltCircleLeft/></span>
                <span onClick={handleClickGoHome}>Home</span>
            </div>
            <div className={styles.icon}>!</div>
            <p className={styles.message}>{message}</p>
        </div>
    );
};

export { ErrorComponent };
