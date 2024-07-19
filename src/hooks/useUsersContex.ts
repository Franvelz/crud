import { useContext } from "react";
import { UsersContext } from "../context/users";

export function useUsersContext () {
  const { users, setUsers, editingUser, setEditingUser } = useContext(UsersContext)

  return { users, setUsers, editingUser, setEditingUser }
}