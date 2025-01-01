export type UserRole = "student" | "mentor";

export interface BaseUserInfo {
  id: number;
  role: UserRole;
  name: string;
  email: string;
  age: number;
  phone: string;
  postCode: string;
  hobbies: string[];
  url: string;
}

export interface Student extends BaseUserInfo {
  role: "student";
  studyMinutes: number;
  taskCode: number;
  studyLangs: string[];
  score: number;
  mentors?: string[];
}

export interface Mentor extends BaseUserInfo {
  role: "mentor";
  experienceDays: number;
  useLangs: string[];
  availableStartCode: number;
  availableEndCode: number;
  students?: string[];
}

export type SortKey = "none" | "studyMinutes" | "score" | "experienceDays";
export type SortDirection = "asc" | "desc";

export type User = Student | Mentor;