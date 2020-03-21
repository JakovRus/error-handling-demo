import React, {useCallback, useState} from 'react';
import {Loader} from "../loader/loader";
import {LoaderContext} from "../contexts/loader-context";

export function LoaderProvider(props) {
  const [visible, setVisible] = useState(false);

  const showLoader = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const hideLoader = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  return (
    <LoaderContext.Provider value={{
      showLoader,
      hideLoader,
    }}>
      {props.children}
      <Loader visible={visible}/>
    </LoaderContext.Provider>
  );
}

export function withLoader(WrappedComponent) {
  return (props) => (
    <LoaderProvider>
      <WrappedComponent {...props}/>
    </LoaderProvider>
  )
}