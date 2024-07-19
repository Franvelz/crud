import { useUsersContext } from "../hooks/useUsersContex.ts"
import { DeleteIcon, EditIcon } from "./icons/TableIcons.tsx"

export function TableUsers () {
  const { users, setUsers, editingUser, setEditingUser } = useUsersContext()

  const handleDeleteClick = (userId: number) => {
    const newUsersState = users.filter((user) => user.id !== userId) // Hacer algo diferente (?
    setUsers(newUsersState)
  }

  const handleEditClick = (userId: number) => {
    const user = users.find((user) => user.id === userId)
    if (user) {
      setEditingUser(user)
    }
    console.log(user)
  }

  return (
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
  )
}
