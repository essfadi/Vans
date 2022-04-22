import {useState, useEffect} from 'react'
import styled from 'styled-components'
import {loginUser, reset} from '../features/users/usersSlice'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.user);

  const emailHandler = (e) => {
    setEmail(e.target.value)
  }
  const passwordHandler = (e) => {
    setPassword(e.target.value)
  }
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success(message)
      navigate('/')
    }
  }, [user, isLoading, isError, isSuccess, navigate, dispatch])

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      toast.error('Please fill all the fields')
    } else {
      dispatch(loginUser({email, password}));
    }
  }
  return (
    <Section>
      <H1>Login:</H1>
      <p>Please, fill the information below correctly in order to benifiate from our services:</p>
      <Form onSubmit={onSubmitHandler}>
        <Label htmlFor="email">Enter Your Email:</Label>
        <Input onChange={emailHandler} type="email" name='email' id='email' placeholder="Your email..." />
        <Label htmlFor="password">Enter Your Password:</Label>
        <Input onChange={passwordHandler}  type="password" name='password' id='password' placeholder="Your Password..." />
        <Button type="submit">Login</Button>
      </Form>
    </Section>
  )
}

export default Login

const Section = styled.section`
  background-color: #66101F;
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  color: #fff;
  font-family: 'Source Code Pro', monospace;
  font-size: 2rem;
  text-align: left;
  z-index: -1;
  padding: 80px;
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    position: relative;
  }
`;

const H1 = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  color: #fff;
  text-align: center;
  margin-top: -2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  color: #fff;
  font-family: 'Source Code Pro', monospace;
  font-size: 2rem;
  text-align: left;
  z-index: -1;
  padding: 80px;
  width: 100%;
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    position: relative;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #000;
  text-align: left;
  z-index: -1;
  outline: none;
  border: none;
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
    position: relative;
  }
`;

const Label = styled.label`
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  text-align: left;
  z-index: -1;
  outline: none;
  border: none;
  font-family: 'Poppins', sans-serif;
;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
    position: relative;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  width: 100%;
  height: 1rem;
  border-radius: 10px;
  padding-bottom: 1rem;
  padding-top: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  background-color: #F5E960;
  text-align: center;
  z-index: -1;
  outline: none;
  border: none;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    position: relative;
  }
`;