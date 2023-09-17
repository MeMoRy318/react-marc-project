import { urls } from '../configs';

import { IRes } from '../interface';
import { ICredits } from '../interface';

import { axiosService } from './axiosService';

const creditService = {
    getAll: ( id: number ):IRes<ICredits> => axiosService.get(urls.credits.base(id)),
};

export { creditService };
