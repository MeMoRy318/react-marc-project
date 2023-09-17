import { lazy, Suspense } from 'react';

import { LoadingSpinner } from '../../UI';

export enum ELazyLoadLayout {
    LAYOUT='Layout'
}

export const LazyLoadLayout = (componentName: ELazyLoadLayout) => {
    const LazyElement = lazy(() => import(`../../layout/${componentName}.tsx`));

    return (
        <Suspense fallback={<LoadingSpinner/>}>
            <LazyElement/>
        </Suspense>
    );
};
