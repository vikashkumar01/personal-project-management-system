
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './register.scss'
import img1 from '../../assets/image1.jpg'
import { registerUser } from '../../utils/features'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import {
  UserPropsType, errorMessagePropsType,
  registerFails,
  registerRequest,
  registerSuccess,
  registerCleartState
} from '../../redux/registerSlice'

interface rootState {
  register: {
    isSuccess: boolean;
    isLoading: boolean;
    user: UserPropsType | null;
    errorMessage: errorMessagePropsType | null;
  };

}

const Register = () => {

  const { isSuccess, isLoading, errorMessage } = useSelector((state: rootState) => state.register);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const registerHandler = () => {

    if (errorMessage) {
      dispatch(registerCleartState())
    }

    dispatch(registerRequest())

    registerUser(name, email, password).then((res) => {

      dispatch(registerSuccess(res?.data));

    }).catch((err) => {

      dispatch(registerFails(err))
    });

    setName("");
    setEmail("");
    setPassword("");

  }

  useEffect(() => {

    setTimeout(() => {
      if (isSuccess) {
        dispatch(registerCleartState())
      }
    }, 3000)


  }, [isSuccess,dispatch])


  return (
    <div className='register-login-container'>

      {
        isLoading && <span>Loading...</span>
      }

      <div className='left-container'>
        <img src={img1} />
      </div>

      <div className='right-container'>

        <div className='register-login'>
          <h3>Already registered?</h3>
          <Link to="/login">Login</Link>
        </div>

        <div className='register-login-form'>
          <h1>Welcome to Personal Project Management System</h1>
          <h2>Register The Account</h2>

          <form>

            <div>
              <label htmlFor="">Name</label>
              <input type="text"
                placeholder='Enter Your Name'
                value={name}
                onChange={(e) => setName(e.target.value)} />
              {
                errorMessage && <span>{errorMessage?.name}</span>
              }
            </div>

            <div>
              <label htmlFor="">Email</label>
              <input type="email" placeholder='Enter Your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
              {
                errorMessage && <span>{errorMessage?.email}</span>
              }
            </div>

            <div>
              <label htmlFor="">Password</label>
              <input type="password" placeholder='Enter Your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              {
                errorMessage && <span>{errorMessage?.password}</span>
              }
            </div>

          </form>

          <button onClick={registerHandler}>Register</button>

          {
            isSuccess && <h3>User Register Successfully</h3>
          }

          {
            errorMessage && <h4>{errorMessage?.message}</h4>
          }
        </div>
      </div>

    </div>


  )
}

export default Register