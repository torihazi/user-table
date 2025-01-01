// src/types/schema.ts
import { z } from "zod";

const baseSchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  role: z.enum(["student", "mentor"], {
    required_error: "役割の選択は必須です",
  }),
  email: z.string().email("正しいメールアドレス形式で入力してください"),
  age: z.number().min(18, "18歳以上である必要があります"),
  phone: z.string().regex(/^\d{10}$/, "電話番号は10桁の数字で入力してください"),
  postCode: z.string().regex(/^\d{3}-\d{4}$/, "正しい郵便番号形式で入力してください"),
  hobbies: z.array(z.string()),
  url: z.string().url("正しいURL形式で入力してください"),
});

const studentSchema = baseSchema.extend({
  role: z.literal("student"),
  studyMinutes: z.number().min(0, "学習時間は0以上である必要があります"),
  taskCode: z.number().min(100, "タスクコードは100以上である必要があります").max(999, "タスクコードは999以下である必要があります"),
  studyLangs: z.array(z.string()).min(1, "学習言語を1つ以上選択してください"),
  score: z.number().min(0, "スコアは0以上である必要があります").max(100, "スコアは100以下である必要があります"),
});

const mentorSchema = baseSchema.extend({
  role: z.literal("mentor"),
  experienceDays: z.number().min(0, "経験日数は0以上である必要があります"),
  useLangs: z.array(z.string()).min(1, "使用言語を1つ以上選択してください"),
  availableStartCode: z.number().min(100, "開始コードは100以上である必要があります").max(999, "開始コードは999以下である必要があります"),
  availableEndCode: z.number().min(100, "終了コードは100以上である必要があります").max(999, "終了コードは999以下である必要があります"),
});

export const userSchema = z.discriminatedUnion("role", [
  studentSchema,
  mentorSchema,
]).refine((data) => {
  if (data.role === "mentor") {
    return data.availableStartCode < data.availableEndCode;
  }
  return true;
}, {
  message: "開始コードは終了コードより小さい必要があります",
  path: ["availableEndCode"],
});

export type UserFormData = z.infer<typeof userSchema>;
