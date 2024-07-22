import { createContext, useState } from "react";
import { PropsChildren, User, UserContextType } from '../types';

const DEFAULT_STATE: User[] = [
  {
    id: 1,
    name: 'Pedro',
    lastName: 'Lopez',
    email: 'pedrolopez@gmail.com'
  },
  {
    id: 2,
    name: 'Martin',
    lastName: 'Jimenez',
    email: 'martinjimenez@gmail.com'
  },
  {
    id: 3,
    name: 'Marco',
    lastName: 'Araujo',
    email: 'marcoaraujo@gmail.com'
  },
]

export const UsersContext = createContext<UserContextType>({} as UserContextType)

export function UsersContextProvider ({ children }: PropsChildren) {
  const storage = localStorage.getItem('__stateUsers__')
  const [users, setUsers] = useState(storage ? JSON.parse(storage) as User[] : DEFAULT_STATE)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const setUsersStateDefault = () => {
    setUsers(DEFAULT_STATE)
  }

  return (
    <UsersContext.Provider value={{ users, setUsers, editingUser, setEditingUser, setUsersStateDefault }}>
      {children}
    </UsersContext.Provider>
  )
}
