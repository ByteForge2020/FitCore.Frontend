import { useQuery } from '@tanstack/react-query';
import { type Post } from '../api/axios/requests';

export const usePosts = () => {
  return useQuery<Post[]>({
    queryKey: ['posts'],
    // queryFn: externalApi.getPosts,
  });
};

export const usePost = (postId: number | null) => {
  return useQuery<Post>({
    queryKey: ['post', postId],
    // queryFn: () => externalApi.getPostById(postId as number),
    enabled: typeof postId === 'number',
  });
};

