import React, { useEffect, useState } from 'react';

const MovieApp = () => {
  const apiKey = '7be72508776961f3948639fbd796bccd';
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div>
      <h1>Popular Movies</h1>
      <div>
        {movies.map(movie => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
          </div>
        ))}
      </div>
      <div>
        <button onClick={handlePrevious}>Previous Page</button>
        <button onClick={handleNext}>Next Page</button>
      </div>
    </div>
  );
};

export default MovieApp;