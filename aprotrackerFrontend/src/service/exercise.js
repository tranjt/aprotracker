import exercises from '../data/exercises';
import ListStorage from '../utils/listStorage';
import compareName from '../utils/compareName';


const exerciseListStorage = new ListStorage('exerciseList');

const getExercises = async () => {
  const exerciseList = await exerciseListStorage.getList();
  return [...exercises, ...exerciseList].sort(compareName);
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