export function varintEncoder(chunkSize: number, zigzag?: boolean): (value: number | bigint) => Generator<bigint>;
