
import { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Register/register.scss'
import img1 from '../../assets/image1.jpg'

import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import {
  clearErrorState,
  errorMessagePropsType,
  loginCleartState,
  loginFails,
  loginRequest,
  loginSuccess,
  userSuccess,
} from '../../redux/userSlice'
import { getUser, loginUser } from '../../utils/features'



interface rootState {
  user: {
    isLoading: boolean;
    errorMessage: errorMessagePropsType | null;
  }
}


const Login = () => {


  const { isLoading, errorMessage } = useSelector((state: rootState) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = () => {


    if (errorMessage) {
      dispatch(loginCleartState())
    }

    dispatch(loginRequest())

    loginUser(email, password).then((res) => {

      dispatch(loginSuccess(res?.data));
      localStorage.setItem('authToken', res?.data.token);
      getUser().then((res)=>{
        dispatch(userSuccess(res))
      })
      navigate('/')

    }).catch((err) => {

      dispatch(loginFails(err))
    });

    setEmail("");
    setPassword("");

  }

  useEffect(()=>{

    setTimeout(()=>{
      if(errorMessage){
        dispatch(clearErrorState())
      }
    },3000)

  },[dispatch,errorMessage])


  return (
    <div className='register-login-container'>

      <div className='left-container'>
        <img src={img1} />
      </div>

      <div className='right-container'>

        <div className='register-login'>
          <h3>New here Register?</h3>
          <Link to="/register">Register</Link>
        </div>

        <div className='register-login-form'>
          <h1>Welcom to Personal Project Management System</h1>
          <h2>Login The Account</h2>

          <form>

            <div>
              <label htmlFor="">Email</label>
              <input type="email"
                placeholder='Enter Your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <label htmlFor="">Password</label>
              <input type="password"
                placeholder='Enter Your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </div>

          </form>

          <button disabled={!email || !password} onClick={loginHandler}>
            {
              isLoading ? <span>Login...</span> : <span>Login</span>
            }
          </button>
          {
            errorMessage && <h4>{errorMessage?.message}</h4>
          }
        </div>
      </div>

    </div>


  )
}

export default Login