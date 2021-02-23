import React from 'react';
import { Card } from 'semantic-ui-react'
import ProfileCard from './ProfileCard';

const AllProfiles = (props) => {
    const allProfiles = props.users.map(user => {
        return (< ProfileCard loginCallback={props.loginCallback} user={user} auth={props.auth} updateAuthCallBack={props.updateAuthCallBack} />)
    })
    return (
        <>
            <Card.Group className="marginzero">
                {allProfiles}
            </Card.Group>
        </>
    );
}

export default AllProfiles;
