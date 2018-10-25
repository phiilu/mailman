import * as yup from "yup";

const accountSchema = (update = false) =>
  yup.object().shape({
    username: yup.string().required("The username is required"),
    domain: yup.string().required("The domain is required"),
    password: update
      ? yup.string().min(8, "Passwords should be at least 8 characters long.")
      : yup
          .string()
          .min(8, "Passwords should be at least 8 characters long.")
          .required("Password is required"),
    quota: yup
      .number()
      .positive("Quota must be a positive number")
      .required("Quota is required"),
    enabled: yup.boolean().required("Enabled is required"),
    sendonly: yup.boolean().required("Enabled is required")
  });

export { accountSchema };
