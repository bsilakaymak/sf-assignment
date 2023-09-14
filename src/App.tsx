import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import { useGetAllLaunches } from "./gql/launches/hooks";
import Main from "./view/Main";
import Spinner from "./components/Spinner";
import { Launch } from "./gql/__generated__/graphql";

const App = () => {
  const [limit, setLimit] = useState(9);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [endOfEntries, setEndofEntries] = useState(false);

  const {
    loading: loadingLaunches,
    data,
    fetchMore,
  } = useGetAllLaunches({
    hookOptions: {
      variables: {
        offset,
        limit,
      },
    },
  });

  const onLoadMore = () => {
    setOffset((prev) => prev + 6);
    setLimit((prev) => prev + 6);
  };

  useEffect(() => {
    if (offset !== 0) {
      setFetchingMore(true);
      fetchMore({
        variables: {
          offset,
          limit,
        },
      })
        .then((data) => {
          // this is not working as intended
          // had no time to fix it
          if (data?.data.launches?.length === 0) {
            setEndofEntries(true);
          }
        })
        .then(() => setFetchingMore(false));
    }
  }, [offset, limit, fetchMore, endOfEntries]);

  return (
    <Layout>
      {loadingLaunches ? (
        <Spinner />
      ) : (
        <Main
          launches={data?.launches as Launch[]}
          loadMoreButton={
            !endOfEntries ? (
              <button
                className="mt-4 inline-block rounded bg-lime-900 text-white p-1 text-xs font-medium leading-normal hover:opacity-70"
                onClick={() => {
                  onLoadMore();
                }}
              >
                {fetchingMore ? "Loading" : "Load more"}
              </button>
            ) : undefined
          }
        />
      )}
    </Layout>
  );
};

export default App;
