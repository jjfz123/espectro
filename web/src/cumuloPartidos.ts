export const RADIO_CUMULO_PARTIDOS = 32;

/**
 * Resuelve un cúmulo por geometría, sin depender del catálogo que haya
 * alcanzado ya la puerta documental. La función pura permite probar el caso
 * de solapamiento incluso durante una fase editorial en la que solo uno o
 * ningún partido sea todavía publicable.
 */
export function idsPartidosEnCumulo(
  puntos: readonly { id: string; cx: number; cy: number }[],
  id: string,
  radio = RADIO_CUMULO_PARTIDOS,
): string[] {
  const origen = puntos.find((punto) => punto.id === id);
  if (!origen || !Number.isFinite(radio) || radio < 0) return [];
  return puntos
    .filter((punto) => Math.hypot(punto.cx - origen.cx, punto.cy - origen.cy) <= radio)
    .map((punto) => punto.id);
}
