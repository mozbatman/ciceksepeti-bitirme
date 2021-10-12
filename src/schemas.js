import * as Yup from "yup";

// Global Schemas
const Schemas = {
  loginSchema: Yup.object().shape({
    email: Yup.string().email("Invalid email address.").min(6, "Minimum 6 characters").required("Required"),
    password: Yup.string().min(5, "Minimum 5 characters.").max(20, "Maximum 20 characters").required("Required"),
  })
};

export default Schemas;
