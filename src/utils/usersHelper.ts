import { Mentor, Student, User } from "../type/user";

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
