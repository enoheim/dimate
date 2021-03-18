import HTMLReactParser from 'html-react-parser'

export const returnCodeToBr = (text: string) => {
  if (text === '') {
    return text
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, '<br/> '))
  }
}
