import React from 'react';
import { Comment, Header} from 'semantic-ui-react'
import ReviewCard from './ReviewCard';

const AllReviews = (props) => {
    const allreviews = props.reviews.map(review => {
        return (<ReviewCard setChangeUseEffect={props.setChangeUseEffect} auth={props.auth} updateAuthCallBack={props.updateAuthCallBack} review={review} />)
    })
    return (
        <Comment.Group size='large' className=" mt-5">
            <Header as='h3' dividing>
                Reviews
        </Header>
            {allreviews}
        </Comment.Group>
    );
}

export default AllReviews;
