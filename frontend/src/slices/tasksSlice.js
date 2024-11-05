
import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import axios from 'axios';

//  fetch todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('http://localhost:5000/todos');
  return response.data;
});

//  get todo
export const getTodo = createAsyncThunk('todos/getTodo', async (id) => {
    const response = await axios.get(`http://localhost:5000/todos/${id}`);
    return response.data;
  });

//  add  todo
export const addTodo = createAsyncThunk('todos/addTodo', async (task) => {
  const response = await axios.post('http://localhost:5000/todos', { task });
  return response.data;
});

// update todo
export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, task, completed }) => {
    const response = await axios.put(`http://localhost:5000/todos/${id}`, { task, completed });
    return response.data;
  });

// delete todo
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    return id;
  }); 

const initialState = {
   // selectTodo: {},
   todos: []
}

const tasksSlice = createSlice({
    name:'tasksSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchTodos.fulfilled, (state, action) => {
            state.todos = action.payload;
          })
          .addCase(addTodo.fulfilled, (state, action) => {
            state.todos.push(action.payload);
          })
          // .addCase(getTodo.fulfilled, (state, action) => {
          //   state.selectTodo =action.payload;
          // })
          .addCase(updateTodo.fulfilled, (state, action) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            state.todos[index] = action.payload;
          })
          .addCase(deleteTodo.fulfilled, (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
          });
      },

});

export default tasksSlice.reducer;

