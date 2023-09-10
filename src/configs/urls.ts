const posterUrl = 'https://image.tmdb.org/t/p/original/';
const youTube = 'https://www.youtube.com/embed/';
const notFoundPoster = 'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png';
const list = '/list';
const credits = '/credits';
const genre = '/genre';
const search = '/search';
const movie = '/movie';
const movies = '/movies';
const videos = '/videos';
const discover = '/discover';
const account = '/account';
const favorite = '/favorite';
const urls = {
    movie: {
        base: `${discover}/${movie}`,
        byId: ( id: number ):string => `${movie}/${id}`,
    },
    genre: { base: `${genre}${movie}${list}` },
    posterUrl: { base: posterUrl },
    credits: { base: ( id: number ):string => `${movie}/${id}${credits}` },
    videos: { base: ( id: number ):string => `${movie}/${id}${videos}` },
    youTube: { base: youTube },
    search: { base: `${search}${movie}` },
    postFavorite: { base: ( id: number ):string => `${account}/${id}${favorite}` },
    getFavorite: { base: ( id: number ):string => `${account}/${id}${favorite}${movies}` },
    notFoundPoster: { base: notFoundPoster },
};

export { urls };
