import { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
//redux
import { useAppDispatch } from "../../app/store/store";
import { closeModal } from "../../app/common/modals/modalSlice";
//hooks
import { useFireStore } from "../../app/hooks/fireStore/useFireStore";
//firebase
import { AuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../app/config/firebase";
import { Timestamp } from "firebase/firestore";


export default function SocialLogin() {

  const [status, setStatus] = useState<any>({
    isLoading: false,
    provider: null
  })

  const {set} = useFireStore('profiles');
  const dispatch = useAppDispatch();

  async function handleSocialLogin(selectedProvider: string) {
    setStatus({
      isLoading: true,
      provider: selectedProvider
    })

    let provider: AuthProvider;
    
    if (selectedProvider === 'github') {
      provider = new GithubAuthProvider();
    } else if (selectedProvider === 'google') {
      provider = new GoogleAuthProvider();
    } else return;

    try {
      if (provider) {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        //check if the user is new
        if (result.user.metadata.creationTime === result.user.metadata.lastSignInTime) {
          await set(result.user.uid, {
            displayName: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
            createdAt: Timestamp.now()
          });
        } 
        dispatch(closeModal());
      }
      
    } catch (error: any) {
      toast.error(error.message);

    } finally {
      setStatus({
        isLoading: false,
        provider: null
      })
    }

  }

  
  return (
    <>
      <Button 
        type='button' 
        fluid 
        color='black' 
        style={{marginBottom: '10px'}}
        loading={status.isLoading && status.provider === 'github'}
        onClick={() => handleSocialLogin('github')}
      >
        <Icon name='github' /> Login with GitHub
      </Button>

      <Button 
        type='button' 
        fluid 
        color='google plus' 
        style={{marginBottom: '10px'}}
        loading={status.isLoading && status.provider === 'google'}
        onClick={() => handleSocialLogin('google')}
      >
        <Icon name='google' /> Login with Google
      </Button>
    </>
  )
}