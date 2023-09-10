import { createBrowserRouter, Navigate } from 'react-router-dom';

import { EPoints } from './configs';
import { Layout } from './layout';
import { MoviesPage } from './containers';

const routers = createBrowserRouter([
    {
        path: EPoints.BASE,
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Navigate to={EPoints.MOVIES_LIST}/>,
            },
            {
                path: EPoints.MOVIES_LIST,
                element: <MoviesPage/>,
            },
        ],
    },
]);

export { routers };
