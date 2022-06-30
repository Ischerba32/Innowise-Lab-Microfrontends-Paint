import { get, ref } from "firebase/database";

import { OptionParams } from "../components/UI/CustomSelect/props";
import { database } from "../config/firebase";

export const getUsersOptions = (): OptionParams[] => {
  const result: OptionParams[] = [{ value: "all", label: "all" }];
  get(ref(database, `users`)).then((snapshot) => {
    if (snapshot.val()) {
      const data: { email: string; uid: string }[] = Object.values(
        snapshot.val()
      );
      for (let i = 0; i < data.length; i++) {
        result.push({
          value: data[i].uid,
          label: data[i].email,
        });
      }
    }
  });
  return result;
};

export const getToolsSelectOptions = (tools: object) => {
  const result: OptionParams[] = [];
  Object.keys(tools).forEach((tool) => {
    result.push({ value: tool, label: tool });
  });
  return result;
};
