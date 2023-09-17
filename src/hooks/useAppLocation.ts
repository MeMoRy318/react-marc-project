import { useLocation, Location } from 'react-router-dom';

interface ILocation<S> extends Location{
    state:S
}
const useAppLocation = <S>():ILocation<S> => useLocation();


export { useAppLocation };
