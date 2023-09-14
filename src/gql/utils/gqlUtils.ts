import { DocumentNode } from "graphql";

import {
  useQuery,
  QueryResult,
  QueryHookOptions,
  OperationVariables,
} from "@apollo/client";

// WRAPPED QUERY HOOK

type WrappedQueryHookOptions<TQuery, TVariables extends OperationVariables> = {
  hookOptions?: QueryHookOptions<TQuery, TVariables>;
  interceptError?: boolean;
};

type WrappedQueryHook<TQuery, TVariables extends OperationVariables> = (
  useOptions?: WrappedQueryHookOptions<TQuery, TVariables>
) => QueryResult<TQuery, TVariables>;

export function createWrappedQueryHook<
  TQuery,
  TVariables extends OperationVariables
>(
  query: DocumentNode,
  createOptions?: WrappedQueryHookOptions<TQuery, TVariables>
): WrappedQueryHook<TQuery, TVariables> {
  return (useOptions?: WrappedQueryHookOptions<TQuery, TVariables>) => {
    const interceptOptions =
      createOptions?.interceptError === false ||
      useOptions?.interceptError === false
        ? {}
        : { onError: () => undefined };

    return useQuery<TQuery, TVariables>(query, {
      ...interceptOptions,
      ...createOptions?.hookOptions,
      ...useOptions?.hookOptions,
    });
  };
}
