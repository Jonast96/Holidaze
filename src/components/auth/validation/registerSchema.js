import * as yup from "yup";

const nameRegex = /^[\w]+$/;
const emailRegex = /^[\w\-.]+@(stud\.)?noroff\.no$/;

export const registerSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is required")
        .matches(nameRegex, "Name must only contain alphanumeric characters and underscores")
        .max(20, "Name must be at most 20 characters"),

    email: yup
        .string()
        .required("Email is required")
        .matches(emailRegex, "Please enter a valid Noroff email"),

    avatar: yup
        .string()

        .url("Must be a valid URL"),

    venueManager: yup.boolean(),

    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
});
