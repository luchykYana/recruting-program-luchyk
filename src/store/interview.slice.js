import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {interviewService} from '../services';

const initialState = {
    interviews: [],
    status: null,
    error: null,
    interviewForUpdate: null
}

export const getAllInterviews = createAsyncThunk(
    'interviews/getAllInterviews',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await interviewService.getAll();

            return data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const createInterviewThunk = createAsyncThunk(
    'interviews/createInterview',
    async (newInterview, {dispatch}) => {
        try {
            console.log(newInterview);
            const data = await interviewService.createItem(newInterview);

            dispatch(addInterview({data}));
        } catch (e) {
            console.log(e.message);
        }
    }
);

export const deleteInterviewThunk = createAsyncThunk(
    'interviews/deleteInterview',
    async ({id}, {dispatch}) => {
        try {
            await interviewService.deleteById(id);

            dispatch(deleteInterview({id}));
        } catch (e) {
            console.log(e.message);
        }
    }
);

export const updateInterviewThunk = createAsyncThunk(
    'interviews/updateInterview',
    async ({id, interview}) => {
        try {
            const newInterview = await interviewService.updateById(id, interview);

            return ({interview: newInterview});
        } catch (e) {
            console.log(e.message);
        }
    }
)

const interviewSlice = createSlice({
    name: 'interviewSlice',
    initialState,
    reducers: {
        addInterview: (state, action) => {
            state.interviews.push(action.payload.data);
        },
        deleteInterview: (state, action) => {
            state.interviews = state.interviews.filter(item => item.id !== action.payload.id);
        },
        interviewToUpdate: (state, action) => {
            state.interviewForUpdate = action.payload.interview;
        },
    },
    extraReducers: {
        [getAllInterviews.pending]: (state) => {
            state.status = 'pending';
        },
        [getAllInterviews.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.interviews = action.payload;
        },
        [getAllInterviews.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [updateInterviewThunk.fulfilled]: (state, action) => {
            const index = state.interviews.findIndex(item => item.id === action.payload.interview.data.id);

            state.interviews[index] = action.payload.interview.data;
            state.interviewForUpdate = null;
        }
    }
})

const interviewReducer = interviewSlice.reducer;
const {addInterview, deleteInterview, interviewToUpdate} = interviewSlice.actions;

export default interviewReducer;

export const interviewActions = {
    addInterview, deleteInterview, interviewToUpdate
};