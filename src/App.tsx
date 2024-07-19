import './App.css'
import { TableUsers } from './components/TableUsers.tsx'
import { CreateNewUser } from './components/CreateNewUser.tsx'

function App () {
  return (
    <main className='main-container'>
      <TableUsers />
      <CreateNewUser />
    </main>
  )
}

export default App

// Agregar footer para ver los estados
