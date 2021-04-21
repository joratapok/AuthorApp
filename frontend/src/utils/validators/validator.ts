export type FieldValidatorType = (value: string)  => string | undefined

export const required: FieldValidatorType = (value) => {
    if (value) return undefined
    return `Обязательное поле`
}

export const maxLengthCreator = (length: number): FieldValidatorType => {
    return (value) => {
        if (value) {
          return (value.length > length) ? `max length ${length} symbols`: undefined
        }
    }
}

export const loginRequired: FieldValidatorType = (value) => {
    if (!value) return `тут нужен логин  ༼ つ ◕_◕ ༽つ`
    return undefined
}

export const moreThan30: FieldValidatorType = (value) => {
  if (value.length > 30) return `max length 30 symbols`
  return undefined
}
