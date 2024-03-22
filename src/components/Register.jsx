import { registerUser } from '@/features/auth/authAction';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect } from 'react';
import { getUser } from '@/features/auth/authSlice';
import { useRouter } from 'next/navigation'
const Register = () => {
    const router = useRouter()
    const dispatch = useDispatch();


    const { authenticate } = useSelector((state) => state.auth)

    const [data, setdata] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
        image:""
    })

    const [loadImage, setloadImage] = useState("")

    const inputHandler = (e) => {
        setdata({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    const fileHandle = (e) =>{
        if(e.target.files.length !== 0) {
            setdata({
                ...data,
                image : e.target.files[0]
            })
        }

        const reader = new FileReader();

        reader.onload = () =>{
            setloadImage(reader.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    }  

    const register = async (e) =>{
        e.preventDefault();

        const {username, email, password, confirmPassword, image} = data;

        const formData = new FormData();

        formData.append('username',username);
        formData.append('email',email);
        formData.append('password',password);
        formData.append('confirmPassword',confirmPassword);
        formData.append('image',image);

        dispatch(registerUser(formData));

    }

    useEffect(() => {
        if(authenticate) router.push('/')
    }, [authenticate])
    

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if(token){
            router.push('/')
            dispatch(getUser({token}));
        }
      }, [])



  return (
    <>
     <div className='register'>
        
          <div className='card'>
               <div className='card-header'>
          <h3 onClick={()=>console.log(user)}>Register</h3>
               </div>

     <div className='card-body'>
          <form onSubmit={register} >
               <div className='form-group'>
                    <label htmlFor='username'>User</label>
               <input type="text"  onChange={inputHandler} name="username"  value={data.username} className='form-control' placeholder='User Name' id='username' /> 
               </div>

               <div className='form-group'>
                 <label htmlFor='email'>Email</label>
               <input type="email" onChange={inputHandler} name="email" value={data.email} className='form-control' placeholder='Email' id='email' /> 
               </div>

               <div className='form-group'>
                    <label htmlFor='password'>Password</label>
               <input type="password" onChange={inputHandler}  name="password" value={data.password} className='form-control' placeholder='Password' id='password' /> 
               </div>


               <div className='form-group'>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
               <input type="password" onChange={inputHandler} value={data.confirmPassword} name="confirmPassword" className='form-control' placeholder='Confirm Password' id='confirmPassword' /> 
               </div>

               <div className='form-group'>
                  <div className='file-image'>
                         <div className='image'>
     {loadImage ? <img src={loadImage} alt="user" /> : ''  }                         
                         </div>
               <div className='file'>
               <label htmlFor='image'>Select Image</label>
               <input type="file" onChange={fileHandle} name="image" className='form-control' id='image' />
               </div>

             </div>
               </div>

               <div className='form-group'>
               <input type="submit" value="register" className='btn' />
               </div>


               <div className='form-group'>
                    <span><Link href="/login"> I have an Account </Link></span>
               </div>  
          </form> 
     </div>


               </div> 

     </div>
     </>

     )
};

export default Register;
