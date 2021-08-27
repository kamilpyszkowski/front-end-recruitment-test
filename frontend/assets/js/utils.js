//declaring regular expressions to test inputs values
export const validationRegExps = {
  onlyLetters: new RegExp(/^[a-zA-Z]*$/),
  onlyNumbers: new RegExp(/^[0-9]*$/),
  isEmail: new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
  isExpDate: new RegExp(/^\d{2}\/\d{2}$/),
}

//declaring error messages to be passed if fields are invalid
export const errorMessages = {
  notEmpty: 'This field cannot be empty',
  regExp: {
    onlyLetters: 'This field should contain letters only',
    onlyNumbers: 'This field should contain numbers only',
    isEmail: 'Your email is invalid',
    isExpDate: 'This field should match MM/YY pattern',
  },
  maxLength: (givenLength) => `This field should contain ${givenLength} characters`,
}

//function to prepare tooltip for new error messages
export const initializeTooltip = (fieldContainer, tooltip) => {
  const { x, y, width, height } = fieldContainer.getBoundingClientRect()

  tooltip.innerHTML = null

  tooltip.style.setProperty('left', `${x + width}px`)
  tooltip.style.setProperty('top', `${y + height}px`)
}

export const messageWrapper = (message) => {
  const container = document.createElement('li')
  container.classList.add('errorTooltip__item')
  container.innerText = message

  return container
}

export const checkIfValid = (inputs) => {
  return [...inputs].some((input) => {
    const fieldClassList = input.parentNode.classList

    return !fieldClassList.contains('input--valid')
  })
}
