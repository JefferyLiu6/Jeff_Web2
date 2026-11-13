import type { ComponentType } from "react";
import { LinguaflowPipeline } from "./LinguaflowPipeline";
import { LinguaflowEvaluation } from "./LinguaflowEvaluation";
import { NotesTraining } from "./NotesTraining";
import { NotesPreferencePair } from "./NotesPreferencePair";

/**
 * Every diagram a case study can show, by name.
 *
 * In a project file, `diagram: <name>` in the header draws it under "How it fits together",
 * and `![Caption](diagram:<name>)` on its own line draws it inside the text.
 */
const DIAGRAMS: Record<string, ComponentType> = {
  "linguaflow-pipeline": LinguaflowPipeline,
  "linguaflow-evaluation": LinguaflowEvaluation,
  "notes-training": NotesTraining,
  "notes-preference-pair": NotesPreferencePair,
};

export function Diagram({ name }: { name: string }) {
  const Drawn = DIAGRAMS[name];
  if (!Drawn) {
    throw new Error(`No diagram called "${name}". Known diagrams: ${Object.keys(DIAGRAMS).join(", ")}.`);
  }
  return <Drawn />;
}
