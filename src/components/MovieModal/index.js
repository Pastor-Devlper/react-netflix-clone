import movieTrailer from 'movie-trailer';
import { useState, useEffect, useRef } from 'react';
import { Autoplay } from 'swiper';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import './MovieModal.css';

const MovieModal = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen,
}) => {
  const ref = useRef();
  useOnClickOutside(ref, () => {
    document.body.style.overflowY = 'auto';
    setModalOpen(false);
  });

  const [trailerId, setTrailerId] = useState('');

  useEffect(() => {
    if (trailerId) {
      setTrailerId('');
    } else {
      movieTrailer(`${title}` || `${name}` || '')
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerId(urlParams);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          <span
            onClick={() => {
              document.body.style.overflowY = 'auto';
              setModalOpen(false);
            }}
            className="modal-close"
          >
            X
          </span>
          <img
            className="modal__poster-img"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt="modal__poster-img"
          />
          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user-perc">100% for you</span>{' '}
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">평점: {vote_average}</p>
            <p className="modal__overview">{overview}</p>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${movieTrailer}?autoPlay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
