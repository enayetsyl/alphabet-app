import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AlphabetDisplay from './AlphabetDisplay.jsx'
import AlphabetTest from './AlphabetTest.jsx'
import AlphabetTest2 from './AlphabetTest2.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <AlphabetDisplay />,
  },
  {
    path: '/test',
    element: <AlphabetTest />,
  },
  {
    path: '/test2',
    element: <AlphabetTest2 />,
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
