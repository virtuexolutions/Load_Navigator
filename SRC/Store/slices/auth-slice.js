import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isLoggedIn: false,
  fcmToken: null,
  isVerified: false,
  userWalkThrough: false,
  isGoalCreated: false,
  role: '',
  user_type: '',
  numberVerified: false,
  emailVerified: false,
  pm_type: '',
};

export const AuthSlice = createSlice({
  name: 'authReducer',
  initialState: initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.token = action?.payload?.token;
      console.log('================ >>>', action?.payload);
    },
    setUserType(state, action) {
      state.user_type = action.payload;
    },
    SetFCMToken(state, action) {
      state.fcmToken = action?.payload?.fcmToken;
    },
    SetUserRole(state, action) {
      state.role = action?.payload;
    },
    setUserLogin(state, action) {
      state.token = action?.payload;
    },
    setUserLogoutAuth(state, action) {
      state.token = null;
      state.fcmToken = null;
    },
    setIsMobileVerified(state, action) {
      state.numberVerified = action.payload;
    },
    setIsEmailVerified(state, action) {
      state.emailVerified = action.payload;
    },
    setWalkThrough(state, action) {
      state.userWalkThrough = action.payload;
    },
    setPm_Type(state, action) {
      state.pm_type = action.payload;
    },
  },
});

export const {
  setUserLogin,
  setUserLogoutAuth,
  setUserToken,
  SetFCMToken,
  setWalkThrough,
  SetUserRole,
  setUserType,
  setIsMobileVerified,
  setIsEmailVerified,
  setPm_Type,
} = AuthSlice.actions;

export default AuthSlice.reducer;
