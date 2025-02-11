import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_ALBUMS = gql`
  query GetUserAlbums($userId: ID!) {
    user(id: $userId) {
      albums {
        id
        title
        photos {
          id
          title
          url
        }
      }
    }
  }
`;

const Albums = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_ALBUMS, { variables: { userId } });

  if (loading) return <p>Loading albums...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Albums</h2>
      {data.user.albums.map((album) => (
        <div key={album.id}>
          <h3>{album.title}</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {album.photos.map((photo) => (
              <img key={photo.id} src={photo.url} alt={photo.title} style={{ width: '100px' }} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Albums;