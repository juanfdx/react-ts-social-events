import { Link, useNavigate } from "react-router-dom";
//redux
import { useAppDispatch, useAppSelector } from "../../store/store";
import { signOut } from "../../../features/auth/authSlice";
//components
import { Dropdown, Image, Menu } from "semantic-ui-react";



export default function SignedInMenu() {

  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  function handleSignOut() {
    dispatch(signOut())
    navigate('/')
  }


  return (
    <Menu.Item position="right">
      <Image avatar spaced='right' src='/user.png' />
      <Dropdown pointing='top left' text={currentUser?.email}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to='/createEvent' text='Create Event' icon='plus' />
          <Dropdown.Item text='My profile' icon='user' />
          <Dropdown.Item text='Sign out' icon='power' onClick={handleSignOut} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  )
}