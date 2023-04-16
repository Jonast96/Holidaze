import * as yup from "yup";
/**
 * Validation schema for user inputs.
 * @type {yup.ObjectSchema}
 *
 * */
export const registerSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters"),

    email: yup
        .string()
        .required("Email is required")
        .email("Please enter a valid email")
        .min(3, "Email must be at least 3 characters"),
    picture: yup
        .string()
        .required("Please enter a image URL")
        .min(3, "Must be a valid image URL"),
    password: yup
        .string()
        .required("Password is required")
        .min(3, "Password must be over 3 characters"),

});
