import React, { createContext, useReducer, useContext, useEffect } from 'react';
import exerciseService from '../service/exercise';
import reducer from './reducer';


const LocalDataState = createContext();
const LocalDataDispatch = createContext();
const initialState = {
  exercises: [],
  routines: [],
  auth: false
};

const LocalDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getExercises = async () => {
    const localExercises = await exerciseService.getExercises();
    if (localExercises) {
      dispatch({ type: 'INIT', exercises: localExercises });
    }
  };

  useEffect(() => {
    getExercises();
  }, []);

  return (
    <LocalDataState.Provider value={state}>
      <LocalDataDispatch.Provider value={dispatch}>
        {children}
      </LocalDataDispatch.Provider>
    </LocalDataState.Provider>
  );
};

const useLocalDataState = () => {
  const context = useContext(LocalDataState);
  if (context === undefined) {
    throw new Error('useLocalDataState must be used within a LocalDataProvider');
  }
  return context;
};

const useLocalDataDispatch = () => {
  const context = useContext(LocalDataDispatch);
  if (context === undefined) {
    throw new Error('useLocalDataDispatch must be used within a LocalDataProvider');
  }
  return context;
};

const useLocalData = () => {
  //usage const [state, dispatch] = useLocalData()
  return [useLocalDataState(), useLocalDataDispatch()];
};

export { LocalDataProvider, useLocalData };