import * as yup from "yup";

export const editUserSchema = yup.object().shape({
  avatar: yup
    .string()

    .url("Must be a valid URL"),
});
