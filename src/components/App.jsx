/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState, useRef } from 'react';
import { nanoid } from 'nanoid';

import { ContactItem } from './contacts/contactItem';
import { FormCreateContact } from './form/form';
import { Filter } from './filter/filter';
import './contacts/contacts.css';

export const StateContext = createContext();

export const App = () => {
  const initialState = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  let reg = useRef();
  const [state, setState] = useState(initialState);
  const prevState = useRef();
  useEffect(() => {
    prevState.current = state;
  }, [state]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('contacts'));
    if (local !== null) {
      setState({ ...state, contacts: local.contacts });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'contacts',
      JSON.stringify({ contacts: state.contacts })
    );
  }, [state.contacts]);

  const transformNumber = number => {
    let numberArr = number.split('');
    return `${numberArr.slice(0, 3).join('')}-${numberArr
      .slice(3, 5)
      .join('')}-${numberArr.slice(5, 7).join('')}`;
  };

  const setNewContact = ({ name, number, ev }) => {
    const names = state.contacts.filter(el => {
      return el.name.toLowerCase() === name.toLowerCase();
    });
    const numbers = state.contacts.filter(el => {
      return Number(el.number) === Number(number);
    });
    if (names.length !== 0) {
      alert(`${name} is already in contacts`);
      return;
    } else if (numbers.length !== 0) {
      alert(`${transformNumber(number)} is already in contacts`);
      return;
    } else {
      setState(prevState => {
        let arr = [...prevState.contacts];
        arr.push({ name, number, id: nanoid() });
        return { ...state, name: name, number: number, contacts: arr };
      });
    }
    ev.target.reset();
  };

  const deleteFromState = id => {
    let newContact = [...state.contacts];
    newContact = newContact.filter(el => {
      if (el.id !== id) {
        return el;
      }
    });
    setState({ ...state, contacts: newContact });
  };

  const setFilter = filter => {
    setState({ ...state, filter: filter });
  };

  useEffect(() => {
    reg.current = new RegExp(state.filter.toLowerCase());
  }, [state.filter]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        // alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <StateContext.Provider
        value={{
          ...state,
          setNewContact,
          setFilter,
          deleteFromState,
          transformNumber,
        }}
      >
        <h1>Phonebook</h1>
        <FormCreateContact setNewState={setNewContact} />
        <h2>Contacts</h2>
        <Filter setFilter={setFilter} />
        <ul>
          {state.contacts.map(el => {
            const name = el.name.toLowerCase();
            if (reg.current.test(name)) {
              return (
                <ContactItem
                  name={el.name}
                  number={el.number}
                  elementId={el.id}
                  key={el.id}
                />
              );
            }
          })}
        </ul>
      </StateContext.Provider>
    </div>
  );
};
