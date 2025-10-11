const queryKey = {
  auth: {
    'fetch-user': ['auth', 'fetch-user'],
  },
  posts: {
    'get-posts': (page: number, limit: number) => [
      'posts',
      'get-posts',
      page,
      limit,
    ],
    'get-post-info': (id: number) => ['posts', 'get-post-info', id],
  },
};

export default queryKey;
