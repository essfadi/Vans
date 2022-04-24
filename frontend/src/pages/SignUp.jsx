import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

const SignUp = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    email: "",
    name: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  const formDataChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && user) {
      navigate("/");
      toast.success(`${user.name} has been registered successfully`);
    }
  }, [user, isLoading, isError, isSuccess, navigate, dispatch]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      formData.email === "" ||
      formData.password === "" ||
      formData.name === "" ||
      formData.confirmPassword === ""
    ) {
      toast.error("Please fill all the fields");
    } else if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      const { email, password, name } = formData;
      dispatch(registerUser({ email, password, name }));
    }
  };
  return (
    <Section>
      <H1>Sign Up:</H1>
      <p>
        Please, fill the information below correctly in order to benifiate from
        our services:
      </p>
      <Form onSubmit={onSubmitHandler}>
        <Label htmlFor="name">Enter Your Fullname:</Label>
        <Input
          onChange={formDataChangeHandler}
          type="text"
          name="name"
          id="name"
          placeholder="Your fullname..."
        />
        <Label htmlFor="email">Enter Your Email:</Label>
        <Input
          onChange={formDataChangeHandler}
          type="email"
          name="email"
          id="email"
          placeholder="Your email..."
        />
        <Label htmlFor="password">Enter Your Password:</Label>
        <Input
          onChange={formDataChangeHandler}
          type="password"
          name="password"
          id="password"
          placeholder="Your Password..."
        />
        <Label htmlFor="confirmPassword">Confirm Your Password:</Label>
        <Input
          onChange={formDataChangeHandler}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Your Password..."
        />
        <Button type="submit">Sign Up</Button>
      </Form>
    </Section>
  );
};

export default SignUp;

const Section = styled.section`
  background-color: #1c3144;
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
  font-family: "Source Code Pro", monospace;
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
  font-family: "Source Code Pro", monospace;
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
  font-family: "Poppins", sans-serif;
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
  background-color: #66101f;
  text-align: center;
  z-index: -1;
  outline: none;
  border: none;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    position: relative;
  }
`;
