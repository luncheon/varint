export function varintEncoder(chunkSize, zigzag) {
  if (chunkSize < 2) throw new RangeError("varintEncoder: chunkSize must be at least 2.");
  const msb = BigInt(chunkSize) - 1n;
  const msbMask = 1n << msb;
  const payloadMask = msbMask - 1n;
  return function* (value) {
    value = BigInt(value);
    if (zigzag) value = (value << 1n) ^ (value < 0n ? -1n : 0n);
    for (; value >= msbMask; value >>= msb) yield (value & payloadMask) | msbMask;
    yield value;
  };
}
