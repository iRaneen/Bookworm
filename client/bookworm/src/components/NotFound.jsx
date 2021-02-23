import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Header, Image } from 'semantic-ui-react'

const NotFound = () => {
    return (
        <Container className="mt-5 p-5 container-bg margin-notFound" textAlign='center' >

            <Grid columns={2} relaxed='very' stackable>
                <Grid.Column verticalAlign='middle' inline className="no-margin" >
                    <Header size='large' >Page Not Found</Header>
                    <Header size='tiny' >We looked everywhere for this page</Header>

                    <Button className='mt-4' style={{backgroundColor:"#EDEAE5", color:"#026670"}} as ={Link} to={"/"} content='Go Back Home' primary />

                </Grid.Column>

                <Grid.Column verticalAlign='middle'>

                    <Image src='https://res.cloudinary.com/bookwormcloud/image/upload/v1611433765/bookwormAvatar/hivvtie610mh8z0afein.png' />

                </Grid.Column>
            </Grid>

        </Container>
    );
}

export default NotFound;
