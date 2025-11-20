import { gql } from '@apollo/client';

export const GET_LAUNCH_DETAILS = gql`
  query LaunchDetails($id: ID!) {
    launch(id: $id) {
      id
      mission_name
      details
      launch_date_utc
      rocket {
        rocket_name
      }
      links {
        wikipedia
        video_link
        flickr_images
      }
    }
  }
`;