import { useContext } from "react";
import { UsersContext } from "../context/users";

export function useUsersContext () {
  const { users, setUsers, editingUser, setEditingUser, setUsersStateDefault } = useContext(UsersContext)

  return { users, setUsers, editingUser, setEditingUser, setUsersStateDefault }
}