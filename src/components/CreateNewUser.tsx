import { FormEvent, useState } from "react"
import { useUsersContext } from "../hooks/useUsersContex"
import { User } from "../types"

export function CreateNewUser () {
  const { users, setUsers } = useUsersContext()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    const name = formData.get('name')?.toString()
    const lastName = formData.get('lastName')?.toString()
    const email = formData.get('email')?.toString()
    
    if (!name || !lastName || !email) {
      setError('Todos los campos deben estar completos')
      return
    }

    const newUser: User = {
      id: users.length + 1,
      name: name,
      lastName: lastName,
      email: email
    }

    setError(null)
    setUsers([...users, newUser])
    form.reset()
  }

  return (
    <div className="div-form">
      <form className="form-new-user" onSubmit={handleSubmit}>
        <input type="text" name="name" id="name" placeholder="Name..."/>
        <input type="text" name="lastName" id="lastName" placeholder="Last Name..."/>
        <input type="text" name="email" id="email" placeholder="Email..."/>
        <button type="submit">Crear Nuevo Usuario</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}
