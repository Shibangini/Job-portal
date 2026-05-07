import { createSlice } from "@reduxjs/toolkit";
const applicationSlice = createSlice({
    name: "application",
    initialState: {
        applications: [],
    },
    reducers: {
        setApplications: (state, action) => {
            state.applications = action.payload;
        },
        updateApplicationStatus: (state, action) => {
            const { applicationId, status } = action.payload || {};
            const application = state.applications.find((item) => item?._id === applicationId);
            if (application) {
                application.status = status;
            }
        }
    }

});

export const { setApplications, updateApplicationStatus } = applicationSlice.actions;
export default applicationSlice.reducer;