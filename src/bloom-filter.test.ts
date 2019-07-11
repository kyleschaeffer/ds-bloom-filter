import { BloomFilter } from './bloom-filter';

test('returns false when empty', () => {
  const bf = new BloomFilter();
  expect(bf.has('one')).toBe(false);
  expect(bf.has('two')).toBe(false);
  expect(bf.has('three')).toBe(false);
});

test('returns true when item is added', () => {
  const bf = new BloomFilter();
  bf.add('one');
  expect(bf.has('one')).toBe(true);
  expect(bf.has('two')).toBe(false);
  expect(bf.has('three')).toBe(false);
});

test('returns true when many items are added', () => {
  const bf = new BloomFilter();
  const items = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
  items.forEach(item => bf.add(item));
  items.forEach(item => {
    expect(bf.has(item)).toBe(true);
  });
});
