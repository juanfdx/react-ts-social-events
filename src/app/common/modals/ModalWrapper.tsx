import { ReactNode } from "react";
import { Modal, ModalProps } from "semantic-ui-react";
//redux
import { useAppDispatch, useAppSelector } from "../../store/store";
import { closeModal } from "./modalSlice";


type Props = {
  children: ReactNode,
  header?: string,
} & ModalProps //from "semantic-ui-react" because we are using that library;


export default function ModalWrapper({children, header, ...props}: Props) {

  const{isOpen} = useAppSelector(state => state.modals)
  const dispatch = useAppDispatch()

  return <Modal open={isOpen} size={props.size} onClose={() => dispatch(closeModal())} >
    {header && <Modal.Header>{header}</Modal.Header>}
    <Modal.Content>
      {children}
    </Modal.Content>
  </Modal>;
}
