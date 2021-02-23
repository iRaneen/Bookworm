import React, { useState } from "react";
import { Button, Container, Image, Form, Grid, Segment } from 'semantic-ui-react'
import { useHistory } from "react-router-dom";
import axios from "axios";
// import {Formik, Form as FormikForm, Field} from 'formik'
// import * as Yup from 'yup'
import API_URL from "../API_config";
import { Alert } from "react-bootstrap";

export default function Singup(props) {
  const history = useHistory();

  const [user, setUser] = useState({}); // user info
  const [register, setRegister] = useState(true); // to show aleart
  const [image, setImage] = useState('https://res.cloudinary.com/bookwormcloud/image/upload/v1611699595/bookwormAvatar/cs4thogqix81sl7ybq4x.png')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'bookwormAvatar')
    setLoading(true)
    axios.post('https://api.cloudinary.com/v1_1/bookwormcloud/image/upload', data)
      .then(res => {
        
        const file = res.data

        setImage(file.secure_url)
        setUser({ ...user, avatar: image });
        setLoading(false)
      }).catch(err => { console.log(err) })

  }

  //to add the input inside user
  const onChangeInput = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value ,avatar: image });
  };
  // to add the user info to database

  const checkEmpty=()=>{
    if (!user.name){
      setMessage('Name cannot be empty')
      return true;
    }
    else if (user.name.length<3||user.name.length>12){
      setMessage('Name must be between 3 to 12 characters')
      return true;
    }
    
    else if(!user.password){
      setMessage('Password cannot be empty')
      return true;
    }

    else if(user.password.length<5){
      setMessage('Password must be more than 4 numbers or letters')
      return true;
    }

    else if(!user.email.length){
      setMessage('Email cannot be empty')
      return true;
    }
  
    else if(!user.email.includes('@')||!user.email.includes('com')){
      setMessage('Email not valid')
      return true;
    }

    
    return false;
  }

  const onSubmit = (event) => {
    
    event.preventDefault();
    if(!loading){

      if(!checkEmpty()){

        axios
        .post(`${API_URL}/api/user/register`, user)
        .then((res) => {
          const user = res.data.user;
          
          if (user) {
            history.push("/login");
          } else {
            setMessage('The email is already used by somone else. Please change the email')
            setRegister(false);
            setTimeout(() => {
              setRegister(true);
            }, 3000);
          }
        })
        .catch((err) => console.log(err));
      }
      else {
        
            setRegister(false);
            setTimeout(() => {
              setRegister(true);
            }, 4000);
      }
      

    }
  };

  return (
    <>
    
  

      <Container textAlign='center mt-5'>
      <Segment placeholder>
      
      <Grid columns={1} relaxed='very' stackable>
      <Grid.Column textAlign="center">

      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <Image style={{border:"0.5px solid #8e8d8a"}} src={image} size='small' verticalAlign ="middle"  />
      )}
            {!register && (
        <Alert variant={"danger"} className="mt-4">
          {message}
        </Alert>
      )}
      </Grid.Column>
      {/* <Formik> */}
      <Grid.Column> 
      <Form >

           <Form.Input 
            icon='user'
            iconPosition='left'
            label='Name'
            placeholder='name'
            name='name'
            required={true}
            onChange={(e) => onChangeInput(e)}
          />

          <Form.Input 
           label='Choose your image'
           type='file'
           onChange={uploadImage}
          />
     
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
           <Button
              variant="primary"
              type="submit"
              onClick={(e) => onSubmit(e)}
            >
              Signup
            </Button>
      </Form>
      </Grid.Column>
      {/* </Formik> */}
      </Grid>
      </Segment>
      </Container>
    </>
  );
}