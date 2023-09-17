import { IMovieListResponse, IRes } from '../interface';

import { urls } from '../configs';

import { axiosService } from './axiosService';


const favoriteService = {
    getAll: (page:number):IRes<IMovieListResponse> => axiosService.get(urls.getFavorite.base(13652460), { params: { page } }),
    addFavorite: ( id: number, boolean: boolean ): IRes<void> => axiosService.post(urls.postFavorite.base(13652460), { media_type: 'movie', media_id: id, favorite: boolean }),
};

export { favoriteService };
