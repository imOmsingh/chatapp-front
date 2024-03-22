import authReducer from '@/features/auth/authSlice';
import messengerReducer from '@/features/messenger/messengerSlice';
import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'
export const store = configureStore({
    reducer: { 
        todo:todoReducer, 
        auth: authReducer, 
        messenger: messengerReducer 
    }
    
});