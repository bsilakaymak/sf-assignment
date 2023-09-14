import {
  GetLaunchesQuery,
  GetLaunchesQueryVariables,
} from "../__generated__/graphql";
import { createWrappedQueryHook } from "../utils/gqlUtils";
import { getAllLaunches } from "./queries.graphql";

export const useGetAllLaunches = createWrappedQueryHook<
  GetLaunchesQuery,
  GetLaunchesQueryVariables
>(getAllLaunches);
