export function varintDecoder(chunkSize, zigzag) {
  if (chunkSize < 2) throw new RangeError("varintDecoder: chunkSize must be at least 2.");
  const msb = BigInt(chunkSize) - 1n;
  const msbMask = 1n << msb;
  const payloadMask = msbMask - 1n;
  return (chunkSequence) => {
    let value = 0n;
    const it = Iterator.from(chunkSequence);
    for (let shift = 0n, chunk; (chunk = it.next().value) !== undefined; shift += msb) {
      chunk = BigInt(chunk);
      value |= (chunk & payloadMask) << shift;
      if (!(chunk & msbMask)) return zigzag ? (value >> 1n) ^ -(value & 1n) : value;
    }
  };
}
