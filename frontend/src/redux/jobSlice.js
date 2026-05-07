import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        jobs: [],
        singleJob: null,
        allAdminJobs: [],
        searchJobByText: "",
        allAppliedJobs: [],
        savedJobs: [],
        searchedQuery: "",
        selectedFilters: {
            location: "",
            salary: "",
            industry: ""
        }
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
        },
        setAllAppliedJobs: (state, action) => {     
            state.allAppliedJobs = action.payload;  
        },
        toggleSavedJob: (state, action) => {
            const job = action.payload;
            if (!job || !job._id) return;

            if (!Array.isArray(state.savedJobs)) {
                state.savedJobs = [];
            }

            const existingIndex = state.savedJobs.findIndex((savedJob) => savedJob?._id === job._id);

            if (existingIndex >= 0) {
                state.savedJobs.splice(existingIndex, 1);
            } else {
                state.savedJobs.push(job);
            }
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        setFilterLocation: (state, action) => {
            if (!state.selectedFilters) {
                state.selectedFilters = { location: "", salary: "", industry: "" };
            }
            state.selectedFilters.location = action.payload;
        },
        setFilterSalary: (state, action) => {
            if (!state.selectedFilters) {
                state.selectedFilters = { location: "", salary: "", industry: "" };
            }
            state.selectedFilters.salary = action.payload;
        },
        setFilterIndustry: (state, action) => {
            if (!state.selectedFilters) {
                state.selectedFilters = { location: "", salary: "", industry: "" };
            }
            state.selectedFilters.industry = action.payload;
        },
        clearFilters: (state) => {
            state.selectedFilters = { location: "", salary: "", industry: "" };
        }
    },
});

export const { setAllJobs, setAllAdminJobs, setSingleJob, setSearchJobByText, setAllAppliedJobs, toggleSavedJob, setSearchedQuery, setFilterLocation, setFilterSalary, setFilterIndustry, clearFilters } = jobSlice.actions;
export default jobSlice.reducer;