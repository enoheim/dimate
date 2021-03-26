import HTMLReactParser from 'html-react-parser'

export const isValidEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return regex.test(email)
}

export const isValidRequire = (...args: string[]): boolean => {
  let validator = true
  for (let i = 0; i < args.length; i = (i + 1) | 0) {
    if (args[i] === '') {
      validator = false
    }
  }
  return validator
}

export const returnCodeToBr = (text: string) => {
  if (text === '') {
    return text
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, '<br/> '))
  }
}
