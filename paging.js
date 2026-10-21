// Page replacement logic shared by the lesson and its validation.
(function (root) {
  function simulate(pages, capacity, algorithm) {
    if (!Number.isInteger(capacity) || capacity < 1) throw new Error('Frame count must be a positive integer.');
    if (!['FIFO', 'LRU', 'OPT', 'CLOCK'].includes(algorithm)) throw new Error('Unknown algorithm.');
    const frames = [], loaded = new Map(), used = new Map();
    let faults = 0, hand = 0;
    const bits = [];
    return pages.map((page, index) => {
      const hit = frames.includes(page);
      let evicted = null;
      if (!hit) {
        faults++;
        let slot = frames.length;
        if (slot === capacity) {
          slot = 0;
          for (let j = 1; j < frames.length; j++) {
            if (algorithm === 'FIFO' && loaded.get(frames[j]) < loaded.get(frames[slot])) slot = j;
            if (algorithm === 'LRU' && used.get(frames[j]) < used.get(frames[slot])) slot = j;
            if (algorithm === 'OPT') {
              const next = p => { const n = pages.indexOf(p, index + 1); return n < 0 ? Infinity : n; };
              if (next(frames[j]) > next(frames[slot])) slot = j;
            }
          }
          if (algorithm === 'CLOCK') {
            while (bits[hand] === 1) {
              bits[hand] = 0;
              hand = (hand + 1) % capacity;
            }
            slot = hand;
          }
          evicted = frames[slot];
        }
        frames[slot] = page;
        loaded.set(page, index);
        if (algorithm === 'CLOCK') hand = (slot + 1) % capacity;
      }
      used.set(page, index);
      if (algorithm === 'CLOCK') bits[frames.indexOf(page)] = 1;
      return {page, hit, evicted, frames: [...frames], faults, ...(algorithm === 'CLOCK' ? {bits: [...bits], hand} : {})};
    });
  }
  if (typeof module !== 'undefined') module.exports = {simulate};
  else root.simulate = simulate;
})(globalThis);
