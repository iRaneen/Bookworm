import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import API_URL from '../API_config';
const ProfileCard = (props) => {

    const [changeUseEffect, setChangeUseEffect] = useState(false)

    useEffect(() => {

    }, [changeUseEffect]);

    const unfollow =(userId,idToUnfollow)=>{
        axios.post(`${API_URL}/api/user/unfollow/${userId}/${idToUnfollow}`)
        .then(res =>{
            console.log(res.data.user)
            props.updateAuthCallBack(res.data.user)
            setChangeUseEffect(!changeUseEffect)
            
        })
    }

    const follow =(userId,idTofollow)=>{
        axios.post(`${API_URL}/api/user/follow/${userId}/${idTofollow}`)
        .then(res =>{
            console.log(res.data.user)
            props.updateAuthCallBack(res.data.user)
            setChangeUseEffect(!changeUseEffect)
            
        })
    }


    return (
        <Card>

            <Image style={{minHeight:"290px",maxHeight:"290px" ,backgroundColor:"white" }} src={props.user.avatar} wrapped ui={true} />

            <Card.Content>
                <Card.Header style={{ color: "#240a55" }}>{props.user.name}</Card.Header>
                {/* <Card.Meta>
                <span className='date'>Joined in 2015</span>
            </Card.Meta> */}
                {/* <Card.Description>
                Matthew is a musician living in Nashville.
            </Card.Description> */}
            </Card.Content>
            <Card.Content extra>

                {/* (UserData.follower.some(e => e.username === CurrentUser.username)) */}
                {/* (props.auth.currentUser.following.includes(props.user._id) */}
                {props.auth.isLoggedIn ?
                    (props.auth.currentUser._id !== props.user._id ?
                        (props.auth.currentUser.following.some(user => user._id === props.user._id) ?
                            (<Button onClick={() => unfollow(props.auth.currentUser._id, props.user._id)}>Unfollow</Button>)
                            : (<Button onClick={() => follow(props.auth.currentUser._id, props.user._id)}>Follow</Button>))
                        : (<Button as={Link} to='/editprofile' auth={props.auth} > Edit Profile</Button>)) : (null)}


            </Card.Content>
        </Card>
    );
}

export default ProfileCard;
