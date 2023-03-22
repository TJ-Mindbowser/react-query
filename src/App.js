import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './style.css';

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
function Example() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
        res.json()
      ),
  });
  React.useEffect(() => {
    console.log(data);
  }, [isLoading]);

  return (
    <>
      {!isLoading
        ? data.map((el, index) => {
            return (
              <div className="content-card" key={index}>
                <p>{el.title}</p>
                <div>{el.body}</div>
              </div>
            );
          })
        : 'Data is being fetched'}
    </>
  );
}
