import toast from "react-hot-toast"
import { useUsersContext } from "../hooks/useUsersContex.ts"
import { DeleteIcon, EditIcon } from "./icons/TableIcons.tsx"

export function TableUsers () {
  const { users, setUsers, editingUser, setEditingUser, setUsersStateDefault } = useUsersContext()

  const handleDefaultStateClick = () => {
    setUsersStateDefault()
    toast.success('Estado por default', { position: 'bottom-right' })
  }

  const handleDeleteClick = (userId: number) => {
    const userFind = users.find((user) => user.id === userId)
    const newUsersState = users.filter((user) => user.id !== userId)
    const prevUsersState = [...users]

    setUsers(newUsersState)

    fetch(`https://jsonplaceholder.typicode.com/users/${userFind?.id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          toast.success(`Usuario ${userFind?.id} ${userFind?.name} eliminado correctamente`, { position: 'bottom-right' })
        } else {
          throw new Error('Error al eliminar el usuario')
        }
      })
      .catch((e) => {
        setUsers(prevUsersState)
        toast.error(`Hubo un error al tratar de eliminar el usuario. ${e}`, { position: 'bottom-right' })
      })
  }

  const handleEditClick = (userId: number) => {
    const user = users.find((user) => user.id === userId)
    if (user) {
      setEditingUser(user)
    }
  }

  return (
    <>
      <button className="button-default-state" onClick={handleDefaultStateClick}>Estado Default</button>
      <div className="container-table">
        <table className="table-users">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <p>{user.id}</p>
                  </td>
                  <td>
                    <p>{user.name}</p>
                  </td>
                  <td>
                    <p>{user.lastName}</p>
                  </td>
                  <td>
                    <p>{user.email}</p>
                  </td>
                  <td>
                    <div className="td-buttons">
                      <button disabled={editingUser ? true : false} onClick={() => handleDeleteClick(user.id)}>
                        <DeleteIcon />
                      </button>
                      <button onClick={() => handleEditClick(user.id)}>
                        <EditIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
