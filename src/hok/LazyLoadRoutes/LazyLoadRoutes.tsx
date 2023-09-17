import { lazy, Suspense } from 'react';

import { LoadingSpinner } from '../../UI';
export enum ELazyLoadRoutes {
    FILTER_MOVIE='FilterMoviePage',
    MOVIE_LIST='MoviesListCardPage',
    MOVIES='MoviesPage',
    SEARCH='SearchPage',
    FAVORITE='FavoritePage',
    ERROR='ErrorPage'
}
const LazyLoadRoutes = (componentName: ELazyLoadRoutes) => {
    const LazyElement = lazy(() => import(`../../containers/${componentName}/${componentName}.tsx`));

    return (
        <Suspense fallback={<LoadingSpinner/>}>
            <LazyElement/>
        </Suspense>
    );
};

export { LazyLoadRoutes };
