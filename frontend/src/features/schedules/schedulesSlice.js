import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import schedulesServices from "./schedulesServices";

const schedules = JSON.parse(localStorage.getItem("schedules"));

const initialState = {
    schedules: schedules ? schedules : [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const getSchedules = createAsyncThunk(
    "schedules/getSchedules",
    async (user, thunkAPI) => {
        try {
            return await schedulesServices.getAllSchedules(user);
        } catch (err) {
            const message =
                (err.response && err.response.data && err.response.data.message) ||
                err.message ||
                err.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const schedulesSlice = createSlice({
    name: "schedules",
    initialState,
    reducers: {
        reset: (state) => {
            state.schedules = [];
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        }
    },
    extraReducers: 
        (builder) => {
            builder
                .addCase(getSchedules.pending, (state) => {
                    state.isLoading = true;

                }
            )
            .addCase(getSchedules.fulfilled, (state, action) => {
                state.schedules = action.payload;
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = "";
            }
        )
            .addCase(getSchedules.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.payload;
            }
        )
        }
});


export const { reset } = schedulesSlice.actions;
export default schedulesSlice.reducer;
