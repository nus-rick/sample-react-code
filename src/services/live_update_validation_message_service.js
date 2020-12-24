// NOTE: call this service in componentDidUpdate and it will trigger form validation if needed to force re-rendering invalid messages whenever language changed.
export class LiveUpdateValidationMessageService {
  constructor(component){
    this.component = component
  }

  call(prevProps, prevState){
    let self = this.component

    let form = self.form.current
    let formikBag = form.getFormikBag()

    let langChanged = prevProps.i18nState.lang !== self.props.i18nState.lang
    let triggeredValidation = formikBag.dirty || formikBag.submitCount > 0

    langChanged && triggeredValidation && form.validateForm()
  }
}