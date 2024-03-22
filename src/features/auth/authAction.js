import axios from "axios"
import { addUser, loginUser, registerError } from "./authSlice"

export const registerUser = (formData) => {
    return async (dispatch) => {

        const sendRequest = async () =>{
            try {
                const res = await axios.post('http://localhost:8000/api/messenger/user-register',formData);
                localStorage.setItem('authToken', res.data.token);
                dispatch(addUser({
                    token : res.data.token,
                    successMessage: res.data.successMessage
                }));
            } catch (error) {
                dispatch(registerError({
                    error:error.response.data.error.errorMessage
                }))
            }

        }
        try {
            await sendRequest();
        } catch (error) {
            console.log(error);
        }
    }
}

export const handleLogin = ({email, password}) =>{
    return async (dispatch) => {

        const sendRequest = async () =>{
                console.log("running")
                const res = await axios.post('http://localhost:8000/api/messenger/user-login',
                {email, password});
                localStorage.setItem('authToken',res.data.token);
                dispatch(loginUser({
                    token : res.data.token,
                    successMessage: res.data.successMessage
                }));        
        }

        try {
            console.log("running")
            await sendRequest();
        } catch (error) {
            console.log(error);
        }

    }
}