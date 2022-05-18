import { useState, useEffect } from "react";
import store from "../../Redux/store";
import equal from "deep-equal";
function useSelector(selector) {
  const [mystate, setState] = useState(selector(store.getState()));

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      if (equal(mystate, selector(store.getState())) === false) {
        setState(selector(store.getState()));
        console.log(store.getState());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [mystate, selector]);

  return mystate;
}

function useDispatch() {
  return store.dispatch;
}
/*
function deepEqual(x , y ) {
    const keys = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
     keys(x).length === keys(y).length &&
       keys(x).every(key => deepEqual(x[key], y[key]))
    ) : (x === y);
  }*/

export { useSelector, useDispatch };
