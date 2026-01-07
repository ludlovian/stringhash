# stringhash

A hash of strings

## StringHash

The only export

### new StringHash({ size })

Creates a new one. The hash is `size` bits wide - between 4 and 31.

### .store (string) => token

Stores the string and returns a numeric token

### .retrieve (token) => string|null

Retreives the string associated with the token. Or `null` if not
recognised
