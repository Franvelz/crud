import { FormEvent, useEffect, useState } from "react"
import { useUsersContext } from "../hooks/useUsersContex"
import { User } from "../types"

export function CreateNewUser () {
  const { users, setUsers, editingUser, setEditingUser } = useUsersContext()
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name)
      setLastName(editingUser.lastName)
      setEmail(editingUser.email)
    }
  }, [editingUser])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    if (!name || !lastName || !email) {
      setError('Todos los campos deben estar completos')
      return
    }

    if (editingUser) {
      const editedNewUser: User[] = users.map((user) => (
        user.id === editingUser.id ? { ...user, name, lastName, email } : user
      ))
      setEditingUser(null)
      setUsers(editedNewUser)
    } else {
      const newUser: User = {
        id: users.length + 1, // Crear ID unico
        name: name,
        lastName: lastName,
        email: email
      }
      setUsers([...users, newUser])
    }

    setError(null)
    setName("")
    setLastName("")
    setEmail("")
  }

  const handleReset = () => {
    setName("")
    setLastName("")
    setEmail("")
    setEditingUser(null)
  }

  return (
    <form className="form-new-user" onSubmit={handleSubmit}>
      <div className="div-input">
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          placeholder="Name..."
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="div-input">
        <input
          type="text" 
          name="lastName" 
          id="lastName" 
          value={lastName} 
          placeholder="Last Name..."
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>
      <div className="div-input">
        <input 
          type="text" 
          name="email" 
          id="email" 
          value={email} 
          placeholder="Email..."
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="div-button-submit">
        <button type="submit">{editingUser ? 'Editar' : 'Crear Nuevo Usuario'}</button>
        <button type="reset" onClick={handleReset}>Cancelar</button>
        {error && <p className="paragraph-error">{error}</p>}
      </div>
    </form>
  )
}
