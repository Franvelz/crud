import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UsersContextProvider } from './context/users.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <UsersContextProvider>
    <App />
  </UsersContextProvider>
)
