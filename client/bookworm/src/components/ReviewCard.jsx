import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Comment } from 'semantic-ui-react'
import API_URL from '../API_config';

const ReviewCard = (props) => {
    const [dataLoadingBooks, setDataloadingBooks] = useState(false)
    const [selectedBook, setSelectedBook] = useState({}) // State on first render

    useEffect(() => {

        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${props.review.bookId}`)
            .then(res => {
                setSelectedBook(res.data.items[0])
                setDataloadingBooks(true);
            }).catch(err => console.log(err))

    }, []);

    const deleteReview = (reviewId) => {
        axios.delete(`${API_URL}/api/review/removeReview/${props.review._id}`)
            .then(res => {
                props.setChangeUseEffect()
            })
    }


    return (

        <Comment style={{ borderBottom: '0.4px solid #bdbdbd' }} className="pb-3" >

            <Comment.Avatar style={{ width: '50px' }} as='a' src={props.review.reviewerId.avatar} />

            <Comment.Content className="pl-5 ">

                <Comment.Author as='a'>{props.review.reviewerId.name} </Comment.Author>
                <Comment.Metadata>
                    <Comment.Actions>
                        {selectedBook.volumeInfo && <Link to={`books/${props.review.bookId}`}>On {selectedBook.volumeInfo.title}</Link>}
                    </Comment.Actions>
                </Comment.Metadata>
                <Comment.Text dangerouslySetInnerHTML={{ __html: props.review.comment }} ></Comment.Text>
                {props.auth.currentUser._id == props.review.reviewerId._id ? (<Comment.Actions>
                    <a as={Link} to={{
                        pathname: `/editReview`,
                        state: {
                            review: props.review,
                            setChangeUseEffect:props.setChangeUseEffect
                        }
                    }}>Edit</a>
                    <a onClick={() => deleteReview()}>Delete</a>
                </Comment.Actions>) : null}
            </Comment.Content>
        </Comment>


    );
}

export default ReviewCard;
