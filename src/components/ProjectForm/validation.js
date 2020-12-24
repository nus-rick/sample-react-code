import * as yup from 'yup';

export const buildSchema = (locale, translation) => {
  let t = translation

  let nameRules = locale === 'en' ?
    yup.string().required() : // get default message of yup
    yup.string()
       .required(t('validation.required'))

  return yup.object({
    name: nameRules
  })
}