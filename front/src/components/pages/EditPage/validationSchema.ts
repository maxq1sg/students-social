import * as Yup from "yup"

export const userDataValidation = Yup.object({
    fullName: Yup.string()
      .max(40, "ФИО не должно превышать 40 символов!")
      .required("Поле обязательно!"),
    name: Yup.string()
    .max(40, "Имя не должно превышать 40 символов!")
    .trim()
    .matches(/eco\.\w+/i , 'Имя должно начинаться с "eco."')
    .required("Поле обязательно!"),
    password:Yup.string()
    .max(25, "введенные данные не могут являеться паролем!")
    .required("Поле обязательно!"),
})

export const passwordValidation = Yup.object({
    oldPassword: Yup.string()
    .max(25, "Введенные данные не могут являеться паролем!")
    .required("Поле обязательно!"),
    newPassword: Yup.string().required('Поле обязательно!'),
    newPasswordConfirm: Yup.string()
     .oneOf([Yup.ref('newPassword')], 'Пароли должны совпадать!')
})
