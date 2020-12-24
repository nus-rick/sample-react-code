import {
  LANG_VALUES,
  GENDER_VALUES,
  POSTION_VALUES} from '../config/constant'

export default class OptionsService {

  constructor(translation){
    this.t = translation
  }

  userPositionOptions(){
    let t = this.t
    return POSTION_VALUES.map(val => ({
      value: val, name: t(`position.${val}`)
    }))
  }

  genderOptions(){
    let t = this.t
    return GENDER_VALUES.map(val => ({
      value: val, name: t(`gender.${val}`)
    }))
  }

  langOptions(){
    let t = this.t
    return LANG_VALUES.map(val => ({
      value: val, name: t(`lang.${val}`)
    }))
  }

}
