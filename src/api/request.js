const requests = {
  fetchNowPlaying: `movie/now_playing`,
  fetchNetflixOriginals: `/discover/tv?with_networks=213`,
  fetchTrending: `/trending/all/week`,
  fetchTopRated: `/movie/top_rated`,
  fetchaActionMovies: `/discover/movie?with_genres=28`,
  fetchaComedyMovies: `/discover/movie?with_genres=35`,
  fetchaHorrorMovies: `/discover/movie?with_genres=27`,
  fetchaRomanceMovies: `/discover/movie?with_genres=10749`,
  fetchaDocumentaries: `/discover/movie?with_genres=99`,
};

export default requests;
