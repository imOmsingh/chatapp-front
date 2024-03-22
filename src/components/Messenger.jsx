import { getUser } from '@/features/auth/authSlice';
import { getUserFriends, getUserMessage, messageSend, sendImageMessage } from '@/features/messenger/messengerAction';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React,{ useEffect,useState,useRef } from 'react';
import { FaEllipsisH,FaEdit,FaSistrix,FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import ActiveFriend from './ActiveFriend';
import Friends from './Friends';
import RightSide from './RightSide';
import {io} from 'socket.io-client'

const Messenger = () => {

     const {myInfo, authenticate} = useSelector((state) => state.auth.auth);

     const scrollRef = useRef();
     const socket = useRef();

     const [activeUser, setActiveUser] = useState([])

     useEffect(() => {

          // const socketInstance = io('ws://localhost:9000');
          // setSocket(socketInstance);

          socket.current = io('ws://localhost:9000');

     }, [])

    
     
     const dispatch = useDispatch();
     const [currentFriend, setCurrentFriend] = useState({})
     const [newMessage, setNewMessage] = useState('')
     const [token, setToken] = useState('');
     const [image, setImage] = useState('')
     
     
     const inputHandle = (e) =>{
          setNewMessage(e.target.value);
     }

     const fileHandle = (e) =>{
          console.log(e)
          const data = new FormData();
          data.append('image', e.target.files[0])
          data.append('senderName', myInfo.userName)
          data.append('receiverId', currentFriend._id)
          dispatch(sendImageMessage(data, token))
          setImage('');
     }  

     const sendMessage = async (e) =>{
               const data = {
                    senderName: myInfo.userName,
                    receiverId: currentFriend._id,
                    message: newMessage ? newMessage : '❤️'
               }
               dispatch(messageSend(data ,token))
               setNewMessage('')
          
     }

     const { friends , messages} = useSelector( (state) => state.messenger)

     const router = useRouter();

     useEffect(() => {
          if(friends && friends.length > 0){
               setCurrentFriend(friends[0]);
          }
     }, [friends])

     useEffect(() => {
          const token = localStorage.getItem('authToken');
          if(token){
               setToken(token);
               dispatch(getUser({token}))
               dispatch(getUserFriends(token));
          }
          else router.push('/login')
     }, [])

     const emojiSend = (e) =>{

          setNewMessage(newMessage+e);

          const data = {
               senderName: myInfo.userName,
               receiverId: currentFriend._id,
               message: e
          }

          // dispatch(messageSend(data ,token))
     }

     useEffect(() => {
       dispatch(getUserMessage(currentFriend._id, token))
     }, [currentFriend?._id])

     useEffect(() => {
          scrollRef.current?.scrollIntoView(true, {behavior: 'smooth'})
     }, [messages])
     
     const handleLogout = () =>{
          localStorage.removeItem('authToken')
     }

     useEffect(() => {
          socket.current.emit('addUser', myInfo.id, myInfo)
     }, [])

     useEffect(() => {
          socket.current.on('getUser', (users)=>{
               const filterUser = users.filter(u => u.userId !== myInfo.id)
               setActiveUser(filterUser)
          })
     }, [])


  return (
       <div className='messenger'>
            {/* <Toaster
            position={'top-right'}
            reverseOrder = {false}
            toastOptions={{
                 style : {
                      fontSize : '18px'
                 }
            }}
            
            /> */}



<div className='row'>
     <div className='col-3'>
          <div className='left-side'>
               <div className='top'>
                    <div className='image-name'>
                         <div className='image'>
                              <img src={`/user/${myInfo.image}`} alt='' />
                         </div>
                         <div className='name'>
                         <h3 onClick={()=>console.log(activeUser)}>{myInfo.userName} </h3>
                         </div>
                       </div>

                       <div className='icons'>
  <div   className='icon'>
                              <FaEllipsisH />
                            </div>
                            <div className='icon'>
                                  <FaEdit/> 
                            </div>

            <div >
                 <h3>Dark Mode </h3>
            <div className='on'>
                 <label htmlFor='dark'>ON</label>
                 <input  type="radio" value="dark" name="theme" id="dark" />
                 </div>

                 <div className='of'>
                 <label htmlFor='white'>OFF</label>
                 <input type="radio" value="white" name="theme" id="white" />
                 </div>

                 <div onClick={handleLogout} className='logout'>
                    <FaSignOutAlt /> Logout
                 </div>



            </div>

                       </div>
               </div>

               <div className='friend-search'>
                    <div className='search'>
                    <button> <FaSistrix /> </button>
  <input type="text" placeholder='Search' className='form-control' />
                    </div>
               </div>

               <div className='active-friends'>
                    {
                    activeUser && activeUser.length > 0 ? activeUser.map(u =>  <ActiveFriend setCurrentFriend = {setCurrentFriend} user={u} />) : ''  
                    }
               </div>

               <div className='friends'>
                   
                    {
                         friends &&
                         friends.length > 0 ?
                         friends.map((data, idx)=>{
                              return(
                                   <div onClick={()=> setCurrentFriend(data)} className={ data._id === currentFriend._id ? 'hover-friend active' : 'hover-friend ' }> 
                                        <Friends activeUser={myInfo} friend={{fndInfo:data, msgInfo: {message:{text:"good"}}}} myId = {myInfo.id} />
                                   </div>
                              )
                         })
                         :
                         'No Friend'
                    }
                    
                    
               </div>

          </div>
                      
                 </div>

     {
          currentFriend ?  <RightSide 
          currentfriend={currentFriend}
          inputHandle={inputHandle}
          newMessage={newMessage}
          sendMessage={sendMessage}
          messages={messages}
          scrollRef= {scrollRef}
          emojiSend = {emojiSend}
          fileHandle={fileHandle}
          activeUser = {activeUser}
          // typingMessage = {typingMessage}
          /> : 'Please Select your Friend'
     }
                

                 

            </div>

       </div>
  )
};

export default Messenger;
