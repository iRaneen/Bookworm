import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

export default function About(props) {
    return (
        < >
            <p style={{
                 marginLeft: "600px", opacity: "0.5", paddingLeft: "10px", textAlign: "center", width: "800px", height: "300px", color: "rgb(2, 102, 112", fontSize:"24px",background:"white", marginTop:"100px", paddingTop:"80px"}}>We provide many books in different fields. You have to login or signup to join bookworm world. You can leave your review to share it with others and see what others think. We wish you a good time</p>
                <div style={{background:"#026670", width:"83vh", height:"15px", marginLeft:"600px", borderRadius:"5px"}}> </div>
                <div style={{
                 marginLeft: "600px", opacity: "0.5", paddingLeft: "10px", textAlign: "center", width: "800px", height: "300px", color: "rgb(2, 102, 112", fontSize:"30px",background:"white", marginTop:"20px", paddingTop:"90px"}}>JOIN US NOW <Button as ={Link} to ='/signup' style={{color:"rgb(2, 102, 112", fontSize:"20px"}}>Sign up</Button> </div>
                
            {/* <img style={{width:"340px", marginTop:"100px", marginLeft:"100px"}} src="https://images2.minutemediacdn.com/image/upload/c_crop,h_2146,w_3819,x_0,y_200/f_auto,q_auto,w_1100/v1565275119/shape/mentalfloss/gettyimages-938171020.jpg" alt=""/>
            <img style={{width:"340px", marginTop:"100px", marginLeft:"300px"}} src="https://mymodernmet.com/wp/wp-content/uploads/2019/12/best-art-books-2019.jpg" alt=""/> */}
        </>
    )
}