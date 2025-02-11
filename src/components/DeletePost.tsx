import React from 'react';
import { useMutation, gql } from '@apollo/client'

const DELETE_POST = gql`
    mutation DeletePost($postId: ID!) {
        deletePost(postId: $postId) {
            success
        }
    }
`;

const DeletePost = ({ postId, refetchPosts }) => {
    const [deletePost] = useMutation(DELETE_POST);

    const handleDelete = async () => {
        await deletePost({ variables: { postId } });
        refetchPosts();
    };

    return <button onClick={handleDelete}>Delete</button>
};

export default DeletePost;