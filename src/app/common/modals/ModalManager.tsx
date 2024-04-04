import { useAppSelector } from "../../store/store"
//component
import TestModal from "../../../features/scratch/TestModal"
import LoginForm from "../../../features/auth/LoginForm";
import RegisterForm from "../../../features/auth/RegisterForm";


export default function ModalManager() {

    const modalLoockup = {
        TestModal,
        LoginForm,
        RegisterForm
    }

    const {type, data, isOpen} = useAppSelector(state => state.modals)
    
    let renderModal;

    if (isOpen && type) {
        const ModalComponent = (modalLoockup as any)[type]
        renderModal = <ModalComponent data={data} />
    }
  
    return (
    <span>{renderModal}</span>
  )
}