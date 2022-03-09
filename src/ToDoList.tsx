import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  categoryState,
  customCategory,
  toDoSelector,
  toDoState,
} from "./atoms";
import CreateCustomCategory from "./components/CreateCustomCategory";
import CreateToDo from "./components/CreateToDo";
import ToDo from "./components/ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const setToDos = useSetRecoilState(toDoState);
  const [category, setCategory] = useRecoilState(categoryState);
  const [customCategories, setCustomCategories] =
    useRecoilState(customCategory);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  useEffect(() => {
    const categoryStorage = localStorage.getItem("category");
    const toDoStorage = localStorage.getItem("toDo");
    if (categoryStorage !== null) {
      setCustomCategories(JSON.parse(categoryStorage));
    }
    if (toDoStorage !== null) {
      setToDos(JSON.parse(toDoStorage));
    }
  }, []);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateCustomCategory />
      <hr />
      <select value={category} onInput={onInput}>
        {customCategories?.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <CreateToDo />
      {toDos?.map((item) => (
        <ToDo key={item.id} {...item} />
      ))}
    </div>
  );
}

export default ToDoList;
