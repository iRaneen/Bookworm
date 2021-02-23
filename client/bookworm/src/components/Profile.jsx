import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Grid,Header } from 'semantic-ui-react'
import API_URL from '../API_config'
import AllBooks from './AllBooks'
import AllProfiles from './AllProfiles'
import AllReviews from './AllReviews'
import ProfileCard from './ProfileCard'

export const Profile = (props) => {
    // if(!props.currentUser) {
    //     console.log("callback")
    //     props.loginCallback()}
    const [show,setShow]=useState('reads');
    const [reviews, setReviews] = useState([])
    const [dataloadingReviews, setDataloadingReviews] = useState(false)
    const [changeUseEffect, setChangeUseEffect] = useState(false)

    const updateSetChangeUseEffect=()=>{
        
        setChangeUseEffect(!changeUseEffect);
    }

    useEffect(() => {
        
        axios
        .get(`${API_URL}/api/review/user/${props.auth.currentUser._id}`)
        .then(res => {
            let reviews=res.data.reviews;
            reviews=reviews.reverse()
            setReviews(reviews);
            setDataloadingReviews(true);
        }).catch(err => console.log(err))

    }, [changeUseEffect]);
    
    return (
        <Container className="mt-5 p-5 container-bg">
        <Grid>
            <Grid.Column width={6}>
                <ProfileCard user={props.auth.currentUser} auth={props.auth} />
            </Grid.Column>
            <Grid.Column width={10} className="mt-5">
                <Grid columns='equal' className="mt-5">
                <Grid.Row >
                        <Grid.Column>
                        {show==='reviews'?
                        <Button style={{backgroundColor:"#026670", color:"#EDEAE5"}} onClick={()=>setShow('reviews')} fluid>Reviews</Button>
                        :<Button style={{backgroundColor:"#EDEAE5", color:"#026670"}}  onClick={()=>setShow('reviews')} fluid>Reviews</Button>}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className="mt-3">
                        <Grid.Column>
                        {show==='reads'?
                        <Button style={{backgroundColor:"#026670", color:"#EDEAE5"}} onClick={()=>setShow('reads')} fluid>Reads</Button>
                        :<Button style={{backgroundColor:"#EDEAE5", color:"#026670"}}  onClick={()=>setShow('reads')} fluid>Reads</Button>}
                        </Grid.Column>
                        <Grid.Column>
                        {show==='toRead'?
                        <Button style={{backgroundColor:"#026670", color:"#EDEAE5"}} onClick={()=>setShow('toRead')} fluid>To-read</Button>
                        :<Button style={{backgroundColor:"#EDEAE5", color:"#026670"}}  onClick={()=>setShow('toRead')} fluid>To-read</Button>}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row className="mt-3">
                        <Grid.Column>
                        {show==='following'?
                        <Button style={{backgroundColor:"#026670", color:"#EDEAE5"}} onClick={()=>setShow('following')} fluid>Following</Button>
                        :<Button style={{backgroundColor:"#EDEAE5", color:"#026670"}}  onClick={()=>setShow('following')} fluid>Following</Button>}
                        </Grid.Column>
                        <Grid.Column>
                        {show==='followers'?
                        <Button style={{backgroundColor:"#026670", color:"#EDEAE5"}} onClick={()=>setShow('followers')} fluid>Followers</Button>
                        :<Button style={{backgroundColor:"#EDEAE5", color:"#026670"}}  onClick={()=>setShow('followers')} fluid>Followers</Button>}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Grid.Column>
        </Grid>

        {show==='reviews'&& dataloadingReviews && reviews.length ?
            <AllReviews auth={props.auth}reviews={reviews} setChangeUseEffect={updateSetChangeUseEffect} loginCallback={props.loginCallback} setAuthCallBack={props.ssetAuthCallBack} updateAuthCallBack={props.updateAuthCallBack}/>:null}
        {/* reads */}
        {show==='reads'&&<AllBooks books={props.auth.currentUser.reads} auth={props.auth} heading={`Reads list`} setChangeUseEffect={updateSetChangeUseEffect} updateAuthCallBack={props.updateAuthCallBack}/>}
        {/* to-read */}
        {show==='toRead'&&<AllBooks books={props.auth.currentUser.wants_to_read} auth={props.auth} heading={`To-read list`} setChangeUseEffect={updateSetChangeUseEffect} updateAuthCallBack={props.updateAuthCallBack}/>}
        {/* Following */}
        {show==='following'&&<>
        <Header as='h3' dividing>
                Following
            </Header>
            <AllProfiles users={props.auth.currentUser.following} auth={props.auth} updateAuthCallBack={props.updateAuthCallBack}/></>}
        {/* Followers */}
        {show==='followers'&& <>
        <Header as='h3' dividing>
                Followers
            </Header><AllProfiles users={props.auth.currentUser.followers} auth={props.auth} updateAuthCallBack={props.updateAuthCallBack}/></>}
    </Container>
    )
}
export default Profile