import { useQuery, useMutation, gql } from '@apollo/client';
import React, { useState } from 'react';

const GET_USER_POSTS = gql`
  query GetUserPosts($userId: ID!) {
    user(id: $userId) {
      posts {
        id
        title
        body
      }
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($userId: ID!, $input: PostInput!) {
    createPost(userId: $userId, input: $input) {
      id
      title
      body
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId) {
      success
    }
  }
`;

const Posts = ({ userId }) => {
  const { loading, error, data, refetch } = useQuery(GET_USER_POSTS, { variables: { userId } });
  const [createPost] = useMutation(CREATE_POST);
  const [deletePost] = useMutation(DELETE_POST);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleCreatePost = async () => {
    await createPost({ variables: { userId, input: { title, body } } });
    setTitle('');
    setBody('');
    refetch();
  };

  const handleDeletePost = async (postId) => {
    await deletePost({ variables: { postId } });
    refetch();
  };

  return (
    <div>
      <h2>Posts</h2>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Content"
        />
        <button onClick={handleCreatePost}>Create Post</button>
      </div>
      {data.user.posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => handleDeletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Posts;