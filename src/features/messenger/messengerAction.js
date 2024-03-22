import axios from "axios"
import { addMessage, getFriends, getMessage } from "./messengerSlice";

export const getUserFriends = (token) =>{
    return async (dispatch) =>{
        const sendRequest = async () =>{
            const res = await axios.get('http://localhost:8000/api/messenger/get-friends',
            {
                headers: {
                "authToken": token 
              }
            });
            dispatch(getFriends({friends:res.data.friends}))
        }

        try {
            await sendRequest();
        } catch (error) {
            console.log(error);
        }

    }
}

export const messageSend = (data, token) =>{
    return async (dispatch) =>{

        console.log(data)

        const sendRequest = async () =>{
            const res = await axios.post('http://localhost:8000/api/messenger/send-message', data,
            {
                headers:{
                    'authToken' : token
                }
            })
            dispatch(addMessage({message:res.data.message}));
        }

        try {
            await sendRequest();
        } catch (error) {
            console.log(error)
        }

    }
}

export const getUserMessage = (id, token) =>{
    return async (dispatch) =>{

        const sendRequest = async () =>{
            const res = await axios.get(`http://localhost:8000/api/messenger/get-message/${id}`,
            {
                headers:{
                    'authToken' : token
                }
            });
            // console.log("wpopwp", res.data.message)
            dispatch(getMessage({messages:res.data.message}))
        }

        try {
            await sendRequest();
        } catch (error) {
            console.log(error);
        }

    }
}

export const sendImageMessage = (data, token) =>{
    return async (dispatch) =>{

        const sendRequest = async () => {
            try {
                const res = await axios.post('http://localhost:8000/api/messenger/image-message-send',data,
                {
                     headers:{
                         'authToken' : token
                     }
                 });

            dispatch(addMessage({message:res.data.message}))
           } catch (error) {
                console.log(error)
           }
        }


        try {
            await sendRequest();
        } catch (error) {
            console.log(error)
        }
    }
}