import React, {useEffect, useState} from 'react';
import {useAbortableFetcher} from "./with-fetcher";

export function withDataSource(WrappedComponent, params) {
  const {errors, url, contentType} = params;

  return (props) => {
    const [data, setData] = useState(null);
    const fetcher = useAbortableFetcher(errors);

    useEffect(() => {
      fetcher
        .url(url)
        .get()
        [contentType]()
        .then(data => setData(data))
    }, []);

    return (
      <WrappedComponent {...props} data={data}/>
    )
  }
}