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
