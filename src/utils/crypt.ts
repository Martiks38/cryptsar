type CryptProps = {
  message: string
  displacement: number
}

const alphabetSpanish = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'Ñ',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
]

export const encrypt = ({ message, displacement }: CryptProps) => {
  return message.replace(/[a-z]/gi, (letter) => {
    const charCode = letter.charCodeAt(0)
    const lowerChar = letter.toLowerCase().charCodeAt(0)
    const codeZ = 'z'.charCodeAt(0)

    // Si el código de la letra más el desplazamiento es mayor al código al de la última del abecedario.
    // Entonces, hay que restar el tamaño del alfabeto.
    //  De lo contrario, solo sumar el desplazamiento
    const isOverFlow = lowerChar + displacement > codeZ

    return String.fromCharCode(charCode + displacement + (isOverFlow ? -26 : 0))
  })
}

export const decrypt = ({ message, displacement }: CryptProps) => {
  return message.replace(/[a-z]/gi, (letter) => {
    const charCode = letter.charCodeAt(0)
    const lowerChar = letter.toLowerCase().charCodeAt(0)
    const codeA = 'a'.charCodeAt(0)

    // Si el código de la letra menos el desplazamiento es menor al código de la última
    // Entonces, hay que restar el tamaño del alfabeto
    //  De lo contrario, solo sumar el desplazamiento
    const isOverFlow = lowerChar - displacement < codeA

    return String.fromCharCode(charCode - displacement + (isOverFlow ? 26 : 0))
  })
}

const removeAccents = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export const encryptSpanish = ({ message, displacement }: CryptProps) => {
  const normalizeMessage = removeAccents(message)

  return normalizeMessage.replace(/[a-zñ]/gi, (letter) => {
    const letterInd = alphabetSpanish.findIndex((l) => l === letter.toUpperCase())

    const sizeAlphabet = alphabetSpanish.length
    const codeZ = 'Z'.charCodeAt(0)

    // Si el código de la letra más el desplazamiento es mayor al código de la última del abecedario.
    // Entonces, hay que restar el tamaño del alfabeto.
    //  De lo contrario, solo sumar el desplazamiento
    const isOverFlow = letterInd + displacement >= sizeAlphabet
    const indNewLetter = displacement + letterInd + (isOverFlow ? -sizeAlphabet : 0)

    const encriptedLetter = alphabetSpanish[indNewLetter]
    const isMayus = letter.charCodeAt(0) < codeZ

    return isMayus ? encriptedLetter : encriptedLetter.toLowerCase()
  })
}

export const decryptSpanish = ({ message, displacement }: CryptProps) => {
  const normalizeMessage = removeAccents(message)

  return normalizeMessage.replace(/[a-zñ]/gi, (letter) => {
    const letterInd = alphabetSpanish.findIndex((l) => l === letter.toUpperCase())

    const sizeAlphabet = alphabetSpanish.length
    const codeZ = 'Z'.charCodeAt(0)

    // Si el código de la letra menos el desplazamiento es menor al código de la última
    // Entonces, hay que restar el tamaño del alfabeto
    //  De lo contrario, solo sumar el desplazamiento
    const isOverFlow = letterInd - displacement < 0
    const indNewLetter = letterInd - displacement + (isOverFlow ? sizeAlphabet : 0)

    const encriptedLetter = alphabetSpanish[indNewLetter]
    const isMayus = letter.charCodeAt(0) < codeZ

    return isMayus ? encriptedLetter : encriptedLetter.toLowerCase()
  })
}
