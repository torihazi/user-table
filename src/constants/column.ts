import { Column } from "../type/column";
import { User } from "../type/user";
import { isMentor, isStudent } from "../utils/usersHelper";

export const COLUMN_LIST: Column[] = [
  { key: "name", label: "名前", render: (user: User) => user.name },
  { key: "role", label: "役割", render: (user: User) => user.role },
  { key: "email", label: "メールアドレス", render: (user: User) => user.email },
  { key: "age", label: "年齢", render: (user: User) => user.age },
  { key: "phone", label: "電話番号", render: (user: User) => user.phone },
  { key: "postCode", label: "郵便局番号", render: (user: User) => user.postCode },
  { key: "hobbies", label: "趣味", render: (user: User) => user.hobbies.join(", ") },
  { key: "url", label: "URL", render: (user: User) => user.url },
  { key: "studyMinutes", label: "学習時間", render: (user: User) => isStudent(user) ? user.studyMinutes : "-"  },
  { key: "taskCode", label: "タスクコード", render: (user: User) => isStudent(user) ? user.taskCode : "-"  },
  { key: "studyLangs", label: "学習言語", render: (user: User) => isStudent(user) ? user.studyLangs.join(", ") : "-"  },
  { key: "score", label: "スコア", render: (user: User) => isStudent(user) ? user.score : "-"  },
  { key: "mentors", label: "メンター", render: (user: User) => isStudent(user) ? user.mentors?.join(", ") : "-"  },
  { key: "students", label: "学生", render: (user: User) => isMentor(user) ? user.students?.join(", ") : "-"  },
  { key: "experienceDays", label: "経験日数", render: (user: User) => isMentor(user) ? user.experienceDays : "-"  },
  { key: "useLangs", label: "使用言語", render: (user: User) => isMentor(user) ? user.useLangs.join(", ") : "-"  },
  { key: "availableStartCode", label: "開始コード", render: (user: User) => isMentor(user) ? user.availableStartCode : "-"  },
  { key: "availableEndCode", label: "終了コード", render: (user: User) => isMentor(user) ? user.availableEndCode : "-"  },
]
