import { FormEvent, useEffect, useState } from "react"
import { useUsersContext } from "../hooks/useUsersContex"
import { User } from "../types"
import toast from "react-hot-toast";

export function CreateNewUser () {
  const { users, setUsers, editingUser, setEditingUser } = useUsersContext()

  const prevUsersState = [...users]
  const lastUser = users.slice(-1)[0]

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

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
      toast.error('Todos los campos deben estar completos', { position: 'bottom-right' });
      return
    }

    // Validar email simple
    const emailPattern = /^\w+@\w/
    if (!emailPattern.test(email)) {
      toast.error('Email invalido', { position: 'bottom-right' })
      return
    }

    if (editingUser) { // Editar usuario
      const editedNewUserList: User[] = users.map((user) => (
        user.id === editingUser.id ? { ...user, name, lastName, email } : user
      ))
      setEditingUser(null)
      setUsers(editedNewUserList)

      fetch(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, {
        method: 'PUT',
        body: JSON.stringify(editedNewUserList),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => {
          if (res.ok) {
            toast.success(`Usuario ${name} editado correctamente`, { position: 'bottom-right' })
            return res.json()
          } else {
            throw new Error('Error al editar usuario')
          }
        })
        .catch((e) => {
          setUsers(prevUsersState)
          toast.error(`Hubo un error al tratar de editar el usuario. ${e}`, { position:'bottom-right' })
          console.error(e)
        })
    } else { // Crear usuario
      const newUser: User = {
        id: lastUser ? lastUser.id + 1 : 1,
        name: name,
        lastName: lastName,
        email: email
      }

      setUsers([...users, newUser])

      fetch(`https://jsonplaceholder.typicode.com/users`, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((res) => {
          if (res.ok) {
            toast.success(`Usuario ${name} creado correctamente`, { position: 'bottom-right' })
            return res.json()
          } else {
            throw new Error('Error al crear usuario')
          }
        })
        .catch((e) => {
          setUsers(prevUsersState)
          toast.error(`Hubo un error al tratar de crear el usuario. ${e}`, { position:'bottom-right' })
        })
    }

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

  useEffect(() => {
    localStorage.setItem('__stateUsers__', JSON.stringify(users))
  }, [users])

  return (
    <form className="form-new-user" onSubmit={handleSubmit}>
      <div className="div-input">
        <input
          className="input-default"
          type="text"
          name="name"
          id="name"
          value={name}
          placeholder="Nombre..."
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="div-input">
        <input
          className="input-default"
          type="text" 
          name="lastName" 
          id="lastName" 
          value={lastName} 
          placeholder="Apellido..."
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>
      <div className="div-input">
        <input
          className="input-default"
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
      </div>
    </form>
  )
}
