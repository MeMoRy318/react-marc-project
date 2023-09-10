import { AxiosResponse } from 'axios';

interface IParams {
    page:number
    sort_by:string
    'vote_count.gte':number
    'vote_count.lte':number
    'vote_average.gte':number
    'vote_average.lte':number
    'primary_release_date.gte': number
    'primary_release_date.lte': number
}
interface ISearchParams {
    query: string
    page?:number
}

type IRes<T> = Promise<AxiosResponse<T>>

export type { IParams, ISearchParams, IRes };
