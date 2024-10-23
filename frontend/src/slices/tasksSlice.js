import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
    selectedTask:{}
}

const tasksSlice = createSlice({
    name:'tasksSlice',
    initialState,
    reducers: {
        addTaskToList:(state,action) => {
            const id = Math.random() * 100
            let task = {...action.payload,id}
            state.todos.push(task)
        },
        removeTaskFromList:(state,action) => {
            state.todos = state.todos.filter((task) => task.id !== action.payload.id)
        },
        updateTaskInList:(state,action) => {
            state.todos = state.todos.map((task) => task.id === action.payload.id ? action.payload : task )
        },
        setSelectedTask:(state,action) => {
            state.selectedTask = action.payload
        }
    }

});

export const {addTaskToList,removeTaskFromList,updateTaskInList,setSelectedTask} = tasksSlice.actions

export default tasksSlice.reducer;