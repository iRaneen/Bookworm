import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function Footer() {
    return (
        <footer style={{ position: "fixed", bottom: "0", width: "100%",height:"30px", background: "#64a9af" }}>
            <p style={{ fontStyle:"bold" ,color: "rgba(159, 237, 215, 0.5)", fontWeight: "lighter", textAlign: "center" }}>
                <Button as={Link} to='/about' style={{ background: "none", border: "none", textAlign: "end", fontStyle:"bold" ,color: "rgba(159, 237, 215, 0.5)" }} > | about us |</Button> bookworm</p>

        </footer>
    )
} 