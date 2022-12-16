import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {interviewerService} from '../services';

const initialState = {
    interviewers: [],
    status: null,
    error: null,
    interviewerForUpdate: null
}

export const getAllInterviewers = createAsyncThunk(
    'interviewers/getAllInterviewers',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await interviewerService.getAll();

            return data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const createInterviewerThunk = createAsyncThunk(
    'interviewers/createInterviewer',
    async (newInterviewer, {dispatch}) => {
        try {
            const data = await interviewerService.createItem(newInterviewer);

            dispatch(addInterviewer({data}));
        } catch (e) {
            console.log(e.message);
        }
    }
);

export const deleteInterviewerThunk = createAsyncThunk(
    'interviewers/deleteInterviewer',
    async ({id}, {dispatch}) => {
        try {
            await interviewerService.deleteById(id);

            dispatch(deleteInterviewer({id}));
        } catch (e) {
            console.log(e.message);
        }
    }
);

export const updateInterviewerThunk = createAsyncThunk(
    'interviewers/updateInterviewer',
    async ({id, interviewer}) => {
        try {
            const newInterviewer = await interviewerService.updateById(id, interviewer);

            return ({interviewer: newInterviewer});
        } catch (e) {
            console.log(e.message);
        }
    }
)

const interviewerSlice = createSlice({
    name: 'interviewerSlice',
    initialState,
    reducers: {
        addInterviewer: (state, action) => {
            state.interviewers.push(action.payload.data);
        },
        deleteInterviewer: (state, action) => {
            state.interviewers = state.interviewers.filter(item => item.id !== action.payload.id);
        },
        interviewerToUpdate: (state, action) => {
            state.interviewerForUpdate = action.payload.interviewer;
        },
    },
    extraReducers: {
        [getAllInterviewers.pending]: (state) => {
            state.status = 'pending';
        },
        [getAllInterviewers.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.interviewers = action.payload;
        },
        [getAllInterviewers.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [updateInterviewerThunk.fulfilled]: (state, action) => {
            const index = state.interviewers.findIndex(item => item.id === action.payload.interviewer.data.id);

            state.interviewers[index] = action.payload.interviewer.data;
            state.interviewerForUpdate = null;
        }
    }
})

const interviewerReducer = interviewerSlice.reducer;
const {addInterviewer, deleteInterviewer, interviewerToUpdate} = interviewerSlice.actions;

export default interviewerReducer;

export const interviewerActions = {
    addInterviewer, deleteInterviewer, interviewerToUpdate
};