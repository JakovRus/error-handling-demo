import {useContext} from 'react';
import wretch from 'wretch';
import {LoaderContext} from "./contexts/loader-context";

const fetcher = wretch('https://api.github.com/');

const useLoaderMiddleware = () => {
  const {showLoader, hideLoader} = useContext(LoaderContext);

  return (next) => (url, opts) => {
    showLoader();
    return next(url, opts)
      .then(res => {
        hideLoader();

        return res;
      })
      .catch(error => {
        hideLoader();

        throw error;
      });
  };
};

export function useFetcher() {
  const loaderMiddleware = useLoaderMiddleware();
  return fetcher.middlewares([loaderMiddleware]);
}