import React from 'react';
import { Item, Header } from 'semantic-ui-react'
import BookCard from './BookCard';



const AllBooks = (props) => {
    
    const allBooks = props.books.map(book => {
        if(book.bookId) return (<BookCard book={book.bookId} setChangeUseEffect={props.setChangeUseEffect} auth={props.auth} recommendations={props.recommendations} updateAuthCallBack={props.updateAuthCallBack} />)
        else return (<BookCard book={book} auth={props.auth} setChangeUseEffect={props.setChangeUseEffect} recommendations={props.recommendations} updateAuthCallBack={props.updateAuthCallBack} />)
    })
    return (
        <>
            <Header as='h3' dividing>
                {props.heading}
            </Header>
            <Item.Group divided>
                {allBooks}
            </Item.Group>
        </>
    );
}

export default AllBooks;
