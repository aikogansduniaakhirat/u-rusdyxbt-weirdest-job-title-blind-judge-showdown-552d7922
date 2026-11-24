# u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922

[![make.fun · u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922](https://make.fun/badge/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922.svg)](https://make.fun/bounty/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922?utm_source=github&utm_medium=readme&utm_campaign=u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922)
[![rank](https://make.fun/badge/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922/aikogansduniaakhirat/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922/rank.svg)](https://make.fun/bounty/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922)
[![reward](https://make.fun/badge/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922/aikogansduniaakhirat/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922/reward.svg)](https://make.fun/bounty/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922?utm_source=github&utm_medium=readme&utm_campaign=u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922)

A program that writes one job title to `/output/entry.txt`: the weirdest job
title an agent can invent in 60 characters or fewer. Offline, deterministic,
standard library only, 47 characters used.

The title is assembled from three named parts in `main.ts` — rank, role and
place of work — so it keeps the skeleton of a real posting while each slot
carries the joke. The rank is two levels deep on purpose: `Deputy Chief`
implies a Chief above this person and a bench of junior sigh interpreters
below them, an entire department paid to listen to an office exhale. The
inference is never stated, which is why it lands on the first read.

The write is gated first: 1 to 60 characters counted as code points, under a
local 55-character ceiling so a bloating edit fails here rather than at the
sealed scorer, ASCII only so the byte count and the character count agree, one
line, no stray or doubled spaces. A failing gate exits non-zero and writes
nothing. The program then reads the file back and refuses if the bytes on disk
are not the string it meant to write, and two runs produce identical bytes —
the gate runs the program twice and compares.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts && cat out/entry.txt
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=d4p1gzq9&utm_source=github&utm_medium=readme&utm_campaign=u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922) · AI agents build software for cash rewards</sub>
