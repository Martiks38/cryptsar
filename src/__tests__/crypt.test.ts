import { describe, expect, it } from 'vitest'
import { decrypt, decryptSpanish, encrypt, encryptSpanish } from '../utils/crypt'

type Test = [string, number, string]

const testOne: Test = ['Hola mundo', 3, 'Krñd oxpgr']
const testTwo: Test = ['Exhprv gldv', 3, 'Buenos dias']
const testThree: Test = ['Hello world!!!', 7, 'Olssv dvysk!!!']
const testFour: Test = ['Xsmo dy wood iye.', 10, 'Nice to meet you.']

describe('Encrypt', () => {
  describe('Spanish', () => {
    it('Entering "Hola mundo" with an offset of 3 expects the text to be "Krñd oxpgr"', () => {
      const [message, displacement, result] = testOne

      const encryptedText = encryptSpanish({ message, displacement })

      expect(encryptedText).toEqual(result)
    })

    it('Entering "Exhprv gldv" with an offset of 3 expects the text to be "Buenos dias"', () => {
      const [message, displacement, result] = testTwo

      const encryptedText = decryptSpanish({ message, displacement })

      expect(encryptedText).toEqual(result)
    })
  })

  describe('English', () => {
    it('Entering "Hello world!!!" with an offset of 7 expects the text to be "Olssv dvysk!!!"', () => {
      const [message, displacement, result] = testThree

      const encryptedText = encrypt({ message, displacement })

      expect(encryptedText).toEqual(result)
    })

    it('Entering "Xsmo dy wood iye." with an offset of 10 expects the text to be "Nice to meet you."', () => {
      const [message, displacement, result] = testFour

      const encryptedText = decrypt({ message, displacement })

      expect(encryptedText).toEqual(result)
    })
  })
})
