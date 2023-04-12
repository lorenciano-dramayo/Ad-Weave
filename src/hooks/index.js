import { useEffect, useRef } from 'react';

export const useOnUnmount = (fn) => {
  const fnRef = useRef();
  fnRef.current = fn;

  useEffect(
    () => () => {
      fnRef.current();
    },
    []
  );
};

export const useOnMount = (fn) => {
  const fnRef = useRef();

  useEffect(() => {
    if (!fnRef.current) {
      fn();
      fnRef.current = true;
    }
  }, []);
};
