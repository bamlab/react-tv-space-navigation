import { useInfiniteQuery } from '@tanstack/react-query';
import { getRemoteProgram } from './getRemoteProgram';

export const useRemotePrograms = () => {
  const query = useInfiniteQuery({
    queryKey: ['paginatedData'],
    queryFn: ({ pageParam }) => getRemoteProgram(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      console.log('get next page param');
      return lastPageParam + 1;
    },
  });

  return {
    ...query,
  };
};
