import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  SET_TASK,
  TOGGLE_COMPLETED,
  UPDATE_TASK,
  UPDATE_TEMP_TASK,
  SET_EDITING
} from "../actions/action";

const initialState = {
  tasks: [],
  editing: null,
  tempTask: "",
  task: "",
};

export default function taskReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.task] };
    case EDIT_TASK:
      return { ...state, editing: action.task };
    case UPDATE_TEMP_TASK:
      return { ...state, tempTask: action.tempTask };
    case SET_EDITING:
      return { ...state, editing: action.editing };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.id) {
            return { ...task, text: action.text };
          }
          return task;
        }),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    case TOGGLE_COMPLETED:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.id) {
            return { ...task, completed: !task.completed };
          }
          return task;
        }),
      };
    case SET_TASK:
      return { ...state, task: action.task };
    default:
      return state;
  }
}
