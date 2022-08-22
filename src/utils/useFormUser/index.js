import { useState } from "react";

const useFormUser = (initialValue, dispatch) => {
  const [form, setForm] = useState(initialValue);
  return [
    form,
    (formType, formValue) => {
      if (formType === "reset") {
        return setForm(initialValue);
      }
      setForm({ ...form, [formType]: formValue });
      dispatch({
        type: "SET_USERS_CREATE",
        value: { ...form, [formType]: formValue },
      });
      return;
    },
  ];
};

export default useFormUser;
