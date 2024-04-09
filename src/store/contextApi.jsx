import React, { children } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';


const context = createContext();

const ContextApi = ({ children }) => {

  const [state, setState] = useState({
    searchTerm: '',
    jobData: {
      tags: [],
      comp_name: "",
      comp_website: "",
      job_title: "",
      comp_logo: "",
      is_remote: "yes",
      primary_location: "",
      job_description: "",
      full_name: "",
      email: ""
    },
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