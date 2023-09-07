import React, {useCallback, useMemo} from 'react';
import {AiOutlinePlus} from 'react-icons/ai';
import {AiOutlineCheck} from 'react-icons/ai';
import axios, {AxiosResponse} from 'axios';

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({movieId}) => {
  const {mutate: mutateFavorites} = useFavorites();
  const {data: currentUser, mutate} = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [movieId, currentUser]);

  const toggleFavorites = useCallback(async () => {
    let response: AxiosResponse;

    if (isFavorite) {
      response = await axios.delete('/api/favorite', {data: {movieId}});
    } else {
      response = await axios.post('/api/favorite', {movieId});
    }

    const updatedFavorites = response?.data?.favoriteIds;

    await mutate({
      ...currentUser,
      favoriteIds: updatedFavorites,
    });

    await mutateFavorites();
  }, [currentUser, isFavorite, movieId, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex items-center justify-center transition hover:border-neutral-300"
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;
