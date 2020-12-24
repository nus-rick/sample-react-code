import * as yup from 'yup';

export const buildSchema = (locale, translation) => {
  let t = translation

  let emailRules = locale === 'en' ?
    yup.string().required().email() :
    yup.string()
       .required(t('validation.required'))
       .email(t('validation.wrong_format'))

  let passwordRules = locale === 'en' ?
    yup.string().required():
    yup.string()
       .required(t('validation.required'))

  return yup.object({
    email: emailRules,
    password: passwordRules,
  })
}
