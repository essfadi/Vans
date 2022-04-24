import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../features/users/usersSlice";
import scheduleReducer from "../features/schedules/schedulesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    schedule: scheduleReducer
  },
});
