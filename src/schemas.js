import * as Yup from "yup";

// Global Schemas
const Schemas = {
  loginSchema: Yup.object().shape({
    email: Yup.string().email("Uygun olmayan email.").min(6, "En az 6 karakter.").required("Zorunlu"),
    password: Yup.string().min(5, "En az 5 karakter.").max(20, "En fazla 20 karakter").required("Zorunlu"),
  }),
  createProductSchema: Yup.object().shape({
    title: Yup.string('Text olmalı').max(100, "En fazla 100 karakter").required('Zorunlu'),
    description: Yup.string('Text olmalı').max(500, "En fazla 500 karakter").required('Zorunlu'),
    category: Yup.string('Text olmalı').required('Zorunlu'),
    brand: Yup.string('Text olmalı').required('Zorunlu'),
    color: Yup.string('Text olmalı').required('Zorunlu'),
    status: Yup.string('Text olmalı').required('Zorunlu'),
    price: Yup.number('Text olmalı').required('Zorunlu'),
    isOfferable: Yup.boolean().required('Zorunlu'),
    imageUrl: Yup.string().required('Zorunlu'),
  })
};

export default Schemas;
