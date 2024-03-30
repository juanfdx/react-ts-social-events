import './app/layout/styles.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/Routes.tsx'
//redux
import { Provider } from 'react-redux'
import { store } from './app/store/store.ts'
//toastify
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer 
        position='bottom-right'
        hideProgressBar 
        theme='colored'
        autoClose={4000} 
        pauseOnFocusLoss={false} 
        limit={3}
      />
    </Provider>
  </React.StrictMode>,
)
