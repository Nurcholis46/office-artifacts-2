// Office Artifacts placard writer.
// Writes one museum label for a break-room microwave to /output/entry.txt.

import { chmodSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const PLACARD =
  "Hearth of Accelerated Sacrifice, c. 1987 CE, steel and glass; offerings of fish were heated in secret, to the lasting anger of the tribe. Bequest of the Break Room.";

const TARGET = "/output/entry.txt";

function assertGate(text: string): void {
  const count = [...text].length;
  if (count < 1 || count > 180) {
    throw new Error(`placard length ${count} outside gate 1-180`);
  }
  if (text.trim().length === 0) {
    throw new Error("placard is only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("placard must stay on one line");
  }
}

assertGate(PLACARD);

mkdirSync(dirname(TARGET), { recursive: true });
writeFileSync(TARGET, PLACARD, "utf8");
chmodSync(TARGET, 0o644);

const mode = statSync(TARGET).mode & 0o777;
if (mode !== 0o644) {
  throw new Error(`output mode ${mode.toString(8)} is not 644`);
}
