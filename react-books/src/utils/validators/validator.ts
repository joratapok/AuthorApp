export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
    if (value) return undefined
    return 'Обязательное поле'
}

export const maxLengthCreator = (length: number): FieldValidatorType => {
    return (value) => {
        if (value) {
            return (value.length > length) ? `max length ${length} symbols` : undefined
        }
    }
}

export const loginRequired: FieldValidatorType = (value) => {
    if (!value) return 'тут нужен логин  ༼ つ ◕_◕ ༽つ'
    return undefined
}

export const moreThan2000: FieldValidatorType = (value) => {
    if (value && value.length > 2000) return 'один комментарий ограничен 2000 симоволов ༼ つ ◕_◕ ༽つ'
    return undefined
}
