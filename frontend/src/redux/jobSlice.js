import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        jobs: [],
        singleJob: null,
        allAdminJobs: [],
        searchJobByText: "",
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.jobs = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        }
    },
});

export const { setAllJobs, setAllAdminJobs, setSingleJob, setSearchJobByText } = jobSlice.actions;
export default jobSlice.reducer;