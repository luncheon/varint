# @luncheon/varint

A varint (variable-length integer) encoder / decoder.

- `BigInt` Native
- Configurable Chunk Size
- Optional Zigzag Encoding
- Lightweight, Zero Dependencies

```ts
import assert from "node:assert/strict";
import { varintEncoder, varintDecoder } from "@luncheon/varint";

const chunkSize = 3;
const zigzag = true;

const encode = varintEncoder(chunkSize, zigzag);
const decode = varintDecoder(chunkSize, zigzag);

encode(0); // => Generator<bigint>

assert.deepEqual(encode( 0).toArray(), [0b000n]);
assert.deepEqual(encode(-1).toArray(), [0b001n]);
assert.deepEqual(encode( 1).toArray(), [0b010n]);
assert.deepEqual(encode(-2).toArray(), [0b011n]);
assert.deepEqual(encode( 2).toArray(), [0b100n, 0b001n]);
assert.deepEqual(encode(-3).toArray(), [0b101n, 0b001n]);
assert.deepEqual(encode( 3).toArray(), [0b110n, 0b001n]);
assert.deepEqual(encode(-4).toArray(), [0b111n, 0b001n]);
assert.deepEqual(encode( 4).toArray(), [0b100n, 0b010n]);
assert.deepEqual(encode(-5).toArray(), [0b101n, 0b010n]);
assert.deepEqual(encode( 5).toArray(), [0b110n, 0b010n]);
assert.deepEqual(encode(-6).toArray(), [0b111n, 0b010n]);
assert.deepEqual(encode( 6).toArray(), [0b100n, 0b011n]);
assert.deepEqual(encode(-7).toArray(), [0b101n, 0b011n]);
assert.deepEqual(encode( 7).toArray(), [0b110n, 0b011n]);
assert.deepEqual(encode(-8).toArray(), [0b111n, 0b011n]);
assert.deepEqual(encode( 8).toArray(), [0b100n, 0b100n, 0b001n]);

for (let n = -1_000_000n; n < 1_000_000n; n++) {
  assert.equal(decode(encode(n)), n);
}
```

## License

[WTFPL](http://www.wtfpl.net)

## See also

- [@luncheon/**golomb-code**](https://www.npmjs.com/package/@luncheon/golomb-code): A [Golomb coding](https://en.wikipedia.org/wiki/Golomb_coding) implementation.
- [@luncheon/**exponential-golomb-code**](https://www.npmjs.com/package/@luncheon/exponential-golomb-code): An [exponential-Golomb coding](https://en.wikipedia.org/wiki/Exponential-Golomb_coding) implementation.
- [@luncheon/**fibonacci-code**](https://www.npmjs.com/package/@luncheon/fibonacci-code): A [Fibonacci coding](https://en.wikipedia.org/wiki/Fibonacci_coding) implementation.
