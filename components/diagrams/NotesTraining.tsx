import { Arrow, Box, Note, Svg } from "./parts";

const ID = "notes-training";

/** How the 600 examples are split and which part feeds each training stage and the checker. */
export function NotesTraining() {
  const barY = 28;
  const barH = 44;
  const barEnd = barY + barH;
  const rowY = 240;
  const rowH = 95;
  const mid = rowY + rowH / 2;

  return (
    <Svg
      id={ID}
      height={392}
      title="The fine-tuning pipeline: supervised LoRA tuning, then DPO, scored on held-out prompts"
      desc="600 examples, 68 written by hand and 532 synthetic, are split once into 400 training, 75 validation and 125 test examples. The training examples feed supervised fine-tuning with LoRA, where a small adapter is trained while the base model, Qwen2.5-1.5B-Instruct, stays frozen. Training and validation examples are also used to build 300 DPO preference pairs, each with a chosen correct note and a rejected copy with one planted flaw. DPO then trains a policy adapter against a frozen reference copy of the LoRA adapter, using those pairs. The 125 test examples are held out, never used in training or in pairs, and go only to the checker, which scores each tuned model separately: rules for format, and word overlap with a reference note for content."
    >
      <text x={0} y={14} fontSize={12} fontWeight={600} letterSpacing="0.1em" className="fill-muted">
        600 EXAMPLES · 68 WRITTEN BY HAND · 532 SYNTHETIC · SPLIT ONCE
      </text>

      {/* The split, drawn to scale */}
      <rect x={0} y={barY} width={598} height={barH} rx={4} className="fill-tint" />
      <text x={14} y={barY + 27} fontSize={15} className="fill-body-colour">
        <tspan fontWeight={600} className="fill-ink">
          Training
        </tspan>{" "}
        · 400
      </text>
      <rect x={602} y={barY} width={108} height={barH} rx={4} className="fill-tint" />
      <text x={656} y={barY + 27} fontSize={13} textAnchor="middle" className="fill-body-colour">
        <tspan fontWeight={600} className="fill-ink">
          Validation
        </tspan>{" "}
        · 75
      </text>
      <rect x={714} y={barY} width={186} height={barH} rx={4} className="fill-ink" />
      <text x={728} y={barY + 27} fontSize={15} className="fill-white/85">
        <tspan fontWeight={600} className="fill-white">
          Test
        </tspan>{" "}
        · 125
      </text>

      {/* Preference pairs come from training and validation only */}
      <Box
        x={330}
        y={118}
        w={280}
        h={77}
        title="300 DPO preference pairs"
        lines={["Chosen: a correct note. Rejected: the", "same note with one planted flaw."]}
      />
      <Arrow id={ID} points={[[470, barEnd], [470, 116]]} />
      <Arrow id={ID} points={[[656, barEnd], [656, 156], [612, 156]]} />

      {/* Training stages */}
      <Box
        x={0}
        y={rowY}
        w={230}
        h={rowH}
        title="Supervised tuning (LoRA)"
        lines={["Trains a small adapter on the", "format. Qwen2.5-1.5B-Instruct", "stays frozen."]}
      />
      <Arrow id={ID} points={[[125, barEnd], [125, rowY - 2]]} />
      <Box
        x={330}
        y={rowY}
        w={280}
        h={rowH}
        title="Preference tuning (DPO)"
        lines={["A policy adapter trains against a", "frozen reference copy of the LoRA", "adapter."]}
      />
      <Arrow id={ID} points={[[470, 195], [470, rowY - 2]]} />
      <Arrow id={ID} points={[[230, mid], [328, mid]]} />
      <Note x={279} y={mid - 9} anchor="middle">
        LoRA adapter
      </Note>

      {/* Scoring on held-out prompts */}
      <Box
        x={690}
        y={rowY}
        w={210}
        h={rowH}
        tone="outline"
        title="Evaluation"
        lines={["Format: rule-based checker.", "Content: token overlap with", "a reference note."]}
      />
      <Arrow id={ID} colour="accent" points={[[736, barEnd], [736, rowY - 2]]} />
      <Note x={750} y={140} colour="accent">
        Held out: never used
      </Note>
      <Note x={750} y={158} colour="accent">
        in training or in pairs
      </Note>
      <Arrow id={ID} points={[[610, mid], [688, mid]]} />
      <Arrow id={ID} points={[[125, rowY + rowH], [125, 364], [795, 364], [795, rowY + rowH + 2]]} />
      <Note x={460} y={384} anchor="middle">
        Each adapter is scored separately on the 125 held-out prompts.
      </Note>
    </Svg>
  );
}
