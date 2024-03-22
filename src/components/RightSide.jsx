import React from 'react';
import { FaPhoneAlt,FaVideo,FaRocketchat } from "react-icons/fa";
import FriendInfo from './FriendInfo';
import Message from './Message';
import MessageSend from './MessageSend';

const RightSide = (props) => {

const {currentfriend, inputHandle, newMessage, sendMessage, messages, scrollRef, emojiSend, fileHandle, activeUser} = props;
 


  return ( 
       <div className='col-9'>
            <div className='right-side'>
                 <input type="checkbox" id='dot' />
                 <div className='row'>
                      <div className='col-8'>
          <div className='message-send-show'>
               <div className='header'>
                    <div className='image-name'>
                         <div className='image'>
                         <img src={`/user/${currentfriend.image}`} alt='' />

                         {
                              activeUser && activeUser.length > 0 && activeUser.some(u => u.userId === currentfriend._id) ? <div className='active-icon'></div> : ''
                         }                   
                         

                         </div>
                         <div className='name'>
                              <h3>{currentfriend.userName} </h3>

                         </div>
                    </div>

          <div className='icons'>
     <div className='icon'>
          <FaPhoneAlt/>
     </div>

     <div className='icon'>
          <FaVideo/>
     </div>

     <div className='icon'>
        <label htmlFor='dot'> <FaRocketchat/> </label>  
     </div>

    </div>
         </div>

          <Message
          messages = { messages}
          currentfriend = {currentfriend}
          scrollRef = {scrollRef}
          // typingMessage = {typingMessage}
          />

          <MessageSend
          inputHendle = {inputHandle}
          newMessage = {newMessage}
          sendMessage = {sendMessage}
          scrollRef = {scrollRef}
          emojiSend = {emojiSend}
          fileHandle={fileHandle}
          />


             </div>
                 </div>  

                 <div className='col-4'>
                   <FriendInfo  activeUser={activeUser} currentfriend={currentfriend} />
               </div>  


                 </div>
            </div>
       </div>
  )
};

export default RightSide;
