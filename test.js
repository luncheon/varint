import { it } from "node:test";
import assert from "node:assert/strict";
import { varintEncoder, varintDecoder } from "./index.js";

it("README", () => {
  const chunkSize = 3;
  const zigzag = true;

  const encode = varintEncoder(chunkSize, zigzag);
  const decode = varintDecoder(chunkSize, zigzag);

  assert.deepEqual(encode(0).toArray(), [0b000n]);
  assert.deepEqual(encode(-1).toArray(), [0b001n]);
  assert.deepEqual(encode(1).toArray(), [0b010n]);
  assert.deepEqual(encode(-2).toArray(), [0b011n]);
  assert.deepEqual(encode(2).toArray(), [0b100n, 0b001n]);
  assert.deepEqual(encode(-3).toArray(), [0b101n, 0b001n]);
  assert.deepEqual(encode(3).toArray(), [0b110n, 0b001n]);
  assert.deepEqual(encode(-4).toArray(), [0b111n, 0b001n]);
  assert.deepEqual(encode(4).toArray(), [0b100n, 0b010n]);
  assert.deepEqual(encode(-5).toArray(), [0b101n, 0b010n]);
  assert.deepEqual(encode(5).toArray(), [0b110n, 0b010n]);
  assert.deepEqual(encode(-6).toArray(), [0b111n, 0b010n]);
  assert.deepEqual(encode(6).toArray(), [0b100n, 0b011n]);
  assert.deepEqual(encode(-7).toArray(), [0b101n, 0b011n]);
  assert.deepEqual(encode(7).toArray(), [0b110n, 0b011n]);
  assert.deepEqual(encode(-8).toArray(), [0b111n, 0b011n]);
  assert.deepEqual(encode(8).toArray(), [0b100n, 0b100n, 0b001n]);

  for (let n = -1_000_000n; n < 1_000_000n; n++) {
    assert.equal(decode(encode(n)), n);
  }
});

it("varintEncoder(3)", () => {
  const encode = varintEncoder(3);
  assert.deepEqual(encode(0).toArray(), [0b000n]);
  assert.deepEqual(encode(1).toArray(), [0b001n]);
  assert.deepEqual(encode(2).toArray(), [0b010n]);
  assert.deepEqual(encode(3).toArray(), [0b011n]);
  assert.deepEqual(encode(4).toArray(), [0b100n, 0b001n]);
  assert.deepEqual(encode(5).toArray(), [0b101n, 0b001n]);
  assert.deepEqual(encode(6).toArray(), [0b110n, 0b001n]);
  assert.deepEqual(encode(7).toArray(), [0b111n, 0b001n]);
  assert.deepEqual(encode(8).toArray(), [0b100n, 0b010n]);
  assert.deepEqual(encode(9).toArray(), [0b101n, 0b010n]);
  assert.deepEqual(encode(10).toArray(), [0b110n, 0b010n]);
  assert.deepEqual(encode(11).toArray(), [0b111n, 0b010n]);
  assert.deepEqual(encode(12).toArray(), [0b100n, 0b011n]);
  assert.deepEqual(encode(13).toArray(), [0b101n, 0b011n]);
  assert.deepEqual(encode(14).toArray(), [0b110n, 0b011n]);
  assert.deepEqual(encode(15).toArray(), [0b111n, 0b011n]);
  assert.deepEqual(encode(16).toArray(), [0b100n, 0b100n, 0b001n]);
});

it("varintEncoder(4)", () => {
  const encode = varintEncoder(4);
  assert.deepEqual(encode(0).toArray(), [0b0000n]);
  assert.deepEqual(encode(1).toArray(), [0b0001n]);
  assert.deepEqual(encode(2).toArray(), [0b0010n]);
  assert.deepEqual(encode(3).toArray(), [0b0011n]);
  assert.deepEqual(encode(4).toArray(), [0b0100n]);
  assert.deepEqual(encode(5).toArray(), [0b0101n]);
  assert.deepEqual(encode(6).toArray(), [0b0110n]);
  assert.deepEqual(encode(7).toArray(), [0b0111n]);
  assert.deepEqual(encode(8).toArray(), [0b1000n, 0b0001n]);
  assert.deepEqual(encode(9).toArray(), [0b1001n, 0b0001n]);
  assert.deepEqual(encode(10).toArray(), [0b1010n, 0b0001n]);
  assert.deepEqual(encode(11).toArray(), [0b1011n, 0b0001n]);
  assert.deepEqual(encode(12).toArray(), [0b1100n, 0b0001n]);
  assert.deepEqual(encode(13).toArray(), [0b1101n, 0b0001n]);
  assert.deepEqual(encode(14).toArray(), [0b1110n, 0b0001n]);
  assert.deepEqual(encode(15).toArray(), [0b1111n, 0b0001n]);
  assert.deepEqual(encode(16).toArray(), [0b1000n, 0b0010n]);
});

it("varintEncoder(4, zigzag: true)", () => {
  const encode = varintEncoder(4, true);
  assert.deepEqual(encode(0).toArray(), [0b0000n]);
  assert.deepEqual(encode(-1).toArray(), [0b0001n]);
  assert.deepEqual(encode(1).toArray(), [0b0010n]);
  assert.deepEqual(encode(-2).toArray(), [0b0011n]);
  assert.deepEqual(encode(2).toArray(), [0b0100n]);
  assert.deepEqual(encode(-3).toArray(), [0b0101n]);
  assert.deepEqual(encode(3).toArray(), [0b0110n]);
  assert.deepEqual(encode(-4).toArray(), [0b0111n]);
  assert.deepEqual(encode(4).toArray(), [0b1000n, 0b0001n]);
  assert.deepEqual(encode(-5).toArray(), [0b1001n, 0b0001n]);
  assert.deepEqual(encode(5).toArray(), [0b1010n, 0b0001n]);
  assert.deepEqual(encode(-6).toArray(), [0b1011n, 0b0001n]);
  assert.deepEqual(encode(6).toArray(), [0b1100n, 0b0001n]);
  assert.deepEqual(encode(-7).toArray(), [0b1101n, 0b0001n]);
  assert.deepEqual(encode(7).toArray(), [0b1110n, 0b0001n]);
  assert.deepEqual(encode(-8).toArray(), [0b1111n, 0b0001n]);
  assert.deepEqual(encode(8).toArray(), [0b1000n, 0b0010n]);
});

it("n |> encode |> decode === n", () => {
  for (let chunkSize = 2; chunkSize <= 257; chunkSize++) {
    const encode = varintEncoder(chunkSize);
    const decode = varintDecoder(chunkSize);
    for (let i = 0; i < 1000; i++) {
      const n = BigInt(Math.round(Math.random() * Number.MAX_VALUE));
      assert.equal(decode(encode(n)), n);
    }
  }
});

it("n |> zigzag |> encode |> decode |> decodeZigzag === n", () => {
  for (let chunkSize = 2; chunkSize <= 257; chunkSize++) {
    const encode = varintEncoder(chunkSize, true);
    const decode = varintDecoder(chunkSize, true);
    for (let i = 0; i < 1000; i++) {
      const n = BigInt(Math.round(Math.random() * Number.MAX_VALUE));
      assert.equal(decode(encode(n)), n);
      assert.equal(decode(encode(-n)), -n);
    }
  }
});
