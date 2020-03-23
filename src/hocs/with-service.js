import React from 'react';
import {useAbortableFetcher} from "./with-fetcher";
import {getService} from "../services/registry";

export function withService(WrappedComponent, params) {
  const {serviceName, errors} = params;

  return (props) => {
    const fetcher = useAbortableFetcher(errors);
    const service = getService(serviceName, fetcher);

    return (
      <WrappedComponent {...props} service={service}/>
    )
  }
}