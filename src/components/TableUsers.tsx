import { useUsersContext } from "../hooks/useUsersContex.ts"

export function TableUsers () {
  const { users } = useUsersContext()

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
