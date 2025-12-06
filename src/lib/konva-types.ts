import { KonvaNodeEvents } from "react-konva";

/**
 * The model that can be used to describe the object passed back through an event from native Konva react elements
 */
export type KonvaEventObject<T extends keyof KonvaNodeEvents> = Parameters<
  NonNullable<KonvaNodeEvents[T]>
>[0];
