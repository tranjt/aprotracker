import routines from '../data/routines';
import ListStorage from '../utils/listStorage';


const routineListStorage = new ListStorage('routineList');

const getRoutines = async () => {
  const routineList = await routineListStorage.getList();
  return [...routineList.reverse(), ...routines];
};

const addRoutine = async (newRoutine) => {
  const routineList = await routineListStorage.getList();

  const routineFound = routineList.find(routineList => {
    return routineList.name === newRoutine.name;
  });

  if (routineFound) {
    throw ('routine already exist!');
  } else {
    await routineListStorage.addItem(newRoutine);
  }
};

const deleteRoutine = async (delRoutine) => {
  await routineListStorage.deleteItem(delRoutine);
};

export default {
  getRoutines,
  addRoutine,
  deleteRoutine
};