export interface User {
  id: number
  name: string
  lastName: string
  email: string
}

export interface PropsChildren {
  children: React.ReactNode
}

export interface UserContextType {
  users: User[]; 
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}