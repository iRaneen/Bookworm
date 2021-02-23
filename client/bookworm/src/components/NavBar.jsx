import React from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Nav } from 'react-bootstrap'
import { Button } from 'semantic-ui-react';

export default function NavBar(props) {
    const history = useHistory();
    return (
        <Navbar className="color-main-nav" expand="lg" >
            {/* <img src="" alt="" width="50px" height="55px"/> */}
            <Navbar.Brand style={{color:"#fce181"}} >Bookworm</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" >
                <Nav className="mr-auto" >
                    {props.isLoggedIn?
                    (<><Nav.Link style={{color:"#9fedd7"}} as={Link} to='/home'>Home
                    </Nav.Link>
                    <Nav.Link style={{color:"#9fedd7"}} as ={Link} to ='/profile'>Profile
                    </Nav.Link>
                    <Nav.Link style={{color:"#9fedd7"}} as ={Link} to ='/recommendations'>Recommendations
                    </Nav.Link>
                    <Nav.Link style={{color:"#9fedd7"}} as ={Link} to ='/search'>Search
                    </Nav.Link></>)
                    :
                    
                    (<>
                    <Nav.Link style={{color:"#9fedd7"}} as={Link} to='/'>Home
                    </Nav.Link>
                    <Nav.Link style={{color:"#9fedd7"}} as ={Link} to ='/recommendations'>Recommendations
                    </Nav.Link>
                    <Nav.Link style={{color:"#9fedd7"}} as ={Link} to ='/search'>Search
                    </Nav.Link>
                    <Nav.Link style={{color:"#9fedd7"}} as ={Link} to ='/login'>Login
                    </Nav.Link>
                    </>)}
                    
                    {/* <Nav.Link as={Link} to='/login'>Login
                    </Nav.Link> */}
                </Nav>
                {!props.isLoggedIn?<div className="btn-nav">
                <Button style={{backgroundColor:"#edeae5", color:"#026670"}} as={Link} to='/signup' variant="">Signup</Button>
                </div>: <Button style={{backgroundColor:"#edeae5", color:"#026670"}} onClick={() => {
              
              localStorage.removeItem("jwtToken");
              history.push("/");
              props.loginCallback();
            }}  variant="">Logout</Button>}
                
               
            </Navbar.Collapse>
        </Navbar>
    )

}

