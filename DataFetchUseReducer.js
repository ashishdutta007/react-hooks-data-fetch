import React, { useState, useEffect, useReducer } from "react";

export const useDataFetch = (initialData = {}, initialUrl = "") => {
  // const [url, setUrl] = useState(initialUrl);

  const dataFetchReducer = (state, action) => {
    switch (action.type) {
      case "SET_URL":
        return {
          ...state,
          url: action.payload
        };
      case "FETCH_INIT":
        return {
          ...state,
          loading: true,
          error: false
        };
      case "FETCH_SUCCESS":
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: false
        };
      case "FETCH_FAILURE":
        return {
          ...state,
          loading: false,
          error: true
        };
      default:
        throw new Error();
    }
    return state;
  };
  const [state, dispatch] = useReducer(dataFetchReducer, {
    data: initialData,
    loading: false,
    error: false,
    url: initialUrl
  });

  useEffect(() => {
    getAllArticles();
  }, [state.url]);

  const getAllArticles = async () => {
    try {
      dispatch({ type: "FETCH_INIT" });
      const res = await fetch(state.url);
      const data = await res.json();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch {
      dispatch({ type: "FETCH_FAILURE" });
    }
  };

  const setUrl = url => {
    dispatch({ type: "SET_URL", payload: url });
  };

  return [state, setUrl];
};
