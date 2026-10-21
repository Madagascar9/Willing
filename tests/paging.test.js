const test = require('node:test');
const assert = require('node:assert/strict');
const { simulate } = require('../paging.js');

test('classroom example produces the explained fault totals', () => {
  const pages = [1, 2, 3, 1, 4, 1, 2, 3];
  for (const [policy, faults] of [['FIFO', 7], ['LRU', 6], ['OPT', 5]]) {
    assert.equal(simulate(pages, 3, policy).at(-1).faults, faults);
  }
});
test('the three policies choose the explained victims', () => {
  const pages = [1, 2, 3, 1, 4, 1, 2, 3];
  for (const [policy, victim] of [['FIFO', 1], ['LRU', 2], ['OPT', 3]]) {
    assert.equal(simulate(pages, 3, policy)[4].evicted, victim);
  }
});
test('FIFO demonstrates Belady’s anomaly', () => {
  const pages = [1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5];
  assert.equal(simulate(pages, 3, 'FIFO').at(-1).faults, 9);
  assert.equal(simulate(pages, 4, 'FIFO').at(-1).faults, 10);
});
test('hits do not evict pages and empty frames fill without eviction', () => {
  const rows = simulate([0, 0, 1], 2, 'LRU');
  assert.deepEqual(rows.map(r => r.hit), [false, true, false]);
  assert.ok(rows.every(r => r.evicted === null));
  assert.deepEqual(rows.at(-1).frames, [0, 1]);
});

test('guide FIFO calculation has five faults and two hits', () => {
  const rows = simulate([1, 2, 3, 1, 4, 2, 5], 3, 'FIFO');
  assert.equal(rows.at(-1).faults, 5);
  assert.equal(rows.filter(r => r.hit).length, 2);
  assert.equal(rows.at(-1).evicted, 2);
});
test('Clock clears reference bits and advances its hand', () => {
  const rows = simulate([1, 2, 3, 4, 2, 5], 3, 'CLOCK');
  assert.deepEqual(rows[2].bits, [1, 1, 1]);
  assert.equal(rows[3].evicted, 1);
  assert.deepEqual(rows[3].bits, [1, 0, 0]);
  assert.equal(rows[3].hand, 1);
  assert.equal(rows[4].hit, true);
  assert.deepEqual(rows[4].bits, [1, 1, 0]);
  assert.equal(rows[5].evicted, 3);
  assert.deepEqual(rows[5].bits, [1, 0, 1]);
  assert.equal(rows[5].hand, 0);
});
