export default class StringHash {
  #mask
  #seed
  #strings = new Map() // string -> token
  #tokens = new Map() // token -> string
  constructor ({
    size = 31 // how many bits wide
  } = {}) {
    if (
      // size validation
      typeof size !== 'number' ||
      Math.floor(size) !== size ||
      size < 4 ||
      size > 31
    ) {
      throw new RangeError('size must be an integer between 4 and 31')
    }
    this.#mask = 2 ** size - 1
    this.#seed = this.#calcHash('string.hash.seed', 0)
  }

  store (string) {
    if (typeof string !== 'string') throw new TypeError('Not a string')
    let token = this.#strings.get(string)
    if (token != null) return token
    const base = this.#calcHash(string, this.#seed)
    for (let i = 0; i <= this.#mask; i++) {
      token = (base + i) & this.#mask
      if (!this.#tokens.has(token)) {
        this.#tokens.set(token, string)
        this.#strings.set(string, token)
        return token
      }
    }
    throw new Error('No space')
  }

  retrieve (token) {
    return this.#tokens.get(token) ?? null
  }

  clear () {
    this.#tokens.clear()
    this.#strings.clear()
  }

  #calcHash (string, n) {
    for (let i = 0; i < string.length; i++) {
      const c = string.charCodeAt(i)
      n = ((n << 7) - n + c) & this.#mask
    }
    return n
  }
}
