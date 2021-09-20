import React, { useEffect, useState } from 'react';

import { IUser } from './types';

function App() {
  const [error, setError] = useState<Error | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [query, setQuery] = useState<string>('');
  const [searchParams] = useState<string[]>(['name']);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then(
        (result: IUser[]) => {
          setIsLoaded(true);
          setUsers(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error: Error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  function searchUsers(users: IUser[]) {
    return users.filter((user: IUser) => {
      return searchParams.some((newUser) => {
        return (
          user[newUser as keyof IUser].toString().toLowerCase().indexOf(query.toLowerCase()) > -1
        );
      });
    });
  }
  if (error) {
    //add error.message
    return <div>Error: {error.message}</div>;
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
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <ul className="container__list">
          {searchUsers(users).map((user: IUser) => (
            <li key={user.id} className="container__list__item">
              <span className="container__list__item--faded">{user.id}. </span>
              <span className="container__list__item--bold">{user.name} </span>
              <span className="container__list__item--faded">@{user.username}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
