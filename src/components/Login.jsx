import { handleLogin } from '@/features/auth/authAction';
import { getUser, loginUser } from '@/features/auth/authSlice';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const Login = () => {

     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const dispatch = useDispatch();

     const {authenticate} = useSelector((state) => state.auth)

     const router = useRouter();

     const handleUserLogin = async (e) =>{
          e.preventDefault();
          dispatch(handleLogin({email, password}));
     }

     useEffect(() => {
          if(authenticate) router.push('/')
     }, [authenticate])

     useEffect(() => {
          const token = localStorage.getItem('authToken');
          if(token){
               dispatch(getUser({token}))
          }
          
     }, [])

     return (
          <div className='register'>
          <div className='card'>
               <div className='card-header'>
          <h3>Login</h3>
               </div>

     <div className='card-body'>
          <form onSubmit={handleUserLogin}>

               <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type="email" onChange={(e)=> setEmail(e.target.value)} name="email"  className='form-control' placeholder='Email' id='email' /> 
               </div>

               <div className='form-group'>
                    <label htmlFor='password'>Password</label>
               <input type="password" onChange={(e)=> setPassword(e.target.value)}  name="password"  className='form-control' placeholder='Password' id='password' /> 
               </div> 


               <div className='form-group'>
               <input type="submit" value="login" className='btn' />
               </div>


               <div className='form-group'>
     <span><Link href="/register"> Don't have any Account </Link></span>
               </div>  
          </form> 
     </div>


               </div> 

     </div>
     
          )
};

export default Login;
