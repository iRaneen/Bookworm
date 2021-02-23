import React, { useState } from 'react'
import { Button, Container, Form, Grid, Image, Segment } from 'semantic-ui-react'
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function EditProfile(props) {

    const history = useHistory();
    const [name, setName] = useState(''); // user info
    const [image, setImage] = useState(props.auth.currentUser.avatar)
    const [loading, setLoading] = useState(false)
    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'bookwormAvatar')
        setLoading(true)
        axios.post('https://api.cloudinary.com/v1_1/bookwormcloud/image/upload', data)
            .then(res => {
                const file = res.data
                setImage(file.secure_url)
                setLoading(false)
            }).catch(err => { console.log(err) })

    }
    //to add the input inside user
    const onChangeInput = (e) => {
        setName(e.target.value);
        console.log(e.target.value)
        console.log(name)
    };

    const onSubmit = (event, userId) => {
        event.preventDefault();
        if (!loading) {

            axios.put("http://localhost:5000/api/user/editProfile", { userId: props.auth.currentUser._id, name: name? name:props.auth.currentUser.name,avatar:image })
                .then((res) => {
                    const user = res.data.updatedProfle;
                    props.updateAuthCallBack(user)
                    history.push('/profile')
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <>
            <Container textAlign='center mt-5'>
                <Segment placeholder>
                    <Grid columns={1} relaxed='very' stackable>
                        <Grid.Column textAlign="center">
                            {loading ? (
                                <h3>Loading...</h3>
                            ) : (
                                    <Image src={image} size='small' verticalAlign="middle" />
                                )}
                        </Grid.Column>
                        <Grid.Column>
                            <Form >
                                <Form.Input
                                    icon='user'
                                    iconPosition='left'
                                    label='Name'
                                    placeholder='name'
                                    name='name'
                                    required={true}
                                    onChange={(e) => onChangeInput(e)}
                                />
                                <Form.Input
                                    label='Choose your image'
                                    type='file'
                                    onChange={uploadImage}
                                />
                                <Button
                                    variant="primary"
                                    type="submit"
                                    onClick={(e) => onSubmit(e)} >Edit </Button>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Container>
        </>
    )
}