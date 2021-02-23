import axios from 'axios';
import React, { useState, useEffect } from 'react'
import BookCard from './BookCard';
import AllReviews from './AllReviews';
import { useParams } from 'react-router-dom';
import { Container, Form, Item } from 'semantic-ui-react';
import { Editor } from 'primereact/editor';
import API_URL from '../API_config'

export default function ShowOneBook(props) {

    // if (!props.auth.currentUser) {
    //     console.log("callback")
    //     props.loginCallback()
    // }

    const { id } = useParams()
    const [dataLoadingBooks, setDataloadingBooks] = useState(false)
    const [dataloadingReviews, setDataloadingReviews] = useState(false)
    const [selectedBook, setSelectedBook] = useState({}) // State on first render
    const [reviews, setReviews] = useState([])
    const [comment, setComment] = useState('') // JUMP to return
    const [changeUseEffect, setChangeUseEffect] = useState(false)

    
    // const {id} = selectedBook
    useEffect(() => {

        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${id}`)
            .then(res => {
                setSelectedBook(res.data.items[0])
                setDataloadingBooks(true);
            }).catch(err => console.log(err))

     
        axios
            .get(`${API_URL}/api/review/book/${id}`)
            .then(res => {
                setReviews(res.data.reviews);
                setDataloadingReviews(true);
            }).catch(err => console.log(err))

    }, [changeUseEffect])

    const onSubmit = (e) => {
        e.preventDefault();
        //user post a new comment
        axios
            .post(`${API_URL}/api/review/${id}/${props.auth.currentUser._id}`, { comment: comment })
            .then(res => {
                setReviews((prevReviews) => [...prevReviews, res.data.review]);
            }).catch(err => console.log(err))
    }
    const updateSetChangeUseEffect=()=>{
        
        setChangeUseEffect(!changeUseEffect);
    }

    const header = (
        <span className="ql-formats" >
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
            <button className="ql-underline" aria-label="Underline"></button>
        </span>
    );

    
    return (
        <>
            {dataLoadingBooks && dataloadingReviews && <Container className="mt-5 pb-5">
                <Item.Group divided>
                    <BookCard updateAuthCallBack={props.updateAuthCallBack} book={selectedBook} loginCallback={props.loginCallback} auth={props.auth}/>
                    <Item>
                        <Item.Content>
                            <Form onSubmit={(e) => onSubmit(e)}>
                                <Item.Header className="mt-2 ml-3" >Share your review</Item.Header>
                                <Editor className="mt-3 pb-4" style={{ height: '250px', backgroundColor: 'white' }} value={comment} onTextChange={(e) => setComment(e.htmlValue)} headerTemplate={header} />
                                <Form.Button content='Submit' />
                            </Form>
                        </Item.Content>
                    </Item>

                    {reviews.length ? (<AllReviews updateAuthCallBack={props.updateAuthCallBack} setChangeUseEffect={updateSetChangeUseEffect} reviews={reviews} auth={props.auth} /> ) : null}

                </Item.Group>
             
            </Container>}
        </>
    )
}