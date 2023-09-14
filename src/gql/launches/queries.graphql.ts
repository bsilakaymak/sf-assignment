import { gql } from "@apollo/client";

export const getAllLaunches = gql`
  query GetLaunches($offset: Int, $limit: Int, $order: String, $sort: String) {
    launches(offset: $offset, limit: $limit, order: $order, sort: $sort) {
      id
      upcoming
      mission_name
      launch_date_local
      rocket {
        rocket_name
        rocket_type
        rocket {
          cost_per_launch
          name
          mass {
            kg
          }
        }
      }
    }
  }
`;
