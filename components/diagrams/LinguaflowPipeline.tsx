import { Arrow, Box, Note, Svg } from "./parts";

const ID = "lf-rag";

/** Four columns shared by the indexing and retrieval lanes. */
const COL = [0, 233, 466, 699];
const W = 200;
const centre = (i: number) => COL[i] + W / 2;

const ROUTES = [
  { when: "Note supports it", then: "LLM answers from that note. Code attaches the stored source text.", main: true },
  { when: "No note supports it", then: "LLM gives general help. Code adds a no-coverage disclosure." },
  { when: "Learner text missing", then: "Fixed clarification, no generation." },
  { when: "Off-topic request", then: "Fixed redirect, no generation." },
  { when: "Index or provider error", then: "HTTP 503, never passed off as “no source found”.", error: true },
];

function Lane({ x = 0, y, children }: { x?: number; y: number; children: string }) {
  return (
    <text x={x} y={y} fontSize={12} fontWeight={600} letterSpacing="0.1em" className="fill-muted">
      {children}
    </text>
  );
}

/** LinguaFlow's RAG pipeline: offline indexing, per-request retrieval, then verification and routing. */
export function LinguaflowPipeline() {
  const indexY = 26;
  const indexH = 95;
  const retrY = 168;
  const retrH = 77;
  const retrMid = retrY + retrH / 2;
  const wrapY = 262;
  const routeH = 40;
  const routeY = (i: number) => 296 + i * (routeH + 8);
  const routesEnd = routeY(ROUTES.length - 1) + routeH;
  const verifyH = 95;
  const verifyY = (routeY(0) + routesEnd) / 2 - verifyH / 2;
  const verifyMid = verifyY + verifyH / 2;
  const trunkX = 264;

  return (
    <Svg
      id={ID}
      height={routesEnd + 8}
      title="LinguaFlow's retrieval-augmented generation pipeline"
      desc="Indexing, offline: 31 teaching notes, one note per chunk, are embedded with text-embedding-3-small at 1,536 dimensions and published atomically with a manifest into a PostgreSQL pgvector index. Readers reject an index that is incomplete or built with a different embedding model. Retrieval, per request: the query is the question followed by the drill card's text. It is embedded with the same model, pgvector cosine search returns up to ten candidates, and a rerank of 0.6 times cosine plus 0.4 times card metadata sends the top five forward. Verification: one GPT-4.1 call checks scope, missing text and evidence, and returns the IDs of supporting notes, or none. Routing: if a note supports the answer, the LLM answers from that note and code attaches the stored source text. If no note supports it, the LLM gives general help and code adds a no-coverage disclosure. If the learner's text is missing, a fixed clarification is returned with no generation. An off-topic request gets a fixed redirect with no generation. An index or provider error returns HTTP 503 and is never passed off as no source found."
    >
      {/* Indexing */}
      <Lane y={14}>INDEXING · OFFLINE</Lane>
      <Box x={COL[0]} y={indexY} w={W} h={indexH} title="Course notes" lines={["31 teaching notes.", "One note is one chunk."]} />
      <Box
        x={COL[1]}
        y={indexY}
        w={W}
        h={indexH}
        title="Embed and publish"
        lines={["text-embedding-3-small,", "1,536 dimensions. Published", "atomically with a manifest."]}
      />
      <path
        d={`M${COL[2]} ${indexY + 12}v${indexH - 22}a${W / 2} 10 0 0 0 ${W} 0v${22 - indexH}`}
        className="fill-tint stroke-rule-strong"
      />
      <ellipse cx={centre(2)} cy={indexY + 12} rx={W / 2} ry={10} className="fill-white stroke-rule-strong" />
      <text x={centre(2)} y={indexY + 56} fontSize={15} fontWeight={600} textAnchor="middle" className="fill-ink">
        Vector index
      </text>
      <text x={centre(2)} y={indexY + 76} fontSize={13} textAnchor="middle" className="fill-body-colour">
        PostgreSQL + pgvector
      </text>
      <Arrow id={ID} points={[[COL[0] + W, indexY + indexH / 2], [COL[1] - 2, indexY + indexH / 2]]} />
      <Arrow id={ID} points={[[COL[1] + W, indexY + indexH / 2], [COL[2] - 2, indexY + indexH / 2]]} />
      <Note x={COL[3] + 6} y={indexY + 34}>Readers reject an index that</Note>
      <Note x={COL[3] + 6} y={indexY + 52}>is incomplete or built with a</Note>
      <Note x={COL[3] + 6} y={indexY + 70}>different embedding model.</Note>

      {/* Retrieval */}
      <Lane y={156}>RETRIEVAL · PER REQUEST</Lane>
      <Box x={COL[0]} y={retrY} w={W} h={retrH} title="Query" lines={["The question, then the", "drill card's text."]} />
      <Box x={COL[1]} y={retrY} w={W} h={retrH} title="Embed query" lines={["Same model as the index."]} />
      <Box x={COL[2]} y={retrY} w={W} h={retrH} title="Vector search" lines={["pgvector cosine search.", "Up to 10 candidates."]} />
      <Box x={COL[3]} y={retrY} w={W} h={retrH} title="Rerank" lines={["0.6 × cosine + 0.4 × card", "metadata. Top 5 go on."]} />
      {[0, 1, 2].map((i) => (
        <Arrow key={i} id={ID} points={[[COL[i] + W, retrMid], [COL[i + 1] - 2, retrMid]]} />
      ))}
      <Arrow id={ID} points={[[centre(2), indexY + indexH + 1], [centre(2), retrY - 2]]} />

      {/* Verification and routing */}
      <Arrow id={ID} points={[[centre(3), retrY + retrH], [centre(3), wrapY], [120, wrapY], [120, verifyY - 2]]} />
      <Note x={132} y={wrapY + 20}>5 candidate notes</Note>
      <Lane x={296} y={284}>ROUTING AND GENERATION</Lane>
      <Box
        x={0}
        y={verifyY}
        w={240}
        h={verifyH}
        tone="ink"
        title="Verify · GPT-4.1, one call"
        lines={["Checks scope, missing text and", "evidence. Returns the IDs of", "supporting notes, or none."]}
      />
      <Arrow id={ID} head={false} points={[[240, verifyMid], [trunkX, verifyMid]]} />
      <Arrow id={ID} head={false} points={[[trunkX, routeY(0) + routeH / 2], [trunkX, routeY(3) + routeH / 2]]} />
      <Arrow
        id={ID}
        head={false}
        colour="muted"
        dashed
        points={[[trunkX, routeY(3) + routeH / 2], [trunkX, routeY(4) + routeH / 2]]}
      />
      {ROUTES.map((r, i) => {
        const y = routeY(i);
        return (
          <g key={r.when}>
            <Arrow
              id={ID}
              colour={r.error ? "muted" : "ink"}
              dashed={r.error}
              points={[[trunkX, y + routeH / 2], [294, y + routeH / 2]]}
            />
            <rect
              x={296}
              y={y}
              width={604}
              height={routeH}
              rx={4}
              className={r.error ? "fill-white stroke-rule-strong" : "fill-tint"}
              strokeDasharray={r.error ? "5 4" : undefined}
            />
            {r.main && <rect x={296} y={y} width={3} height={routeH} className="fill-accent" />}
            <text x={312} y={y + 25} fontSize={14} fontWeight={600} className="fill-ink">
              {r.when}
            </text>
            <text x={486} y={y + 25} fontSize={13} className="fill-body-colour">
              {r.then}
            </text>
          </g>
        );
      })}
    </Svg>
  );
}
