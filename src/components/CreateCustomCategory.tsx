import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { customCategory } from "../atoms";

interface IForm {
  customCategory: string;
}

function CreateCustomCategory() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [categories, setCategories] = useRecoilState(customCategory);
  const onValid = ({ customCategory }: IForm) => {
    setCategories((oldCategory) => [customCategory, ...oldCategory]);
    setValue("customCategory", "");
    localStorage.setItem(
      "category",
      JSON.stringify([customCategory, ...categories])
    );
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <label htmlFor="customCategory">Category Name</label>
      <input
        style={{ marginLeft: "15px" }}
        {...register("customCategory", {})}
        placeholder="Write any category"
      />
      <button>Add</button>
    </form>
  );
}
export default CreateCustomCategory;
