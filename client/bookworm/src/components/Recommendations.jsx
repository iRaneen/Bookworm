import React, { useEffect, useState } from 'react';
import AllBooks from './AllBooks';
import { Container, Grid } from 'semantic-ui-react'

const Recommendations = (props) => {

    const [changeUseEffect, setChangeUseEffect] = useState(false)

    const updateSetChangeUseEffect=()=>{
        
        setChangeUseEffect(!changeUseEffect);
    }

    useEffect(() => {


    }, [changeUseEffect]);
    
    return (
        <Container className="mt-5 p-5 container-bg">
            <Grid>
               {props.recommendations.length? <AllBooks setChangeUseEffect={updateSetChangeUseEffect} updateAuthCallBack={props.updateAuthCallBack} books={props.recommendations} auth={props.auth} heading={`Our Recommendations`}/>:null}
            </Grid>
        </Container>
    );
}

export default Recommendations;
