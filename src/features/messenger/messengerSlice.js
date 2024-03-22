import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    friends: [],
    messages: []
}

export const messengerSlice = createSlice({
    name:"messenger",
    initialState,
    reducers:{
        getFriends( state, action){
            state.friends = action.payload.friends;
        },
        getMessage( state, action){
            state.messages = action.payload.messages;
        },
        addMessage( state, action){
            state.messages.push(action.payload.message)
        }
    }
})

export const {getFriends, getMessage, addMessage} = messengerSlice.actions;
export default messengerSlice.reducer;