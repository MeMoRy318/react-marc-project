import React, { FC, PropsWithChildren } from 'react';

import { ErrorComponent } from '../../UI';

type IProps = PropsWithChildren

const ErrorPage: FC<IProps> = () => {
    return (
        <>
            <ErrorComponent message={'Page not found 404'}/>
        </>
    );
};

export default ErrorPage;
