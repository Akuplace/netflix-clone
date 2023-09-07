import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useMovie = (id?: string) => {
  const {data, error, isLoading} = useSWR(
    id ? `/api/movies/${id}` : null,
    fetcher,
    {
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useMovie;
