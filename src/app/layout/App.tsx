import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Container } from "semantic-ui-react"
//redux
import { useAppDispatch } from "../store/store"
import { logout, signIn } from "../../features/auth/authSlice"
//firebase
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../config/firebase"
//components
import Navbar from "./nav/Navbar"
import HomePage from "../../features/Home/HomePage"
import ModalManager from "../common/modals/ModalManager"


function App() {

  const location = useLocation()
  const dispatch = useAppDispatch();


  useEffect(() => {
    //onAuthStateChanged is a firebase function that gets fired when the user is logged in or not
    onAuthStateChanged(auth, {
      next: (user) => {
        if (user) { dispatch(signIn(user)) } 
        else { dispatch(logout()) }
      },
      error: (error) => {console.log(error)},
      complete: () => {}
    })
  
  }, [dispatch])
  

  return (
    <>
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <ModalManager />
          <Navbar  />
          <Container className="main">
            <Outlet />
          </Container>
        </>
      )}
    </>
    
  )
}

export default App
