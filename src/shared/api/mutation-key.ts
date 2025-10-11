const mutationKey = {
  file: {
    'upload-file': ['file', 'upload-file'],
  },
  auth: {
    'sign-in': ['auth', 'sign-in'],
    'sign-up': ['auth', 'sign-up'],
    'sign-out': ['auth', 'sign-out'],
  },
  posts: {
    'write-post': ['posts', 'write-post'],
    'delete-post': ['posts', 'delete-post'],
    'edit-post': ['posts', 'edit-post'],
  },
};

export default mutationKey;
