import axios from '../../api/axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchPage.css';
import { useDebounce } from '../../hooks/useDebounce';

export default function SearchPage() {
  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get('q');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      console.log(request);
      setSearchResult(request.data.results);
    } catch (error) {
      console.log('error', error);
    }
  };

  const renderSearchResults = () => {
    return searchResult.length > 0 ? (
      <section className="search-container">
        {searchResult.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== 'person') {
            const movieImageUrl =
              'https://image.tmdb.org/t/p/w500' + movie.backdrop_path;
            return (
              <div key={movie.id} className="movie">
                <div
                  onClick={() => navigate(`/${movie.id}`)}
                  className="movie__column-poster"
                >
                  <img className="movie__poster" src={movieImageUrl} alt="" />
                </div>
              </div>
            );
          } else {
            return renderSearchResults;
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>
            Your search for "{debouncedSearchTerm}" did not have any matches.
          </p>
          <p>Suggestions:</p>
          <ul>
            <li>Try different keywords</li>
          </ul>
        </div>
      </section>
    );
  };
  return renderSearchResults();
}
