import axios from "axios";
import { Editor } from "primereact/editor";
import { useState } from "react";
import { Container, Form, Item } from "semantic-ui-react";
import API_URL from "../API_config";

export default function EditReview(props) {
   
    const {review}=props.location.state;
    const [comment, setComment] = useState(review.comment) // JUMP to return
    
    const onSubmit = (e) => {
        e.preventDefault();
        //user post a new comment
        axios
            .put(`${API_URL}/api/review/updateReview/${review._id}`, { updateReview: comment })
            .then(res => {
                props.setChangeUseEffect();
            }).catch(err => console.log(err))
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
            {<Container className="mt-5 pb-5">

                <Form onSubmit={(e) => onSubmit(e)}>
                    <Item.Header className="mt-2 ml-3" >Edit your review</Item.Header>
                    <Editor dangerouslySetInnerHTML={{ __html:review.comment }} className="mt-3 pb-4" style={{ height: '250px', backgroundColor: 'white' }} value={comment} onTextChange={(e) => setComment(e.htmlValue)} headerTemplate={header} />
                    <Form.Button content='Submit' />
                </Form>

            </Container>}
        </>
    )
}