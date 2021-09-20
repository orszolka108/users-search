import React, { useEffect, useState } from 'react';

import { IUser } from './types';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then(
        (result: IUser[]) => {
          console.log(result);
          setIsLoaded(true);
          setUsers(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    //add error.message
    return <div>Error:</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container">
        <header className="container__title">Users list</header>
        <div className="container__search">
          <label htmlFor="container__search__form">
            <input
              type="search"
              name="search-form"
              className="container__search__input"
              placeholder="Search by user name..."
              value={query}
              /*
                                // set the value of our useState q
                                //  anytime the user types in the search box
                                */
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <ol className="container__list">
          {users.map((user: IUser) => (
            <li key={user.id} className="container__list__item">
              <span className="container__list__item--bold">{user.name} </span>
              <span className="container__list__item--faded">@{user.username}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default App;
