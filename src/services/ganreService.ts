import { urls } from '../configs';

import { IGenres, IRes } from '../interface';

import { axiosService } from './axiosService';

interface IGenreService {
    getAll: () => IRes<IGenres>
}
const genreService: IGenreService = {
    getAll: ():IRes<IGenres> => axiosService.get(urls.genre.base),
};

export { genreService };
