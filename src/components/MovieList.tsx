import React from 'react';
import MovieCard from '@/components/MovieCard';
import {MovieData} from '@/lib/types/Movie';
import {isEmpty} from 'lodash';

interface MovieListProps {
  data: MovieData[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({data, title}) => {
  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {data.map((movie, index) => {
            return <MovieCard key={index} {...movie} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
