import { AxiosResponse } from 'axios';

interface IParams {
    page?:number
    sort_by?:string
    with_genres?: string
    'vote_count.gte'?:number
    'vote_count.lte'?:number
    'vote_average.gte'?:number
    'vote_average.lte'?:number
    'primary_release_date.gte'?: number
    'primary_release_date.lte'?: number
}
interface ISearchParams {
    query: string
    page?:number
    isQuerySearch?:boolean
}
interface IFilterFormParams {
    primary_release_year: string
    vote_average: {
        gte: string
        lte: string
    }
    sort_by: string
    with_genres: string
}

type IRes<T> = Promise<AxiosResponse<T>>

export type { IParams, ISearchParams, IRes, IFilterFormParams };
