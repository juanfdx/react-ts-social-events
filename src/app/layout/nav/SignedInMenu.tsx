import { Link, useNavigate } from "react-router-dom";
//redux
import { useAppSelector } from "../../store/store";
//firebase
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
//components
import { Dropdown, Image, Menu } from "semantic-ui-react";



export default function SignedInMenu() {

  const { currentUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut(auth)//we use firebase methods
    navigate('/')
  }


  return (
    <Menu.Item position="right">
      <Image avatar spaced='right' src={currentUser?.photoURL || '/user.png'} />
      <Dropdown pointing='top left' text={currentUser?.displayName as string || currentUser?.email as string}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to='/createEvent' text='Create Event' icon='plus' />
          <Dropdown.Item as={Link} to={`/profiles/${currentUser?.uid}`} text='My profile' icon='user' />
          <Dropdown.Item as={Link} to='/account' text='My account' icon='settings' />
          <Dropdown.Item text='Sign out' icon='power' onClick={handleLogout} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  )
}