import { useState, useRef, useCallback } from 'react';
import { isFunction } from 'common/util/general';

const useStateRef = initialState => {
  const [state, setState] = useState(initialState);
  const ref = useRef(state);

  const dispatch = useCallback(setStateAction => {
    ref.current = isFunction(setStateAction)
      ? setStateAction(ref.current)
      : setStateAction;

    setState(ref.current);
  }, []);

  return [state, dispatch, ref];
};

export default useStateRef;
