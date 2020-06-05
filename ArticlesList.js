import React, { useState, useEffect, Fragment } from "react";
// import { useDataFetch } from "./DataFetchCustomHook";
import { useDataFetch } from "./DataFetchUseReducer";

export default function() {
  const [{ data, error, loading, url }, setUrl] = useDataFetch({ hits: [] });
  const [query, setQuery] = useState("");

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
        onClick={() =>
          setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)
        }
      >
        Search
      </button>
      {error && url && <div>Something went wrong ...</div>}
      {loading ? (
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
