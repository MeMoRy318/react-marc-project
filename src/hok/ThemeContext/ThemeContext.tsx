import React, { createContext, FC, PropsWithChildren, SetStateAction, useState } from 'react';

type IProps = PropsWithChildren
const ThemeContext = createContext<{trigger:boolean;setTrigger:React.Dispatch<SetStateAction<boolean>>}>(null);

const ThemaContextProvider: FC<IProps> = ({ children }) => {

    const [trigger, setTrigger] = useState<boolean>(false);

    return (
        <ThemeContext.Provider value={{ trigger, setTrigger }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemaContextProvider };
