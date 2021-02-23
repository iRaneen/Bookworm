import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Item, Button, Image, Icon } from 'semantic-ui-react'
import API_URL from '../API_config';

const BookCard = (props) => {
    let id =useParams()
    const [selectedBook , setSelectedBook]= useState(props.book) //book id
    const [dataLoading, setDataloading] = useState(false)
    const {volumeInfo } = selectedBook

    useEffect(() => {
        
        if (!volumeInfo) {
            id=props.book;
            axios
            .get(`https://www.googleapis.com/books/v1/volumes?q=${id}`)
                .then(res => {
                    if(!res.data.items) return setDataloading(false)
                    console.log(res)
                    setSelectedBook(res.data.items[0])
                    setDataloading(true)
                })

        }
        else {
            setDataloading(true)
        }

    }, [])

    const addReads =(bookId)=>{
        axios.post(`${API_URL}/api/book/addReads/${props.auth.currentUser._id}/${bookId}`)
        .then(res =>{
            
            props.updateAuthCallBack(res.data.user)
            props.setChangeUseEffect()
        })
        
        
    }

    const removeReads =(bookId)=>{
        console.log("remove reads")
        axios.post(`${API_URL}/api/book/removeReads/${props.auth.currentUser._id}/${bookId}`)
        .then(res =>{
            
            props.updateAuthCallBack(res.data.user)
            props.setChangeUseEffect()
        })
    }

    const addToRead =(bookId)=>{

        axios.post(`${API_URL}/api/book/addToRead/${props.auth.currentUser._id}/${bookId}`)
        .then(res =>{
            
            props.updateAuthCallBack(res.data.user)
            props.setChangeUseEffect()
        })
    }

    const removeToRead =(bookId)=>{

        axios.post(`${API_URL}/api/book/removeToRead/${props.auth.currentUser._id}/${bookId}`)
        .then(res =>{
            props.updateAuthCallBack(res.data.user)
            props.setChangeUseEffect()
        })
    }

    const removeRecommendation =(bookId)=>{

    }

    const addRecommendation =(bookId)=>{

    }

    return (
        (dataLoading && selectedBook.volumeInfo&&
        <Item>
            {selectedBook.volumeInfo.imageLinks ? <Item.Image src={selectedBook.volumeInfo.imageLinks.thumbnail} /> :
                <Item.Image />}

            <Item.Content>
                <Item.Header as={Link} to={`/books/${selectedBook.id}`}>{selectedBook.volumeInfo.title}</Item.Header>
                <Item.Meta>
                    {selectedBook.volumeInfo.authors ? <span className='cinema'>{selectedBook.volumeInfo.authors[0]}</span> : ''}

                </Item.Meta>
                <Item.Description>{selectedBook.volumeInfo.description}</Item.Description>
                <Item.Extra>
                    <Button  as={Link} to={`/books/${selectedBook.id}`} primary floated='right' className='mt-3'>
                        Read Reviews
                    <Icon name='right chevron' />
                    </Button>
                    {/* check if already in to-read */}
                    {props.auth.isLoggedIn? (props.auth.currentUser.reads.includes(selectedBook.id)?
                    (<Button onClick={()=>removeReads(selectedBook.id)} negative floated='right' className='mt-3'>
                        Reads
                    <Icon name='right minus' />
                    </Button>)
                    :
                    (<Button onClick={()=>addReads(selectedBook.id)} positive floated='right' className='mt-3'>
                        Reads
                    <Icon name='right plus' />
                    </Button>)):null}
                    {/* check if already in to-read */}
                    {props.auth.isLoggedIn? (props.auth.currentUser.wants_to_read.includes(selectedBook.id)?
                    (<Button onClick={()=>removeToRead(selectedBook.id)} negative floated='right' className='mt-3'>
                        To-read
                    <Icon name='right minus' />
                    </Button>)
                    :
                    (<Button onClick={()=>addToRead(selectedBook.id)} positive floated='right' className='mt-3'>
                        To-read
                    <Icon name='right plus' />
                    </Button>)):null}
                    {props.auth.isLoggedIn? 
                    (props.auth.currentUser.type==='admin'?
                    ((props.recommendation.includes(selectedBook.id)?
                    (<Button onClick={()=>addRecommendation(selectedBook.id)} negative floated='right' className='mt-3'> 
                    Un-Recommend
                   <Icon name='right minus' />
                   </Button>)
                   :
                   (<Button onClick={()=>removeRecommendation(selectedBook.id)} positive floated='right' className='mt-3'>
                    Recommend
                    <Icon name='right plus' />
                    </Button>)
                    ))
                     :
                    (null)
                    )
                    :(null)}

                    <h5 className="mt-5 mb-2">Check Stores:</h5>
                    <a href={`https://www.jarir.com/catalogsearch/result/?order=priority&dir=asc&q=${selectedBook.volumeInfo.title}`} target="_blank"><Image src='https://pbs.twimg.com/profile_images/1519843369/logo_400x400.png' avatar /></a>
                    <a href={`https://jamalon.com/en/catalogsearch/result/?q=${selectedBook.volumeInfo.title}`} target="_blank"><Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkCi7xwnpdrrL1TdVetN5vzEayoa7Wm94fJw&usqp=CAU' avatar /></a>
                    <a href={`${selectedBook.volumeInfo.previewLink}`} target="_blank"><Image src='https://i.pinimg.com/originals/52/a2/5c/52a25c9fded18f23c6da89d7ac9b6d02.jpg' avatar /></a>

                </Item.Extra>
            </Item.Content>
        </Item>)

    );
}

export default BookCard;
