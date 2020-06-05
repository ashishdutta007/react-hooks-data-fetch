import React, { useState, useEffect } from "react";

export const useDataFetch = (initialData = {}, initialUrl = "") => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const prms = getAllArticles();
    prms.then(res => console.log("prms data ", res));
  }, [url]);

  // The async function declaration defines an asynchronous function, which returns an AsyncFunction object. An asynchronous function is a function which operates asynchronously via the event loop, using an implicit Promise to return its result.
  const getAllArticles = async () => {
    try {
      setError(false);
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setLoading(false);
      setData(data);
      return data;
    } catch {
      setLoading(false);
      setError(true);
    }
  };

  return [{ data, loading, error, url }, setUrl];
};
