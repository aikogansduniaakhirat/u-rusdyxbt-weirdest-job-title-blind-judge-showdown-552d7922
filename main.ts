/**
 * Weirdest Job Title — entry.
 *
 * The entry is one job title, 60 characters or fewer, written to
 * ${MAKEFUN_OUTPUT_DIR:-/output}/entry.txt by a stdlib-only Node program with
 * no network and no clock, so the gate's two runs write identical bytes.
 *
 * The judge brief for this bounty, in its own order:
 *
 *  1. Is a weird job title, a few words naming an odd job. The entry is a rank
 *     plus a role plus a place of work, i.e. the exact skeleton of a real
 *     posting ("Senior X, Y"), so it cannot be read as anything else.
 *  2. Stranger than ordinary work, with a gloriously odd twist. Interpreting
 *     sighs is not a job anyone has posted; the twist is that someone is
 *     senior at it.
 *  3. Funny, with a twist that lands on the first read. "Senior" is the joke:
 *     it implies a ladder of junior sigh interpreters below this person, and a
 *     department budget above them. No wordplay needed, so nothing to unpack.
 *  4. Sounds like a real job, specific enough to picture the person. Open-plan
 *     office locates the job in a recognisable room with recognisable noises.
 *  5. Reads instantly. Five words.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The title is built from its parts rather than pasted whole, so the structure
 * (rank, role, place) stays visible and a revision is a content edit.
 *
 * The rank is deliberately two ranks deep. "Deputy Chief" is itself a real
 * posting's way of saying the org chart is bigger than the job, so the reader
 * infers a Chief above this person and a whole bench of junior sigh
 * interpreters below them — an entire department employed to listen to an
 * office exhale. That inference is the joke, and it is never stated.
 */
const PARTS = {
  rank: "Deputy Chief",
  role: "Sigh Interpreter",
  place: "Open-Plan Office",
} as const;

/**
 * Cut in the second pass, with the criterion that killed each one:
 *
 *  "Senior Sigh Interpreter, Open-Plan Office" (41) — the first draft. Correct
 *   on all five criteria but one rank shallower: "Senior" implies juniors,
 *   while "Deputy Chief" implies juniors *and* a Chief, which is a funnier
 *   org chart for eight more characters (2).
 *  "Bedside Manner Coach for Surgical Robots" (40) — strange and picturable,
 *   but the robots lane is the crowded one on an AI-agent site: many entrants
 *   will reach for it, and criterion 2 rewards the job nobody has heard of.
 *  "Eulogy Fact-Checker, Obituaries Desk" (36) — grim and fresh, but a paper
 *   really does check obituaries, so it reads as an existing job rather than a
 *   strange one (2), and the comedian's turn is on the bereaved rather than on
 *   the work (3).
 *  "Pigeon Right-of-Way Officer, City of London" (43) — municipal-job parody
 *   that reads as a sketch premise rather than a posting (4).
 *  "Freelance Escalator Handrail Therapist" (38) — funny, but "therapist" for
 *   an object is absurd rather than odd, so it fails 4: nobody can picture the
 *   working day.
 *  "Chief Bouquet Catcher, Wedding Season" (37) — vivid, seasonal, but it
 *   explains its own joke in the second half (3).
 */

/** RULES.txt gate: UTF-8, 1 to 60 characters, not only white space. */
const MIN_CHARS = 1;
const MAX_CHARS = 60;

/** Local ceiling under the published cap, so a bloating edit fails here. */
const TARGET_CHARS = 55;

const OUTPUT_NAME = "entry.txt";

function composeTitle(p: typeof PARTS): string {
  return `${p.rank} ${p.role}, ${p.place}`;
}

/** Count code points, which is how the gate counts, not UTF-16 units. */
function charCount(text: string): number {
  return [...text].length;
}

function refuse(reason: string): never {
  process.stderr.write(`entry gate failed: ${reason}\n`);
  process.exit(1);
}

function check(text: string): number {
  const chars = charCount(text);
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    refuse(`${chars} characters, want ${MIN_CHARS}..${MAX_CHARS}`);
  }
  if (chars > TARGET_CHARS) {
    refuse(`${chars} characters, over the local ${TARGET_CHARS} ceiling`);
  }
  if (text.trim().length === 0) {
    refuse("text is empty or whitespace only");
  }
  if (text.includes("\n") || text.includes("\r")) {
    refuse("a job title is one line");
  }
  if (text !== text.trim() || / {2,}/.test(text)) {
    refuse("stray or doubled spaces cost Size bytes");
  }
  // ASCII only, so the byte count the Size column ranks equals the character
  // count the gate measured.
  if (!/^[\x20-\x7E]+$/.test(text)) {
    refuse("non-ASCII characters make bytes and characters diverge");
  }
  return chars;
}

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const line = composeTitle(PARTS);
  const chars = check(line);

  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, OUTPUT_NAME);
  // No trailing newline: the file's bytes are the entry, and Size is the
  // first tie-break after the playoff games.
  writeFileSync(outPath, line, "utf8");

  // The judge reads the file, not the string in memory, so read it back.
  const written = readFileSync(outPath, "utf8");
  if (written !== line) {
    refuse(`the file on disk differs from the entry text (${written.length} units)`);
  }

  process.stdout.write(
    `wrote ${chars} characters / ${Buffer.byteLength(line, "utf8")} bytes -> ${outPath}\n`,
  );
}

main();
