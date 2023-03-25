import { useContext } from 'react';

import { StateContext } from 'components/App';
import './filter.css';

export const Filter = () => {
  const { setFilter } = useContext(StateContext);

  const sendFilter = ev => {
    setFilter(ev.target.value.toLowerCase());
  };

  return (
    <div className="filter-wrap">
      <label htmlFor="search">Find contacts by name</label>
      <input
        type="text"
        className="filter-input"
        autoComplete="off"
        name="search"
        onChange={sendFilter}
      />
    </div>
  );
};
