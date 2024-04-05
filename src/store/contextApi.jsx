import React, { children } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';


const context = createContext();

const ContextApi = ({ children }) => {

  const [state, setState] = useState({
    searchTerm: '',
    jobs: []
  })


  return (
    <context.Provider value={{ state, setState }}>
      {children}
    </context.Provider>
  )
}

export default ContextApi;


export const StateCall = () => {
  return useContext(context)

}