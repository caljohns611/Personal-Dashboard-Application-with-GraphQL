import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import '@testing-library/jest-dom'

const GET_LOCATION = gql`
    query GetLocation($id: ID!) {
        location(id: $id) {
            name
        }
    }
`;

const mocks = [
    {
        request: {
            query: GET_LOCATION,
            variables: { id: '1' },
        },
        result: {
            data: {
                location: {
                    name: 'Sample Location',
                },
            },
        },
    },
];

test('renders location name when data is fetched', async () => {
    render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Location id="1" />
        </MockedProvider>
    );

    await waitFor(() => expect(screen.getByText('Sample Loaction')).toBeInTheDocument());
});