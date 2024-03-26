import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
//components
import SignedOutButton from "./SignedOutButton";
import SignedInMenu from "./SignedInMenu";



export default function Navbar() {

  const [auth, setAuth] = useState(false);


  return (
    <Menu inverted={true} fixed="top">
      <Container>

        <MenuItem header as={NavLink} to='/'>
          <img src="/logo.png" alt="logo" />
        </MenuItem>

        <MenuItem name="Events" as={NavLink} to='/events' />

        <MenuItem name="Scratch" as={NavLink} to='/scratch' />

        <MenuItem >
          <Button 
            as={NavLink} 
            to='/createEvent'
            floated="right" 
            positive={true} 
            inverted={true} 
            content='Create event'
          />
        </MenuItem>
  
        {auth ? <SignedInMenu setAuth={setAuth} /> : <SignedOutButton setAuth={setAuth} />}
        
      </Container>
    </Menu>
  )
}