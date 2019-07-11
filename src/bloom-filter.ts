import { h32 } from 'xxhashjs';

/**
 * Simple bloom filter data structure
 *  - Fast and efficient hash table
 *  - Uses multiple hashing functions to generate multiple indicies for an input
 *  - Can only tell you if an item is definitively *not* in a set
 */
export class BloomFilter {
  /**
   * Filter hash table
   */
  private table: number[];

  /**
   * Hash table size
   */
  private size: number;

  /**
   * Instantiate a new bloom filter
   */
  constructor(size: number = 256) {
    // New empty hash table
    this.table = new Array<number>(size);
    this.size = size;
  }

  /**
   * Add a value to the bloom filter
   */
  public add(input: string): void {
    this.table[this.h1(input)] = 1;
    this.table[this.h2(input)] = 1;
    this.table[this.h3(input)] = 1;
  }

  /**
   * Determine if given input is in the bloom filter
   */
  public has(input: string): boolean {
    return this.table[this.h1(input)] === 1 &&
      this.table[this.h2(input)] === 1 &&
      this.table[this.h3(input)] === 1;
  }

  /**
   * Hash given input
   */
  private hash(input: string, seed: number = 0xABCD): number {
    return Math.abs(h32(seed).update(input).digest().toNumber() % this.size);
  }

  /**
   * Hash given input using first hashing algorithm
   */
  private h1(input: string): number {
    return this.hash(input, 0xABCD);
  }

  /**
   * Hash given input using second hashing algorithm
   */
  private h2(input: string): number {
    return this.hash(input, 0x1234);
  }

  /**
   * Hash given input using third hashing algorithm
   */
  private h3(input: string): number {
    return this.hash(input, 0x6789);
  }
}
