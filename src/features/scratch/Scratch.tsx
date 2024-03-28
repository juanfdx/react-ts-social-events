import { Button } from 'semantic-ui-react';
//redux
import {useAppDispatch, useAppSelector} from '../../app/store/store'
import { decrement, increment, incrementByAmount } from './testSlice';
import { openModal } from '../../app/common/modals/modalSlice';


export default function Scratch() {

  const {data} = useAppSelector(state => state.test)
  const dispatch = useAppDispatch();
  
  return (
    <div>
      <h1>scratch</h1>
      <h3>data is: {data}</h3>

      <Button color='green' content='Increment' onClick={() => dispatch(increment())} />
      <Button color='red' content='Decrement' onClick={() => dispatch(decrement())} />
      <Button color='teal' content='Increment by 5' onClick={() => dispatch(incrementByAmount(5))} />
      <Button 
        color='teal' 
        content='Open modal' 
        onClick={() => dispatch(openModal({type: 'TestModal', data: data}))} 
      />
    </div>
  )
}