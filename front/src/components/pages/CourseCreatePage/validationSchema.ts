import * as Yup from "yup"

export const validationSchema = Yup.object({
    name: Yup.string()
    .max(45, "Максимальное число символов - 45")
    .min(3, "Минимальное число символов - 3")
    .required("Поле обязательно для заполнения!"),
    password: Yup.string()
    .max(15, "Максимальное число символов - 15")
    .min(3, "Минимальное число символов - 3")
    .required("Поле обязательно для заполнения!"),
    beginDate: Yup.date().required("Поле обязательно для заполнения!").nullable(),
    endDate: Yup.date().required("Поле обязательно для заполнения!").nullable(),
    tasks:Yup.array().of(Yup.object({text:Yup.string().max(145, "Максимальное число символов - 145")
    .min(3, "Минимальное число символов - 3").required("Поле обязательно для заполнения!")}))
  })