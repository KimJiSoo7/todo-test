import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
    localStorage.setItem(
      "toDo",
      JSON.stringify([
        { text: toDo, id: Date.now(), category: category },
        ...toDos,
      ])
    );
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", { required: "Please write a to do" })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}
export default CreateToDo;
