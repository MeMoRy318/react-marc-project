import { IMovie, IMovieListResponse, IMovieTrailers, IRes, ISearchParams } from '../interface';
import { urls } from '../configs';

import { IParams } from '../interface';

import { axiosService } from './axiosService';


const movieService = {
    getAll: ( params?: IParams ): IRes<IMovieListResponse> => axiosService.get(urls.movie.base, { params: { ...params } }),
    getById: ( id: number ):IRes<IMovie> => axiosService.get(urls.movie.byId(id)),
    search: ( params:ISearchParams ):IRes<IMovieListResponse> => axiosService.get(urls.search.base, { params: { ...params } }),
    getVideo: (id:number):IRes<IMovieTrailers> => axiosService.get(urls.videos.base(id)),
};

export { movieService };
