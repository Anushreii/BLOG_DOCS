import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    currentUser : JSON.parse(localStorage.getItem("currentUser")) || null,
    error : null,
    loading: false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart: (state)=>{
            state.loading = true
            state.error = null;
        },
        signInSuccess : (state, action)=>{
               state.currentUser  = action.payload;
         //console.log("User updated in Redux:", state.currentUser);
               state.loading = false;
               state.error = null;
              // localStorage.setItem("currentUser", JSON.stringify(action.payload)); 
              localStorage.setItem("profileImage", action.payload.profilePicture);
        },

        signInFailure : (state, action)=>{
            state.loading = false;
            state.error = action.payload;

        },

        updateUserSuccess : (state, action) =>{
            state.loading = false;
            state.currentUser = { ...state.currentUser, ...action.payload }; // Update Redux state
            localStorage.setItem("currentUser", JSON.stringify(state.currentUser)); // Persist data
        },

        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },

        deleteUserStart: (state)=>{
            state.loading = true;
            state.error = null
        },

        deleteUserSuccess: (state)=>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },

        deleteUserFailure: (state, action) =>{
            state.loading = false;
            state.error = action.payload;
        },
        signoutSuccess: (state) =>{
            state.currentUser = null;
            state.error = null;
            state.loading = false;
            localStorage.removeItem("currentUser");
        }
    },
});

export const { updateUserSuccess, 
     updateUserFailure, 
     signInStart, 
     signInSuccess,
     signInFailure, 
     deleteUserStart, 
     deleteUserSuccess, 
     deleteUserFailure,
     signoutSuccess,
    } = userSlice.actions;

export default userSlice.reducer;