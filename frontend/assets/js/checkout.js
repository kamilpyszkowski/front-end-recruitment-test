//CSS import
import '../css/app.css'
import '../css/checkout.scss'
import {
  validationRegExps,
  errorMessages,
  initializeTooltip,
  messageWrapper,
  checkIfValid,
} from './utils.js'

import axios from 'axios'

//selecting DOM elements
const elements = {
  inputs: document.querySelectorAll('.input__box'),
  tooltip: document.querySelector('.errorTooltip'),
  submitButton: document.querySelector('#submitButton'),
  mainContainer: document.querySelector('.container'),
}

//declaring function to render tooltip
const renderTooltip = (fieldContainer, errorMessages) => {
  const fieldClassList = fieldContainer.classList
  const { tooltip } = elements

  if (errorMessages.length === 0) {
    fieldClassList.toggle('input--valid', true)
    fieldClassList.toggle('input--invalid', false)
    return
  }

  initializeTooltip(fieldContainer, tooltip)

  for (const message of errorMessages) {
    const wrappedMessage = messageWrapper(message)
    tooltip.appendChild(wrappedMessage)
  }

  tooltip.classList.add('errorTooltip--visible')

  tooltip.addEventListener('animationend', () => {
    tooltip.classList.remove('errorTooltip--visible')
  })

  fieldClassList.add('input--invalid')
  fieldClassList.toggle('input--invalid', true)
  fieldClassList.toggle('input--valid', false)
}

//declaring validators to validate fields
const validators = {
  notEmpty: (value) => {
    const message = errorMessages.notEmpty

    if (value.length === 0) {
      return message
    }
  },
  regExpWrapper: (value, regExpType) => {
    const regExp = validationRegExps[regExpType]
    const message = errorMessages.regExp[regExpType]

    if (regExp.test(value) === false) {
      return message
    }
  },
  maxLength: (value, expectedLength) => {
    const message = errorMessages.maxLength(expectedLength)

    if (value.length !== expectedLength) {
      return message
    }
  },
}

//declaring function to handle validation and return error messages
const validateField = (e) => {
  const { id, value } = e.target

  const { notEmpty, regExpWrapper, maxLength } = validators

  switch (id) {
    case 'firstName':
    case 'lastName':
      return [notEmpty(value), regExpWrapper(value, 'onlyLetters')]
    case 'email':
      return [notEmpty(value), regExpWrapper(value, 'isEmail')]
    case 'country':
      return [notEmpty(value)]
    case 'postalCode':
      return [notEmpty(value), maxLength(value, 5), regExpWrapper(value, 'onlyNumbers')]
    case 'phone':
      return [notEmpty(value), maxLength(value, 9), regExpWrapper(value, 'onlyNumbers')]
    case 'creditCard':
      return [notEmpty(value), maxLength(value, 16), regExpWrapper(value, 'onlyNumbers')]
    case 'CVV':
      return [notEmpty(value), maxLength(value, 3), regExpWrapper(value, 'onlyNumbers')]
    case 'expDate':
      return [regExpWrapper(value, 'isExpDate'), notEmpty(value), maxLength(value, 5)]
  }
}

;[...elements.inputs].some((input) => {
  input.addEventListener('blur', (e) => {
    const inputContainer = input.parentNode

    const errorMessages = validateField(e).filter(Boolean)

    renderTooltip(inputContainer, errorMessages)

    elements.submitButton.toggleAttribute('disabled', checkIfValid(elements.inputs))
  })
})

const handleSubmit = (e) => {
  e.preventDefault()

  const data = Array.from(elements.inputs).reduce((acc, { name, value }) => {
    return {
      ...acc,
      [name]: value,
    }
  }, 0)

  const responseContainer = document.createElement('div')
  responseContainer.classList.add('responseMessage')

  return axios.post('/order', data).then(({ data: { message } }) => {
    responseContainer.innerText = message
    elements.mainContainer.appendChild(responseContainer)
  })
}

elements.submitButton.addEventListener('click', handleSubmit)
