import React, { FC, PropsWithChildren, useState } from 'react';

import styles from './ToggleSwitch.module.scss';

type IProps = PropsWithChildren

const ToggleSwitch:FC<IProps> = () => {
    const [trigger, setTrigger] = useState<boolean>(false);
    const handleToggle = () => {
        setTrigger(prevState => !prevState);
    };

    return (
        <div>
            <label className={styles.switch}>
                <input type="checkbox" checked={trigger} onChange={handleToggle} />
                <span className={styles.slider}></span>
            </label>
        </div>
    );
};

export { ToggleSwitch };
