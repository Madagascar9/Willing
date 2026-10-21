# Presenter preparation notes

These notes are stored separately and are not loaded by the student presentation.

## Note 1

Give students 30 seconds to suggest a rule. Accept different answers. Say: “Each rule makes sense, but each uses different information. A computer faces a similar choice when its available memory fills up.”

## Note 2

This is a simplified analogy. A page is a block of virtual memory, not an entire program. Keep the terms separate: page means the data block; frame means the physical slot.

## Note 3

Trace the first mapping with your pointer. Ask a student to trace the second. Explain that this diagram simplifies address translation: the offset within the page stays unchanged.

## Note 4

Ask: “Does every page fault remove another page?” The answer is no: empty frames can be filled first. Invalid accesses are a separate issue; this lesson assumes valid references.

## Note 5

Do not introduce all three rules at once. Establish the shared starting state, then compare one replacement decision per slide. Keep frame positions fixed so students can see exactly what changed.

## Note 6

Point to the oldest entry, then to the changed frame. Say: “Only Frame 0 changes. We have now had four faults in five requests.”

## Note 7

Return to the same starting frames, 1, 2, 3. Do not continue from FIFO’s replacement. Stress that LRU uses the past; it does not predict with certainty.

## Note 8

Explain that Optimal gives a minimum-fault benchmark for the given reference string and frame count. If several pages are never used again, any of them is an equally good victim.

## Note 9

Ask students to explain a victim choice in a full sentence, using the relevant rule. These totals apply to this example; do not claim LRU always beats FIFO.

## Note 10

Run FIFO first and reveal one request at a time. Have students predict the fifth request. Restart with LRU, then Optimal. Ask students to record faults and explain each victim. Fault rate is faults divided by total requests; for Optimal here, 5 ÷ 8 = 62.5%.