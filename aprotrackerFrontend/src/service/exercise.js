import exercises from '../data/exercises';
import { ListStorage } from '../utils/listStorage';


const exerciseListStorage = new ListStorage('exerciseList');

const compareName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

const getAsyncStorageExercises = async () => {
  const exerciseList = await exerciseListStorage.getList();
  return exerciseList;
};

const getExercises = () => {
  const asyncStorageExercises = getAsyncStorageExercises();

  return [...exercises, ...asyncStorageExercises].sort(compareName);
};

const addExercise = async (newExercise) => {
  const exerciseList = await exerciseListStorage.getList();

  const exerciseFound = exerciseList.find(exercise => {
    return exercise.name === newExercise.name;
  });

  if (exerciseFound) {
    throw ('exercise already exist!');
  } else {
    await exerciseListStorage.addItem(newExercise);
  }
};

const deleteExercise = async (delExercise) => {
  await exerciseListStorage.deleteItem(delExercise);
};

export default {
  getExercises,
  addExercise,
  deleteExercise
};