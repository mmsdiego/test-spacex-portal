import { gql } from '@apollo/client';

export const GET_LAUNCHES = gql`
  query GetLaunchesPast($limit: Int!, $offset: Int!) {
    launchesPast(limit: $limit, offset: $offset) {
      id
      mission_name
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
    }
  }
`;