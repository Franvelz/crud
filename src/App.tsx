import './App.css'
import { TableUsers } from './components/TableUsers.tsx'
import { CreateNewUser } from './components/CreateNewUser.tsx'

function App () {
  return (
    <>
      <TableUsers />
      <CreateNewUser />
    </>
  )
}

export default App

// Agregar footer para ver los estados
// Agregar acciones: Eliminar y Editar un usuario
// Agregar estilos
