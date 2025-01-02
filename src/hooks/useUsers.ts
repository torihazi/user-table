import { useMemo, useState } from "react";
import { SortDirection, SortKey, User } from "../type/user";
import { getMatchingMentors, getMatchingStudents, getSortedUsers, getVisibleUsers, isStudent } from "../utils/usersHelper";
import { USER_LIST } from "../constants/users";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>(USER_LIST);
  const [role, setRole] = useState<"student" | "mentor" | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("none");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");


  
  const displayUsers = useMemo(() => {
    const newUsers = users.map((user) => {  
      if (isStudent(user)) {
        return {
          ...user,
          mentors: getMatchingMentors(user, users)
        }
      } else {
        return {
          ...user,
          students: getMatchingStudents(user, users)
        }
      }
    })
    const visibleUsers = getVisibleUsers(newUsers, role);
    return getSortedUsers(visibleUsers, sortKey, sortDirection);
  }, [users, role, sortKey, sortDirection]);


  return {
    displayUsers,
    role,
    setRole,
    sortKey,
    setSortKey,
    sortDirection,
    setSortDirection,
    setUsers,
  };
};
