import {
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../schema/user";
import { UserFormData } from "../schema/user";
import { User } from "../type/user";

export const UserForm = ({
  setUsers,
  setIsOpen,
}: {
  setUsers: (users: User[]) => void;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: "student",
      hobbies: [""],
    },
  });

  const {
    fields: hobbies,
    append: appendHobbies,
    remove: removeHobbies,
  } = useFieldArray({
    control,
    name: "hobbies",
  });

  const {
    fields: studyLangs,
    append: appendStudyLangs,
    remove: removeStudyLangs,
  } = useFieldArray({
    control,
    name: "studyLangs",
  });

  const {
    fields: useLangs,
    append: appendUseLangs,
    remove: removeUseLangs,
  } = useFieldArray({
    control,
    name: "useLangs",
  });

  const role = useWatch({ control, name: "role" });

  const onSubmit: SubmitHandler<UserFormData> = (data: UserFormData) => {
    setUsers((prevUsers: User[]) => [
      ...prevUsers,
      { ...data, id: prevUsers.length + 1 },
    ]);
    reset();
    setIsOpen(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 p-2 border border-gray-400 rounded-md m-3"
      >
        <div className="flex gap-2">
          <div>
            <input type="radio" value="student" {...register("role")} />
            <label htmlFor="student">学生</label>
            <input type="radio" value="mentor" {...register("role")} />
            <label htmlFor="mentor">メンター</label>
          </div>
          {errors.role && (
            <span className="text-red-500">{errors.role.message}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="name">名前</label>
          <input
            id="name"
            {...register("name")}
            placeholder="名前"
            className="border border-gray-300 rounded-md p-1"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            {...register("email")}
            placeholder="メールアドレス"
            className="border border-gray-300 rounded-md p-1"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="age">年齢</label>
          <input
            id="age"
            {...register("age", { valueAsNumber: true })}
            placeholder="年齢"
            type="number"
            className="border border-gray-300 rounded-md p-1"
          />
          {errors.age && (
            <span className="text-red-500">{errors.age.message}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="postCode">郵便番号</label>
          <input
            id="postCode"
            {...register("postCode")}
            placeholder="郵便番号"
            className="border border-gray-300 rounded-md p-1"
          />
          {errors.postCode && (
            <span className="text-red-500">{errors.postCode.message}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="phone">電話番号</label>
          <input
            id="phone"
            {...register("phone")}
            placeholder="電話番号"
            className="border border-gray-300 rounded-md p-1"
          />
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="hobbies">趣味</label>
          {hobbies.map((field, index) => (
            <div key={field.id} className="flex gap-2 w-30">
              <input
                id={`hobbies.${index}`}
                {...register(`hobbies.${index}`)}
                placeholder={`趣味 ${index + 1}`}
                className="border border-gray-300 rounded-md p-1"
              />
              <button
                type="button"
                onClick={() => removeHobbies(index)}
                className="px-2 py-1 bg-red-500 text-white rounded w-fit"
              >
                削除
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendHobbies("")}
            className="px-2 py-1 bg-blue-500 text-white rounded"
          >
            趣味を追加
          </button>
          {errors.hobbies && (
            <span className="text-red-500">{errors.hobbies.message}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="url">URL</label>
          <input
            id="url"
            {...register("url")}
            placeholder="URL"
            className="border border-gray-300 rounded-md p-1"
          />
          {errors.url && (
            <span className="text-red-500">{errors.url.message}</span>
          )}
        </div>
        {role === "student" && (
          <>
            <div className="flex items-center gap-2">
              <label htmlFor="studyMinutes">学習時間</label>
              <input
                id="studyMinutes"
                {...register("studyMinutes", { valueAsNumber: true })}
                placeholder="学習時間"
                type="number"
                className="border border-gray-300 rounded-md p-1"
              />
              {"studyMinutes" in errors && (
                <span className="text-red-500">
                  {errors.studyMinutes?.message}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="taskCode">タスクコード</label>
              <input
                id="taskCode"
                {...register("taskCode", { valueAsNumber: true })}
                placeholder="タスクコード"
                type="number"
                className="border border-gray-300 rounded-md p-1"
              />
              {"taskCode" in errors && (
                <span className="text-red-500">{errors.taskCode?.message}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="studyLangs">学習言語</label>
              {studyLangs.map((field, index) => (
                <div key={field.id} className="flex gap-2 w-30 flex-shrink-0">
                  <input
                    id={`studyLangs.${index}`}
                    {...register(`studyLangs.${index}`)}
                    placeholder={`学習言語 ${index + 1}`}
                    className="border border-gray-300 rounded-md p-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeStudyLangs(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded flex-shrink-0 w-fit"
                  >
                    削除
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendStudyLangs("")}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                学習言語を追加
              </button>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="score">スコア</label>
              <input
                id="score"
                {...register("score", { valueAsNumber: true })}
                placeholder="スコア"
                type="number"
                className="border border-gray-300 rounded-md p-1"
              />
              {"score" in errors && (
                <span className="text-red-500">{errors.score?.message}</span>
              )}
            </div>
          </>
        )}
        {role === "mentor" && (
          <>
            <div className="flex items-center gap-2">
              <label htmlFor="experienceDays">経験日数</label>
              <input
                id="experienceDays"
                {...register("experienceDays", { valueAsNumber: true })}
                placeholder="経験日数"
                type="number"
                className="border border-gray-300 rounded-md p-1"
              />
              {"experienceDays" in errors && (
                <span className="text-red-500">
                  {errors.experienceDays?.message}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="useLangs">使用言語</label>
              {useLangs.map((field, index) => (
                <div key={field.id} className="flex gap-2 w-30 flex-shrink-0">
                  <input
                    id={`useLangs.${index}`}
                    {...register(`useLangs.${index}`)}
                    placeholder={`使用言語 ${index + 1}`}
                    className="border border-gray-300 rounded-md p-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeUseLangs(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded flex-shrink-0 w-fit"
                  >
                    削除
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendUseLangs("")}
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                使用言語を追加
              </button>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="availableStartCode">開始コード</label>
              <input
                id="availableStartCode"
                {...register("availableStartCode", { valueAsNumber: true })}
                placeholder="開始コード"
                type="number"
                className="border border-gray-300 rounded-md p-1"
              />
              {"availableStartCode" in errors && (
                <span className="text-red-500">
                  {errors.availableStartCode?.message}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="availableEndCode">終了コード</label>
              <input
                id="availableEndCode"
                {...register("availableEndCode", { valueAsNumber: true })}
                placeholder="終了コード"
                type="number"
                className="border border-gray-300 rounded-md p-1"
              />
              {"availableEndCode" in errors && (
                <span className="text-red-500">
                  {errors.availableEndCode?.message}
                </span>
              )}
            </div>
          </>
        )}

        <button
          type="submit"
          className="border border-gray-300 rounded-md p-2 w-fit"
        >
          送信
        </button>
      </form>
    </>
  );
};
