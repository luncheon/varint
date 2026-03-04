export function varintDecoder(chunkSize: number, zigzag?: boolean): (chunkSequence: Iterator<number | bigint> | Iterable<number | bigint>) => bigint;
