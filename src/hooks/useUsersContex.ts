import { useContext } from "react";
import { UsersContext } from "../context/users";

export function useUsersContext () {
  const { users, setUsers } = useContext(UsersContext)

  return { users, setUsers }
}