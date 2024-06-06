export const ADD_TASK = "ADD_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const UPDATE_TEMP_TASK = "UPDATE_TEMP_TASK";
export const SET_EDITING = "SET_EDITING";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const TOGGLE_COMPLETED = "TOGGLE_COMPLETED";
export const SET_TASK = "SET_TASK";

export function addTask(task) {
  return { type: ADD_TASK, task };
}

export function editTask(task) {
  return { type: EDIT_TASK, task };
}

export function updateTempTask(tempTask) {
  return { type: UPDATE_TEMP_TASK, tempTask };
}

export function setEditing(editing) {
  return { type: SET_EDITING, editing };
}

export function updateTask(id, text) {
  return { type: UPDATE_TASK, id, text };
}

export function deleteTask(id) {
  return { type: DELETE_TASK, id };
}

export function toggleCompleted(id) {
  return { type: TOGGLE_COMPLETED, id };
}

export function setTask(task) {
  return { type: SET_TASK, task };
}

export function loadTasks() {
    return async (dispatch) => {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        tasks.forEach((task) => dispatch(addTask(task)));
      }
    };
  }
