import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {applicantService} from '../services';

const initialState = {
    applicants: [],
    status: null,
    error: null,
    applicantForUpdate: null
}

export const getAllApplicants = createAsyncThunk(
    'applicants/getAllApplicants',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await applicantService.getAll();

            return data;
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const createApplicantThunk = createAsyncThunk(
    'applicants/createApplicant',
    async (newApplicant, {dispatch}) => {
        try {
            const data = await applicantService.createItem(newApplicant);

            dispatch(addApplicant({data}));
        } catch (e) {
            console.log(e.message);
        }
    }
);

export const deleteApplicantThunk = createAsyncThunk(
    'applicants/deleteApplicant',
    async ({id}, {dispatch}) => {
        try {
            await applicantService.deleteById(id);

            dispatch(deleteApplicant({id}));
        } catch (e) {
            console.log(e.message);
        }
    }
);

export const updateApplicantThunk = createAsyncThunk(
    'applicants/updateApplicant',
    async ({id, applicant}) => {
        try {
            const newApplicant = await applicantService.updateById(id, applicant);

            return ({applicant: newApplicant});
        } catch (e) {
            console.log(e.message);
        }
    }
)

const applicantSlice = createSlice({
    name: 'applicantSlice',
    initialState,
    reducers: {
        addApplicant: (state, action) => {
            state.applicants.push(action.payload.data);
        },
        deleteApplicant: (state, action) => {
            state.applicants = state.applicants.filter(item => item.id !== action.payload.id);
        },
        applicantToUpdate: (state, action) => {
            state.applicantForUpdate = action.payload.applicant;
        },
    },
    extraReducers: {
        [getAllApplicants.pending]: (state) => {
            state.status = 'pending';
        },
        [getAllApplicants.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.applicants = action.payload;
        },
        [getAllApplicants.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [updateApplicantThunk.fulfilled]: (state, action) => {
            const index = state.applicants.findIndex(item => item.id === action.payload.applicant.data.id);

            state.applicants[index] = action.payload.applicant.data;
            state.applicantForUpdate = null;
        }
    }
})

const applicantReducer = applicantSlice.reducer;
const {addApplicant, deleteApplicant, applicantToUpdate} = applicantSlice.actions;

export default applicantReducer;

export const applicantActions = {
    addApplicant, deleteApplicant, applicantToUpdate
};