import { IGenre } from './ganre.interface';

interface IMovies {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}
interface IPopularMovies {
    image:string
    title:string
}
interface IMovieListResponse {
    page: number
    results: IMovies[]
    total_pages: number
    total_results: number
}

type IResponse<T> = Omit<IMovieListResponse, 'results'> & {
    results?: T
};

interface IProductionCompany {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
}


interface IProductionCountry {
    iso_3166_1: string
    name: string
}


interface ISpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
}


interface IMovie {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: unknown | null
    budget: number
    genres: IGenre[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: IProductionCompany[]
    production_countries: IProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: ISpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

interface ITrailer {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
}

interface IMovieTrailers {
    id: number
    results: ITrailer[]
}

export type { IMovie, IMovies, IMovieListResponse, IResponse, IPopularMovies, IMovieTrailers, ITrailer };
