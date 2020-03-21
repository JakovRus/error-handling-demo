import React, {useEffect, useRef} from 'react';
import {useFetcher} from "../fetcher";

export function useFetcherWithErrors(errors = []) {
  let fetcher = useFetcher();

  errors.forEach(error => {
    fetcher = fetcher.catcher(
      error.code,
      () => console.warn(error.message)
    );
  });

  return fetcher;
}

export function useAbortableFetcher(errors) {
  const controller = useRef(new AbortController()).current;
  const fetcher = useFetcherWithErrors(errors)
    .signal(controller);

  useEffect(() => {
    return () => {
      controller.abort();
    }
  }, [controller]);

  return fetcher;
}

export function withFetcher(WrappedComponent, errors) {
  return (props) => {
    const fetcher = useAbortableFetcher(errors);

    return (
      <WrappedComponent fetcher={fetcher} {...props}/>
    );
  }
}