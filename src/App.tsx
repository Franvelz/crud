import './App.css'
import { TableUsers } from './components/TableUsers.tsx'
import { CreateNewUser } from './components/CreateNewUser.tsx'
import { Toaster } from 'react-hot-toast'

function App () {
  return (
    <main className='main-container'>
      <TableUsers />
      <CreateNewUser />
      <Toaster />
    </main>
  )
}

export default App
