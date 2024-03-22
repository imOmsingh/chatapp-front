import React from 'react';
import { FaPlusCircle,FaFileImage,FaGift,FaPaperPlane } from "react-icons/fa";

const MessageSend = ({inputHendle,newMessage,sendMessage,emojiSend,fileHandle}) => {
 
     const emojis = [
          '😀', '😃', '😄', '😁',
          '😆', '😅', '😂', '🤣',
          '😊', '😇', '🙂', '🙃',
          '😉', '😌', '😍', '😝',
          '😜', '🧐', '🤓', '😎',
          '😕', '🤑', '🥴', '😱'
      ]

      const runcode = () =>{
          console.log("epow")
          // fileHandle();

      }


  return (

     <div className='message-send-section'>
          <input type="checkbox" id='emoji' />
             <div className='file hover-attachment'>
                  <div type="file" className='add-attachment'>
                         Add Attachment
                  </div>
                  <FaPlusCircle />
                  </div>  

          <div className='file hover-image'>
               <div className='add-image'>
                    Add Image 
               </div>
               <label htmlFor='pic'> <FaFileImage/> </label>
               <input onChange={fileHandle} type="file" id="pic" className='form-control' />
          </div>
          
          <div className='file hover-gift'>
               <div className='add-gift'>
                    Add gift
               </div>
               <FaGift />
          </div>

     <div className='message-type'>
          <input onChange={inputHendle} name='message' id='message' placeholder='Aa' className='form-control' value={newMessage}/>

          <div className='file hover-gift'>
               <label htmlFor='emoji'> ❤️ </label>
          </div>
     </div>

     <div onClick={sendMessage} className='file'>
          <FaPaperPlane/>
     </div>

     <div className='emoji-section'>
          <div className='emoji'>
               {
                    emojis.map((e,idx) => <span key={idx} onClick={()=>emojiSend(e)} >{e}</span>)
               }

          </div>

     </div>


     </div>

  )
};

export default MessageSend;
