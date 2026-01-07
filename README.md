# stringhash

A hash of strings

## StringHash

The only export

### new StringHash({ size })

Creates a new one. The hash is `size` bits wide - between 4 and 31.

### .has (string) => Boolean

Is the string in the hash?

### .store (string) => token

Stores the string and returns a numeric token. The same string will
always return the same token. Storing the same string twice has
no effect.

### .retrieve (token) => string|null

Retreives the string associated with the token. Or `null` if not
recognised

### .clear ()

Empties the hash
