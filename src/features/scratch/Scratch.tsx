import { Button } from 'semantic-ui-react';
import {useAppDispatch, useAppSelector} from '../../app/store/store'
import { decrement, increment, incrementByAmount } from './testSlice';


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
    </div>
  )
}