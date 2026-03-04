export function varintDecoder(chunkSize: number, zigzag?: boolean): (chunkSequence: Iterator<bigint> | Iterable<bigint>) => bigint;
