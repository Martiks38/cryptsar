type Translations = {
  intro: string
  displacement: string
  errorMessage: string
  exchange: [string, string]
  labelActionButton: [string, string]
  language: {
    labelLangButton: string
    flagAlt: string
  }
  message: string
}

export const texts: { [lang: string]: Translations } = {
  en: {
    displacement: 'Displacement:',
    errorMessage: 'Error copying the message',
    exchange: ['Original', 'Encrypted'],
    intro:
      'It is a type of substitution cipher in which a letter in the source text is replaced by another letter found at a fixed number of positions later in the alphabet.',
    labelActionButton: ['Change action to decrypt message', 'Change action to encrypt message'],
    language: {
      labelLangButton: 'Change language to Spanish',
      flagAlt: 'Language of the page in English'
    },
    message: 'Copied message'
  },
  es: {
    displacement: 'Desplazamiento:',
    errorMessage: 'Error al copiar el mensaje',
    exchange: ['Original', 'Encriptado'],
    intro:
      'Es un tipo de cifrado de sustitución en el que una letra del texto de origen se reemplaza por otra letra que se encuentra en un número fijo de posiciones más adelante en el alfabeto.',
    labelActionButton: [
      'Cambiar acción a desencriptar mensaje',
      'Cambiar acción a encriptar mensaje'
    ],
    language: {
      labelLangButton: 'Cambiar idioma a inglés',
      flagAlt: 'Idioma de la página en español'
    },
    message: 'Mensaje copiado'
  }
}
