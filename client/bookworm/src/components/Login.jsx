import React, { useState, useEffect } from "react";
import { Button, Container, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import { useHistory } from "react-router-dom";
import axios from "axios";
import API_URL from "../API_config";
import { Alert } from "react-bootstrap";

export default function Login(props) {
  const history = useHistory();
  const [register, setRegister] = useState(true); // to show aleart
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("Please right valid email and password")
  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const checkEmpty=()=>{
    if (!credentials.email.length){
      setMessage('Email cannot be empty')
      return true;
    }
    else if (!credentials.password.length){
      setMessage('Password cannot be empty')
      return true;
    }
    return false;
  }
  const onSubmit = (event) => {
    event.preventDefault();
    if(checkEmpty){axios
      .post(`${API_URL}/api/user/login`, credentials)
      .then((res) => {

        const token = res.data.token;
        const msg = res.data.msg;

        if (token) {
          localStorage.setItem("jwtToken", token);
          props.loginCallback();
          history.push("/profile");
        } else {
          setMessage("Faild to login! Wrong email or password ")
          setRegister(false);
          setTimeout(() => {
            setRegister(true);
          }, 4000);
        }
      });}
      else{

        setRegister(false);
          setTimeout(() => {
            setRegister(true);
          }, 4000);
      }
  };

  return (
    <Container textAlign='center mt-5'>
      <Segment placeholder>
        <Grid columns={1} relaxed='very' stackable>
  
          <Grid.Column>
          {!register && (
        <Alert variant={"danger"} className="mt-4">
          {message}
        </Alert>
      )}
            <Form>

              <Form.Input
                icon='at'
                iconPosition='left'
                label='Email'
                name='email'
                placeholder='email@example.com'
                onChange={(e) => onChangeInput(e)}
              />

              <Form.Input
                icon='lock'
                iconPosition='left'
                label='Password'
                type='password'
                name='password'
                placeholder='Password'
                onChange={(e) => onChangeInput(e)}
              />

              <Button variant="primary" type="submit" onClick={(e) => onSubmit(e)}>
                Login
          </Button>

            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  );
}