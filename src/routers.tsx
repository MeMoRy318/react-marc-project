import { createBrowserRouter, Navigate } from 'react-router-dom';

import { EPoints } from './configs';
import { ELazyLoadLayout, ELazyLoadRoutes, LazyLoadLayout, LazyLoadRoutes } from './hok';

const routers = createBrowserRouter([
    {
        path: EPoints.BASE,
        element: LazyLoadLayout(ELazyLoadLayout.LAYOUT),
        children: [
            {
                index: true,
                element: <Navigate to={EPoints.MOVIES_LIST}/>,
            },
            {
                path: EPoints.MOVIES_LIST,
                element: LazyLoadRoutes(ELazyLoadRoutes.MOVIES),
            },
            {
                path: EPoints.MOVIE_ID,
                element: LazyLoadRoutes(ELazyLoadRoutes.MOVIE_LIST),
            },
            {
                path: EPoints.FILTER,
                element: LazyLoadRoutes(ELazyLoadRoutes.FILTER_MOVIE),
            },
            {
                path: EPoints.SEARCH,
                element: LazyLoadRoutes(ELazyLoadRoutes.SEARCH),
            },
            {
                path: EPoints.FAVORITE,
                element: LazyLoadRoutes(ELazyLoadRoutes.FAVORITE),
            },
        ],
    },
]);

export { routers };
