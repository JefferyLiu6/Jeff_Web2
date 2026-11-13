/**
 * Shared pieces for the hand-drawn SVG diagrams. Coordinates are in viewBox units,
 * and every diagram uses a 900-wide viewBox so one unit is one pixel at full width.
 */
import type { ReactNode } from "react";

type Tone = "tint" | "ink" | "outline";

const TITLE_Y = 25;
const FIRST_LINE_Y = 45;
const LINE_STEP = 18;

/** Height a box needs for a title and n lines of text. */
export const boxHeight = (lines: number) => FIRST_LINE_Y + Math.max(lines - 1, 0) * LINE_STEP + 14;

/** A labelled box: a bold title and short lines beneath it. Text does not wrap, so keep lines short. */
export function Box({
  x,
  y,
  w,
  h,
  title,
  lines = [],
  tone = "tint",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  lines?: string[];
  tone?: Tone;
}) {
  const shape =
    tone === "ink" ? "fill-ink" : tone === "outline" ? "fill-white stroke-rule-strong" : "fill-tint";
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={4}
        className={shape}
        strokeDasharray={tone === "outline" ? "5 4" : undefined}
      />
      <text x={x + 14} y={y + TITLE_Y} fontSize={15} fontWeight={600} className={tone === "ink" ? "fill-white" : "fill-ink"}>
        {title}
      </text>
      {lines.map((line, i) => (
        <text
          key={line}
          x={x + 14}
          y={y + FIRST_LINE_Y + i * LINE_STEP}
          fontSize={13}
          className={tone === "ink" ? "fill-white/85" : "fill-body-colour"}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

type Stroke = "ink" | "muted" | "accent";
const strokeClass: Record<Stroke, string> = { ink: "stroke-ink", muted: "stroke-muted", accent: "stroke-accent" };
const fillClass: Record<Stroke, string> = { ink: "fill-ink", muted: "fill-muted", accent: "fill-accent" };

/** Arrowheads for one diagram. `id` must be unique on the page. */
export function ArrowDefs({ id }: { id: string }) {
  return (
    <defs>
      {(Object.keys(fillClass) as Stroke[]).map((c) => (
        <marker key={c} id={`${id}-${c}`} viewBox="0 0 10 10" refX={9} refY={5} markerWidth={7} markerHeight={7} orient="auto">
          <path d="M0 1 9 5 0 9z" className={fillClass[c]} />
        </marker>
      ))}
    </defs>
  );
}

/** A line through the given points, with an arrowhead at the end unless `head` is false. */
export function Arrow({
  id,
  points,
  colour = "ink",
  dashed = false,
  head = true,
}: {
  id: string;
  points: [number, number][];
  colour?: Stroke;
  dashed?: boolean;
  head?: boolean;
}) {
  return (
    <polyline
      points={points.map((p) => p.join(",")).join(" ")}
      fill="none"
      strokeWidth={1.5}
      strokeLinejoin="round"
      strokeDasharray={dashed ? "5 4" : undefined}
      markerEnd={head ? `url(#${id}-${colour})` : undefined}
      className={strokeClass[colour]}
    />
  );
}

/** Small text that sits beside a line. */
export function Note({
  x,
  y,
  children,
  colour = "muted",
  anchor = "start",
}: {
  x: number;
  y: number;
  children: ReactNode;
  colour?: Stroke | "body";
  anchor?: "start" | "middle" | "end";
}) {
  const fill = colour === "body" ? "fill-body-colour" : fillClass[colour];
  return (
    <text x={x} y={y} fontSize={13} textAnchor={anchor} className={fill}>
      {children}
    </text>
  );
}

/** Wraps an SVG diagram with a title and a full text description for screen readers. */
export function Svg({
  id,
  height,
  title,
  desc,
  children,
}: {
  id: string;
  height: number;
  title: string;
  desc: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 900 ${height}`}
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
      className="block h-auto w-full max-w-[900px]"
    >
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-desc`}>{desc}</desc>
      <ArrowDefs id={id} />
      {children}
    </svg>
  );
}
