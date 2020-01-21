import React, {useState, useEffect, useContext} from 'react';
import { useHttp } from '../hooks/http';
import { useMessage } from '../hooks/message';
import  AuthContext  from '../context/AuthContext.js'

const Auth = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp();
     const [form, setForm] = useState({
         email: '',
         password: ''
     })

     useEffect(()=> {
        message(error)
        clearError()
     },[error, message, clearError])

     useEffect(()=> {
       window.M.updateTextFields()
     },[])
   
     const changeHandler = e => {
         setForm({...form, [e.target.name]:e.target.value})
       
     }
     const registerHandler = async () => {
        try {
          const data = await request('/api/auth/register', 'POST', {...form})
          message(data.message)
        } catch (error) {}
      }

      const loginHandler = async () => {
        try {
          const data = await request('/api/auth/login', 'POST', {...form})
          auth.login(data.token, data.userId)
         
        } catch (error) {}
      }
      
    return (
            <div className="row">
            <div className="col s6 offst-s3">
            <h1>Shorten your link</h1>
            <div className="card blue darken-1">
        <div className="card-content white-text">
          <span className="card-title">Authorization</span>
          <div>

          <div className="input-field">
          <input 
           placeholder="Enter Email" 
           id="email"
           type="text"
           name="email"
           value={form.email}
           className="yellow-input"
           onChange = {changeHandler}
           />
          <label htmlFor="email">Email</label>
        </div>

        <div className="input-field">
          <input 
           placeholder="Enter Password" 
           id="password"
           type="password"
           name="password"
           value={form.password}
           className="yellow-input"
           onChange = {changeHandler}
           />
          <label htmlFor="password">Password</label>
        </div>

        </div>
        </div>
        
        <div className="card-action">
            <button 
            className="btn yellow darken-4" 
            style={{marginRight: 10}}
            disabled={loading}
            onClick={loginHandler}>
            Log In
            </button>
            
            <button className="btn grey lighten-1 black-text"
            onClick={registerHandler}
            disabled={loading}>
            Registration
            </button>
      </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;