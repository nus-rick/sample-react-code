import * as yup from 'yup';
import {
  POSTION_VALUES,
  GENDER_VALUES} from '../../config/constant'

export const buildSchema = (locale, translation) => {
  let t = translation

  let emailRules = locale === 'en' ?
    yup.string().required().email() :
    yup.string()
       .required(t('validation.required'))
       .email(t('validation.wrong_format'))

  let ageRules = locale === 'en' ?
    yup.number().required().integer().min(1) :
    yup.number()
       .required(t('validation.required'))
       .integer(t('validation.must_integer'))
       .min(1, t('validation.greater_than', {num: 0}))

  let genderRules = locale === 'en' ?
    yup.string().required().oneOf(GENDER_VALUES) :
    yup.string()
       .required(t('validation.required'))
       .oneOf(GENDER_VALUES, t('validation.out_of_scope'))

  let postionRules = locale === 'en' ?
    yup.string().required().oneOf(POSTION_VALUES) :
    yup.string()
       .required(t('validation.required'))
       .oneOf(POSTION_VALUES, t('validation.out_of_scope'))

  return yup.object({
    email: emailRules,
    age: ageRules,
    gender: genderRules,
    position: postionRules
  })
}