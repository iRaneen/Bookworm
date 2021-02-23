import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container,Header } from 'semantic-ui-react'
import API_URL from '../API_config';
import AllReviews from './AllReviews'
const Home = (props) => {
    // auth={auth} loginCallback={userLogin} setAuthCallBack={setAuth} updateAuthCallBack={updateAuth}
    const [reviews, setReviews] = useState([])
    const [dataloadingReviews, setDataloadingReviews] = useState(false)
    const [changeUseEffect, setChangeUseEffect] = useState(false)

    const updateSetChangeUseEffect=()=>{
        
        setChangeUseEffect(!changeUseEffect);
    }

    useEffect(() => {
        
        axios
        .get(`${API_URL}/api/review/`)
        .then(res => {
            let reviews=res.data.reviews.filter(review=>{
                return( props.auth.currentUser.following.some(user=>user._id===review.reviewerId._id)
                ||props.auth.currentUser._id===(review.reviewerId._id))}
                
            )
            reviews=reviews.reverse()
            setReviews(reviews);
            setDataloadingReviews(true);
        }).catch(err => console.log(err))

    }, [changeUseEffect]);
    
    return (
        <Container className="mt-5 p-5 container-bg">
            {dataloadingReviews && reviews.length?
            <AllReviews auth={props.auth} reviews={reviews} setChangeUseEffect={updateSetChangeUseEffect} loginCallback={props.loginCallback} setAuthCallBack={props.ssetAuthCallBack} updateAuthCallBack={props.updateAuthCallBack}/>
        :
        <><Header as='h1' dividing className='p-3 pt-5 mb-3'>
           Search for your favourite books and sahre your first review!
        </Header>
        
        <Button className='m-5' as={Link} to={'/search'}>Search Book</Button>

        <h4 className='ml-5'>Enjoy reading ..! </h4>
        </>
        
        }
        </Container>
    );
}

export default Home;
