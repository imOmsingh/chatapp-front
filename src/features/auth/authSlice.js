
const { createSlice, nanoid } = require("@reduxjs/toolkit");
const {jwtDecode} = require('jwt-decode');

const initialState = {
    auth :{
        loading : true,
        authenticate: false,
        error: [],
        successMessage: '', 
        myInfo: ''
    }
}

const decodeToken = ( token ) =>{
    const tokenDecoded = jwtDecode(token);
    const expTime = new Date(tokenDecoded.expTime*1000);
    if( new Date() > expTime ){
        return null;
    }
    return tokenDecoded;
}


export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
       addUser(state, action)  {
            const myInfo = decodeToken(action.payload.token);
            const todo = {
                loading :false,
                error : [],
                myInfo,
                authenticate : true,
                successMessage : action.payload.successMessage
            }
            state.auth = todo;
       },
       registerError( state, action){
        const todo = {
            loading :true,
            error : action.payload.error,
            myInfo : '',
            successMessage: '',
            authenticate : false
        }

        state.auth = todo;
       },
       loginUser( state, action){
            const myinfo = decodeToken(action.payload.token);
            state.auth.loading  = false
            state.auth.myInfo  = myinfo,
            state.auth.authenticate  = true
       },
       getUser( state, action){
            const myinfo = decodeToken(action.payload.token);
            state.auth.loading  = false
            state.auth.myInfo  = myinfo,
            state.auth.authenticate  = true
       }
    }
})

export const {addUser, registerError, getUser, loginUser} = authSlice.actions;
export default authSlice.reducer;
