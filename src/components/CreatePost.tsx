import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_POST = gql`
    mutation CreatedPost($userId: ID!, $input: PostInput!) {
        createPost(userId: $userId, input: $input) {
            id
            title
            body
        }
    }
`;

const CreatePost = ({ userId, refetchPosts }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [createPost] = useMutation(CREATE_POST);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createPost({
            variables: { userId, input: { title, body } },
        });
        refetchPosts();
        setTitle('');
        setBody('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title'
                required
            />
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder='Content'
                required
            />
            <button type='submit'>Create Post</button>
        </form>
    );
};

export default CreatePost;