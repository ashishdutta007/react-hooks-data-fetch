import React, { useState, useEffect, Fragment } from "react";

export default function() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const prms = getAllArticles();
    prms.then(res => console.log("prms data ", res));
  }, [search]);

  // The async function declaration defines an asynchronous function, which returns an AsyncFunction object. An asynchronous function is a function which operates asynchronously via the event loop, using an implicit Promise to return its result.
  const getAllArticles = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const url = `https://hn.algolia.com/api/v1/search?query=${query}`;
      const res = await fetch(url);
      const data = await res.json();
      setIsLoading(false);
      setData(data);
      return data;
    } catch {
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <Fragment>
      <h2>Hacker News</h2>
      <input
        type="text"
        value={query}
        onChange={e => {
          setQuery(e.target.value);
        }}
      />
      <button
        style={{ marginLeft: "10px" }}
        type="submit"
        onClick={() => setSearch(query)}
      >
        Search
      </button>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map(item => (
            <li key={item.objectID}>
              <a href={item.url}>{`${item.title} - ${item.author}`}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}
