import * as yup from "yup";
/**
 * Validation schema for user inputs.
 * @type {yup.ObjectSchema}
 *
 * */
const emailRegex = /^[\w\-.]+@(stud\.)?noroff\.no$/;
export const loginSchema = yup.object().shape({

    email: yup
        .string()
        .required("Email is required")
        .matches(emailRegex, "Please enter a valid Noroff email"),

    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),

});
