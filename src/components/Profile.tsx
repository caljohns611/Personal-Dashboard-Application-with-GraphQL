import React from 'react';
import { useQuery, gql } from "@apollo/client";

const GET_USER_PROFILE = gql`
    query GetUserProfile($userId: ID!) {
        user(id: $userId) {
            name
            email
            address {
                street
                city
                zipcode
            }
            phone
            website
            company {
                name
                catchPhrase
            }
        }
    }
`;

const Profile = ({ userId }) => {
    const { loading, error, data } = useQuery(GET_USER_PROFILE, { variables: { userId } });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const { name, email, address, phone, website, company } = data.user;

    return (
        <div>
            <h2>{name}</h2>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            <p>Website: {website}</p>
            <p>Address: {address.street}, {address.city}, {address.zipcode}</p>
            <p>Company: {company.name} - {company.catchPhrase}</p>
        </div>
    );
};

export default Profile;