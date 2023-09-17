import React, { FC, PropsWithChildren, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';

import { videoActions } from '../../redux/slices';

import styles from './Player.module.scss';

interface IProps extends PropsWithChildren {
    trigger: React.Dispatch<React.SetStateAction<boolean>>
    id:number
}

const Player: FC<IProps> = ({ trigger, id }) => {

    const dispatch = useAppDispatch();
    const { trailer } = useAppSelector(state => state.videoReducer);

    useEffect(() => {
        dispatch(videoActions.getTrailers({ id }));
    }, [id, dispatch]);

    const handleClickPlay = () => {
        trigger(prevState => !prevState);
    };

    const handleClick = (e:React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div onClick={handleClickPlay} className={styles.modalWindow}>
            {!!trailer?.length && <iframe
                onClick={handleClick}
                style={{ height: '60vh', width: '60%' }}
                src={`https://www.youtube.com/embed/${trailer[0].key}`}
                allowFullScreen>
            </iframe>}

        </div>
    );
};

export { Player };
