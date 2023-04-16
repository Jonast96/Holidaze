import * as yup from "yup";
/**
 * Validation schema for user inputs.
 * @type {yup.ObjectSchema}
 *
 * */
export const registerSchema = yup.object().shape({

    email: yup
        .string()
        .required("Email is required")
        .email("Please enter a valid email")
        .min(3, "Email must be at least 3 characters"),

    password: yup
        .string()
        .required("Password is required")
        .min(3, "Password must be over 3 characters"),

});
