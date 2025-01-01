import { Mentor, SortDirection, SortKey, Student, User } from "../type/user";

export const isStudent = (user: User): user is Student => user.role === "student";
export const isMentor = (user: User): user is Mentor => user.role === "mentor";

export const getMatchingMentors = ((student: Student, users: User[]): string[] => {
  return users
    .filter((user) => isMentor(user))
    .filter((user) => user.availableStartCode <= student.taskCode && user.availableEndCode >= student.taskCode)
    .map((user) => user.name);
});

export const getMatchingStudents = ((mentor: Mentor, users: User[]): string[] => {
  return users
    .filter((user) => isStudent(user))
    .filter((user) => mentor.availableStartCode <= user.taskCode && mentor.availableEndCode >= user.taskCode)
    .map((user) => user.name);
}); 

export const getVisibleUsers = (users: User[], role: "student" | "mentor" | "all") => {
  return users.filter((user) => {
    if (role === "all") return true;
    if (role === "student") return isStudent(user);
    if (role === "mentor") return isMentor(user);
    return false;
  });
};

export const getSortedUsers = (users: User[], sortKey: SortKey, sortDirection: SortDirection) => {

  return users.sort((a, b) => {
    if (sortKey === "none") return 0;
    if (sortKey === "studyMinutes" && isStudent(a) && isStudent(b)) return sortDirection === "asc" ? a.studyMinutes - b.studyMinutes : b.studyMinutes - a .studyMinutes;
    if (sortKey === "score" && isStudent(a) && isStudent(b)) return sortDirection === "asc" ? a.score - b.score : b.score - a.score;
    if (sortKey === "experienceDays" && isMentor(a) && isMentor(b)) return sortDirection === "asc" ? a.experienceDays - b.experienceDays : b.experienceDays - a.experienceDays;
    return 0;
  });
};
