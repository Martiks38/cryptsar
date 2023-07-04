type Translations = {
  intro: string
  displacement: string
  exchange: [string, string]
  labelButton: [string, string]
}

export const texts: { [lang: string]: Translations } = {
  en: {
    intro:
      'It is a type of substitution cipher in which a letter in the source text is replaced by another letter found at a fixed number of positions later in the alphabet.',
    displacement: 'Displacement:',
    exchange: ['Original', 'Encrypted'],
    labelButton: ['Change action to decrypt message', 'Change action to encrypt message']
  },
  es: {
    intro:
      'Es un tipo de cifrado de sustitución en el que una letra del texto de origen se reemplaza por otra letra que se encuentra en un número fijo de posiciones más adelante en el alfabeto.',
    displacement: 'Desplazamiento:',
    exchange: ['Original', 'Encriptado'],
    labelButton: ['Cambiar acción a desencriptar mensaje', 'Cambiar acción a encriptar mensaje']
  }
}
