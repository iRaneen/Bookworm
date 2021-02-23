import React, { useEffect, useState } from 'react';
import { Container, Grid, Form, Input, Radio } from 'semantic-ui-react'
import axios from 'axios';
import AllBooks from './AllBooks';
import AllProfiles from './AllProfiles';
import API_URL from '../API_config';

const Searching = (props) => {
    const [value, setValue] = useState('Book');
    const [searchField, setSearchField] = useState('');
    const [searchResAcc,setSearchResAcc]=useState([]);
    const [searchRes,setSearchRes]=useState([]);
    const [foundData,setFoundData]=useState(false);
    const [changeUseEffect, setChangeUseEffect] = useState(false)

    const updateSetChangeUseEffect=()=>{
        
        setChangeUseEffect(!changeUseEffect);
    }

    useEffect(() => {


    }, [changeUseEffect]);


    const handleSearch = (e) => {    
        setSearchField(e.target.value);  
    }
    
    const handleChange = (e, { value }) =>
    {
        setValue(value)
        setSearchRes([]);
        setSearchResAcc([]);
        setFoundData(false);
    
    };

   
    const handleSubmit =()=>{
        //search by book
        setSearchResAcc([]);
        setSearchRes([]);
        if(value==='Book'){
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchField}`)
            .then(res =>{
               
                console.log(res.data.items)
                setSearchRes(res.data.items)
                setFoundData(true)
                
               
            }).catch(err=>console.log(err))
        }
        
        //search by user's name (Account)/search/:username
        else {
            axios.get(`${API_URL}/api/user/search/${searchField}`)
            .then(res =>{
               
                console.log("search results: ",res.data.users)
                setSearchResAcc(res.data.users)
                setFoundData(true)
                
               
            }).catch(err=>console.log(err))
        }
        
    }

    return (
        <Container  className="mt-5 pb-5 container-bg">
            
            <Grid className="pl-5">
                <Grid.Row>
                    <Grid.Column>
                        <Form className='m-5'>
                            <Input icon='search' placeholder='Search...'
                            type='text'
                            onChange={ handleSearch}
                             />
                            {/* <Search
                                type='text'
                                // value={this.state.value} 
                                size='big'
                                placeholder=' Search ...' 
                                onSearchChange={ handleSearch}/> */}

                            <Form.Field className='mt-3 ml-5' >
                                Search by: <b>{value}</b>
                            </Form.Field>
                            <Form.Field>
                                <Radio
                                    label='Book'
                                    name='radioGroup'
                                    value='Book'
                                    checked={value === 'Book'}
                                    onChange={handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Radio
                                    label='Account'
                                    name='radioGroup'
                                    value='Account'
                                    checked={value === 'Account'}
                                    onChange={handleChange}
                                />
                            </Form.Field>
                            <Input type="submit" value="Submit" onClick={handleSubmit} />
                        </Form>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    {foundData?
                    (value==='Book'?
                    ((searchRes?<AllBooks setChangeUseEffect={updateSetChangeUseEffect} recommendations={props.recommendations} updateAuthCallBack={props.updateAuthCallBack} books={searchRes} auth={props.auth} heading={`Search results for ${searchField}`}/>:<h1>No result found for {searchField} in books</h1>))
                    :
                    (((searchResAcc.length?<AllProfiles updateAuthCallBack={props.updateAuthCallBack} users={searchResAcc} auth={props.auth} heading={`Search for ${searchField}`} />:<h1>No account found for {searchField}</h1>))))
                    :
                    (<h1>Search by {value}</h1>)
                   }
                   
                   {/* (searchRes?<AllBooks books={searchRes}/>:<h1>no result</h1>)
                    :
                    (<h1>Search by Book</h1>) */}
                    </Grid.Row>
            </Grid>

        </Container>
    );
}

export default Searching;
