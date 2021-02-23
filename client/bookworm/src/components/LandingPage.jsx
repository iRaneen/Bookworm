import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Grid, Header, Image,Button } from 'semantic-ui-react'


export default function LandingPage() {
    return (
        <Container textAlign='center' className='mt-5'>

        <Grid columns={1} relaxed='very' stackable>
            <Grid.Column verticalAlign='middle' >

                <Image className="img-landing" src="https://res.cloudinary.com/bookwormcloud/image/upload/v1611756949/bookwormAvatar/p6tlymi3oewi0o4vvp07.png"  />

            </Grid.Column>
            <Grid.Column verticalAlign='middle' inline className="no-margin" >
                <Header size='huge'className='header-landing'>Welcome to Bookworm</Header>
                <Header size='medium' >Bookworm where you will find fun and learn </Header>

            
                <p className='btns-landing' >
                <Button className='btn-login-landing' style={{ backgroundColor: "#026670", color: "#fce181", border: "#d8c3a5" }} as={Link} to='/login' >Login</Button>
                <Button className='btn-signup-landing' style={{ backgroundColor: "#026670", color: "#fce181", border: "#d8c3a5" }} as={Link} to='/signup' variant="primary">Signup</Button>
            </p>
            </Grid.Column>

            
        </Grid>

    </Container>
        // <Jumbotron style={{ backgroundColor: "#e7e7e5" }}>
        //     <Form>
        //         <Row>
        //             <div className="div-landing" style={{ width: "500px", height: "200px", marginLeft: "50px" }}>
        //                 <img className="img-landing" src="https://lh3.googleusercontent.com/proxy/7DZ7rKFtULomqV4G2BiBhFqYnmGhM9-CT6winc5XjTJ4008hORqNPgpTR_qd4ZVp86XPMI7HWVT-Njr51VuLvJrF9t0kDJBMlPTLuPcV1YfN2OZ8tY11Hli3LlrwjLLA8753g75s" alt="" />
        //             </div>
        //             <div className="header-landing">
        //                 <h1 className='header-landing'>Welcome to Bookworm</h1>
        //                 <p className='paragrap-landing'>
        //                     Bookworm where you will find fun and learning..
        // </p>
        //             </div>


        //         </Row>
        //     </Form>




        //     <p className='btns-landing' >
        //         <Button className='btn-login-landing' style={{ backgroundColor: "#026670", color: "#fce181", border: "#d8c3a5" }} as={Link} to='/login' >Login</Button>
        //         <Button className='btn-signup-landing' style={{ backgroundColor: "#026670", color: "#fce181", border: "#d8c3a5" }} as={Link} to='/signup' variant="primary">Signup</Button>
        //     </p>
        // </Jumbotron>
    )

}