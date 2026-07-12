import { ordenarPartidosParaVista } from './resultadoCompartido';
import type { ResultadoCompartidoV1 } from './resultadoCompartido';

export type TipoCapturaResultado = 'resumen' | 'brujula' | 'afinidades' | 'facetas';

export interface EjeParaCaptura {
  id: string;
  nombre: string;
  poloNegativo: string;
  poloPositivo: string;
}

export interface EtiquetasParaCaptura {
  contexto: string;
  nivel: string;
  ejes: ReadonlyMap<string, EjeParaCaptura>;
  partidos: ReadonlyMap<string, string>;
}

export interface OpcionCaptura {
  tipo: TipoCapturaResultado;
  paginaFacetas?: number;
}

export const FACETAS_POR_CAPTURA = 7;

const INTERLINEADO_NOMBRE_RESUMEN = 24;
const SEPARACION_METADATOS_RESUMEN = 31;
const SEPARACION_FILAS_RESUMEN = 27;

export interface FilaResumen {
  nombreY: number;
  metadatosY: number;
}

/**
 * Distribuye las afinidades del resumen según las líneas que realmente ocupa
 * cada nombre. Mantenerlo como cálculo puro permite proteger el lienzo frente
 * a nombres largos sin depender de comparaciones frágiles de píxeles PNG.
 */
export function distribuirFilasResumen(
  lineasPorNombre: readonly number[],
): FilaResumen[] {
  let cursorY = 290;
  return lineasPorNombre.map((numeroLineas) => {
    const lineas = Math.max(1, Math.min(2, Math.floor(numeroLineas)));
    const fila = {
      nombreY: cursorY,
      metadatosY:
        cursorY +
        (lineas - 1) * INTERLINEADO_NOMBRE_RESUMEN +
        SEPARACION_METADATOS_RESUMEN,
    };
    cursorY = fila.metadatosY + SEPARACION_FILAS_RESUMEN;
    return fila;
  });
}

const DIMENSIONES: Record<TipoCapturaResultado, { ancho: number; alto: number }> = {
  resumen: { ancho: 1_200, alto: 630 },
  brujula: { ancho: 1_080, alto: 1_080 },
  afinidades: { ancho: 1_080, alto: 1_350 },
  facetas: { ancho: 1_080, alto: 1_350 },
};

const COLORES = {
  papel: '#f4f1e9',
  superficie: '#fbfaf6',
  tinta: '#171717',
  suave: '#5f5b54',
  filete: '#c8c2b7',
  acento: '#8e2028',
  verde: '#5c8f71',
  azul: '#6786aa',
  morado: '#896ca5',
  rojo: '#b66b70',
} as const;

export function dimensionesCaptura(tipo: TipoCapturaResultado) {
  return DIMENSIONES[tipo];
}

export function numeroPaginasFacetas(total: number): number {
  return Math.max(1, Math.ceil(Math.max(0, total) / FACETAS_POR_CAPTURA));
}

function crearLienzo(ancho: number, alto: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const lienzo = document.createElement('canvas');
  lienzo.width = ancho;
  lienzo.height = alto;
  const contexto = lienzo.getContext('2d');
  if (!contexto) throw new Error('El navegador no permite generar la captura.');
  contexto.textBaseline = 'alphabetic';
  contexto.imageSmoothingEnabled = true;
  return [lienzo, contexto];
}

function redondearRectangulo(
  contexto: CanvasRenderingContext2D,
  x: number,
  y: number,
  ancho: number,
  alto: number,
  radio: number,
) {
  const r = Math.min(radio, ancho / 2, alto / 2);
  contexto.beginPath();
  contexto.moveTo(x + r, y);
  contexto.arcTo(x + ancho, y, x + ancho, y + alto, r);
  contexto.arcTo(x + ancho, y + alto, x, y + alto, r);
  contexto.arcTo(x, y + alto, x, y, r);
  contexto.arcTo(x, y, x + ancho, y, r);
  contexto.closePath();
}

function envolver(
  contexto: CanvasRenderingContext2D,
  texto: string,
  anchoMaximo: number,
  maximoLineas = 3,
): string[] {
  const palabras = texto.trim().split(/\s+/u);
  const lineas: string[] = [];
  let linea = '';
  for (const palabra of palabras) {
    const candidata = linea ? `${linea} ${palabra}` : palabra;
    if (contexto.measureText(candidata).width <= anchoMaximo) {
      linea = candidata;
      continue;
    }
    if (linea) lineas.push(linea);
    linea = palabra;
    if (lineas.length === maximoLineas - 1) break;
  }
  if (linea && lineas.length < maximoLineas) lineas.push(linea);
  if (lineas.join(' ').length < texto.trim().length && lineas.length > 0) {
    let ultima = lineas.at(-1) ?? '';
    while (ultima.length > 1 && contexto.measureText(`${ultima}…`).width > anchoMaximo) {
      ultima = ultima.slice(0, -1);
    }
    lineas[lineas.length - 1] = `${ultima.trimEnd()}…`;
  }
  return lineas;
}

function textoEnLineas(
  contexto: CanvasRenderingContext2D,
  texto: string,
  x: number,
  y: number,
  ancho: number,
  interlineado: number,
  maximoLineas = 3,
): number {
  const lineas = envolver(contexto, texto, ancho, maximoLineas);
  lineas.forEach((linea, indice) => contexto.fillText(linea, x, y + indice * interlineado));
  return y + Math.max(1, lineas.length) * interlineado;
}

function fondo(contexto: CanvasRenderingContext2D, ancho: number, alto: number) {
  contexto.fillStyle = COLORES.papel;
  contexto.fillRect(0, 0, ancho, alto);
  contexto.strokeStyle = COLORES.filete;
  contexto.lineWidth = 2;
  contexto.strokeRect(28, 28, ancho - 56, alto - 56);
}

function cabecera(
  contexto: CanvasRenderingContext2D,
  ancho: number,
  subtitulo: string,
  titulo = 'ESPECTRO',
) {
  contexto.fillStyle = COLORES.acento;
  contexto.font = '700 24px Arial, sans-serif';
  contexto.letterSpacing = '5px';
  contexto.fillText(titulo, 70, 82);
  contexto.letterSpacing = '0px';
  contexto.fillStyle = COLORES.suave;
  contexto.font = '400 20px Arial, sans-serif';
  contexto.textAlign = 'right';
  contexto.fillText(subtitulo, ancho - 70, 80);
  contexto.textAlign = 'left';
}

function pie(contexto: CanvasRenderingContext2D, ancho: number, alto: number) {
  contexto.fillStyle = COLORES.suave;
  contexto.font = '400 17px Arial, sans-serif';
  contexto.fillText('Proximidad de respuestas, no identidad ni recomendación de voto.', 70, alto - 62);
  contexto.textAlign = 'right';
  contexto.fillText('espectro · cálculo local', ancho - 70, alto - 62);
  contexto.textAlign = 'left';
}

function porcentaje(valor: number): string {
  return `${(valor / 10).toLocaleString('es-ES', { maximumFractionDigits: 1 })} %`;
}

function valorEje(valor: number | null): string {
  if (valor === null) return 'Sin datos';
  const normalizado = valor / 10;
  return `${normalizado > 0 ? '+' : ''}${normalizado.toLocaleString('es-ES', {
    maximumFractionDigits: 1,
  })}`;
}

function dibujarBarraEje(
  contexto: CanvasRenderingContext2D,
  x: number,
  y: number,
  ancho: number,
  valor: number | null,
) {
  contexto.fillStyle = '#ded9cf';
  contexto.fillRect(x, y, ancho, 14);
  contexto.fillStyle = COLORES.tinta;
  contexto.fillRect(x + ancho / 2 - 1, y - 4, 2, 22);
  if (valor === null) return;
  const centro = x + ancho / 2;
  const extremo = centro + (Math.max(-1_000, Math.min(1_000, valor)) / 1_000) * (ancho / 2);
  contexto.fillStyle = valor < 0 ? COLORES.verde : COLORES.morado;
  contexto.fillRect(Math.min(centro, extremo), y, Math.max(3, Math.abs(extremo - centro)), 14);
}

function facetasOrdenadas(
  resultado: ResultadoCompartidoV1,
  etiquetas: EtiquetasParaCaptura,
) {
  const orden = new Map([...etiquetas.ejes.keys()].map((id, indice) => [id, indice]));
  return [...resultado.f].sort(
    (a, b) => (orden.get(a[0]) ?? 999) - (orden.get(b[0]) ?? 999),
  );
}

function dibujarResumen(
  resultado: ResultadoCompartidoV1,
  etiquetas: EtiquetasParaCaptura,
): HTMLCanvasElement {
  const { ancho, alto } = DIMENSIONES.resumen;
  const [lienzo, contexto] = crearLienzo(ancho, alto);
  fondo(contexto, ancho, alto);
  cabecera(contexto, ancho, 'Resumen compartido');
  contexto.fillStyle = COLORES.tinta;
  contexto.font = '700 47px Georgia, serif';
  contexto.fillText('Perfil político', 70, 150);
  contexto.fillStyle = COLORES.suave;
  contexto.font = '400 20px Arial, sans-serif';
  contexto.fillText(`${etiquetas.nivel} · ${etiquetas.contexto}`, 70, 183);

  const destacadas = ['propiedad-mercado', 'autoridad-politica', 'economico', 'territorial'];
  const facetas = facetasOrdenadas(resultado, etiquetas)
    .filter((faceta) => destacadas.includes(faceta[0]))
    .slice(0, 4);
  facetas.forEach((faceta, indice) => {
    const eje = etiquetas.ejes.get(faceta[0]);
    const x = 70 + (indice % 2) * 300;
    const y = 250 + Math.floor(indice / 2) * 115;
    contexto.fillStyle = COLORES.tinta;
    contexto.font = '700 18px Arial, sans-serif';
    contexto.fillText(eje?.nombre ?? faceta[0], x, y);
    dibujarBarraEje(contexto, x, y + 22, 250, faceta[1]);
    contexto.fillStyle = COLORES.suave;
    contexto.font = '400 17px Arial, sans-serif';
    contexto.fillText(valorEje(faceta[1]), x, y + 63);
  });

  contexto.strokeStyle = COLORES.filete;
  contexto.beginPath();
  contexto.moveTo(690, 205);
  contexto.lineTo(690, 510);
  contexto.stroke();
  contexto.fillStyle = COLORES.tinta;
  contexto.font = '700 24px Georgia, serif';
  contexto.fillText('Mayores afinidades', 735, 235);
  contexto.font = '700 21px Arial, sans-serif';
  // Cobertura comparable primero: el orden de cable del snapshot no es el visible.
  const afinidades = ordenarPartidosParaVista(resultado.p).slice(0, 3).map((partido) => ({
    partido,
    lineas: envolver(
      contexto,
      etiquetas.partidos.get(partido[0]) ?? partido[0],
      235,
      2,
    ),
  }));
  const filas = distribuirFilasResumen(afinidades.map(({ lineas }) => lineas.length));
  afinidades.forEach(({ partido, lineas }, indice) => {
    const fila = filas[indice];
    if (!fila) return;
    contexto.fillStyle = COLORES.acento;
    contexto.font = '700 25px Georgia, serif';
    contexto.fillText(`${indice + 1}.`, 735, fila.nombreY);
    contexto.fillStyle = COLORES.tinta;
    contexto.font = '700 21px Arial, sans-serif';
    lineas.forEach((linea, lineaIndice) =>
      contexto.fillText(
        linea,
        780,
        fila.nombreY + lineaIndice * INTERLINEADO_NOMBRE_RESUMEN,
      ),
    );
    contexto.fillStyle = COLORES.tinta;
    contexto.font = '700 25px Georgia, serif';
    contexto.textAlign = 'right';
    contexto.fillText(porcentaje(partido[1]), 1_120, fila.nombreY);
    contexto.textAlign = 'left';
    contexto.fillStyle = COLORES.suave;
    contexto.font = '400 15px Arial, sans-serif';
    contexto.fillText(
      `${partido[3]} ítems · cobertura ${Math.round(partido[2] / 10)} %`,
      780,
      fila.metadatosY,
    );
  });
  pie(contexto, ancho, alto);
  return lienzo;
}

function degradadoBrujula(contexto: CanvasRenderingContext2D, x: number, y: number, lado: number) {
  contexto.fillStyle = COLORES.superficie;
  contexto.fillRect(x, y, lado, lado);
  const esquinas: Array<[number, number, string]> = [
    [x, y, COLORES.rojo],
    [x + lado, y, COLORES.azul],
    [x, y + lado, COLORES.verde],
    [x + lado, y + lado, COLORES.morado],
  ];
  for (const [cx, cy, color] of esquinas) {
    const gradiente = contexto.createRadialGradient(cx, cy, 0, cx, cy, lado * 1.15);
    gradiente.addColorStop(0, `${color}aa`);
    gradiente.addColorStop(1, `${color}00`);
    contexto.fillStyle = gradiente;
    contexto.fillRect(x, y, lado, lado);
  }
}

function dibujarBrujula(
  resultado: ResultadoCompartidoV1,
  etiquetas: EtiquetasParaCaptura,
): HTMLCanvasElement {
  const { ancho, alto } = DIMENSIONES.brujula;
  const [lienzo, contexto] = crearLienzo(ancho, alto);
  fondo(contexto, ancho, alto);
  cabecera(contexto, ancho, 'Brújula política');
  contexto.fillStyle = COLORES.suave;
  contexto.font = '400 17px Arial, sans-serif';
  contexto.fillText(etiquetas.contexto, 180, 142);
  const lado = 720;
  const x = 180;
  const y = 170;
  degradadoBrujula(contexto, x, y, lado);
  contexto.strokeStyle = COLORES.tinta;
  contexto.lineWidth = 3;
  contexto.strokeRect(x, y, lado, lado);
  contexto.globalAlpha = 0.45;
  contexto.beginPath();
  contexto.moveTo(x + lado / 2, y);
  contexto.lineTo(x + lado / 2, y + lado);
  contexto.moveTo(x, y + lado / 2);
  contexto.lineTo(x + lado, y + lado / 2);
  contexto.stroke();
  contexto.globalAlpha = 1;
  const propiedad = resultado.f.find((faceta) => faceta[0] === 'propiedad-mercado')?.[1];
  const poder = resultado.f.find((faceta) => faceta[0] === 'autoridad-politica')?.[1];
  if (typeof propiedad === 'number' && typeof poder === 'number') {
    const px = x + ((propiedad + 1_000) / 2_000) * lado;
    const py = y + lado - ((poder + 1_000) / 2_000) * lado;
    contexto.beginPath();
    contexto.arc(px, py, 22, 0, Math.PI * 2);
    contexto.fillStyle = COLORES.acento;
    contexto.fill();
    contexto.lineWidth = 8;
    contexto.strokeStyle = COLORES.superficie;
    contexto.stroke();
    contexto.fillStyle = COLORES.tinta;
    contexto.font = '700 22px Arial, sans-serif';
    contexto.fillText('Tu posición compartida', Math.min(px + 30, 760), Math.max(py - 15, 205));
  } else {
    contexto.fillStyle = COLORES.tinta;
    contexto.font = '700 28px Georgia, serif';
    contexto.textAlign = 'center';
    contexto.fillText('Evidencia insuficiente para este plano', ancho / 2, alto / 2);
    contexto.textAlign = 'left';
  }
  contexto.fillStyle = COLORES.suave;
  contexto.font = '400 17px Arial, sans-serif';
  contexto.textAlign = 'center';
  contexto.fillText('Propiedad social y cooperativa', x + 120, y + lado + 35);
  contexto.fillText('Propiedad privada y mercado', x + lado - 120, y + lado + 35);
  contexto.save();
  contexto.translate(x - 35, y + lado / 2);
  contexto.rotate(-Math.PI / 2);
  contexto.fillText('Poder distribuido ←  Poder concentrado', 0, 0);
  contexto.restore();
  contexto.textAlign = 'left';
  pie(contexto, ancho, alto);
  return lienzo;
}

function dibujarAfinidades(
  resultado: ResultadoCompartidoV1,
  etiquetas: EtiquetasParaCaptura,
): HTMLCanvasElement {
  const { ancho, alto } = DIMENSIONES.afinidades;
  const [lienzo, contexto] = crearLienzo(ancho, alto);
  fondo(contexto, ancho, alto);
  cabecera(contexto, ancho, 'Afinidades electorales');
  contexto.fillStyle = COLORES.tinta;
  contexto.font = '700 48px Georgia, serif';
  contexto.fillText('Partidos más próximos', 70, 155);
  contexto.fillStyle = COLORES.suave;
  contexto.font = '400 20px Arial, sans-serif';
  contexto.fillText(`${etiquetas.contexto} · cobertura comparable primero`, 70, 194);
  ordenarPartidosParaVista(resultado.p).slice(0, 5).forEach((partido, indice) => {
    const y = 245 + indice * 188;
    redondearRectangulo(contexto, 70, y, 940, 155, 10);
    contexto.fillStyle = COLORES.superficie;
    contexto.fill();
    contexto.strokeStyle = COLORES.filete;
    contexto.stroke();
    contexto.fillStyle = COLORES.acento;
    contexto.font = '700 34px Georgia, serif';
    contexto.fillText(`${indice + 1}.`, 100, y + 54);
    contexto.fillStyle = COLORES.tinta;
    contexto.font = '700 26px Arial, sans-serif';
    textoEnLineas(
      contexto,
      etiquetas.partidos.get(partido[0]) ?? partido[0],
      165,
      y + 50,
      520,
      30,
      2,
    );
    contexto.textAlign = 'right';
    contexto.font = '700 37px Georgia, serif';
    contexto.fillText(porcentaje(partido[1]), 970, y + 58);
    contexto.textAlign = 'left';
    contexto.fillStyle = COLORES.suave;
    contexto.font = '400 18px Arial, sans-serif';
    contexto.fillText(
      `${partido[3]} ítems · cobertura ${Math.round(partido[2] / 10)} %${partido[4] ? ' · cobertura baja' : ''}`,
      165,
      y + 114,
    );
  });
  pie(contexto, ancho, alto);
  return lienzo;
}

function dibujarFacetas(
  resultado: ResultadoCompartidoV1,
  etiquetas: EtiquetasParaCaptura,
  pagina: number,
): HTMLCanvasElement {
  const { ancho, alto } = DIMENSIONES.facetas;
  const [lienzo, contexto] = crearLienzo(ancho, alto);
  fondo(contexto, ancho, alto);
  const facetas = facetasOrdenadas(resultado, etiquetas);
  const paginas = numeroPaginasFacetas(facetas.length);
  const paginaSegura = Math.max(0, Math.min(paginas - 1, Math.floor(pagina)));
  const visibles = facetas.slice(
    paginaSegura * FACETAS_POR_CAPTURA,
    (paginaSegura + 1) * FACETAS_POR_CAPTURA,
  );
  cabecera(contexto, ancho, `Facetas ${paginaSegura + 1}/${paginas}`);
  contexto.fillStyle = COLORES.tinta;
  contexto.font = '700 48px Georgia, serif';
  contexto.fillText('Perfil por facetas', 70, 155);
  visibles.forEach((faceta, indice) => {
    const y = 220 + indice * 145;
    const eje = etiquetas.ejes.get(faceta[0]);
    contexto.fillStyle = COLORES.tinta;
    contexto.font = '700 23px Arial, sans-serif';
    contexto.fillText(eje?.nombre ?? faceta[0], 70, y);
    contexto.textAlign = 'right';
    contexto.font = '700 24px Georgia, serif';
    contexto.fillText(valorEje(faceta[1]), 1_010, y);
    contexto.textAlign = 'left';
    dibujarBarraEje(contexto, 70, y + 25, 940, faceta[1]);
    contexto.fillStyle = COLORES.suave;
    contexto.font = '400 16px Arial, sans-serif';
    contexto.fillText(eje?.poloNegativo ?? 'Polo negativo', 70, y + 70);
    contexto.textAlign = 'right';
    contexto.fillText(eje?.poloPositivo ?? 'Polo positivo', 1_010, y + 70);
    contexto.textAlign = 'left';
    contexto.fillText(
      `${faceta[3]} ítems · cobertura ${Math.round(faceta[2] / 10)} %${faceta[4] ? '' : ' · provisional'}`,
      70,
      y + 101,
    );
  });
  pie(contexto, ancho, alto);
  return lienzo;
}

function aPng(lienzo: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolver, rechazar) => {
    lienzo.toBlob((blob) => {
      if (blob) resolver(blob);
      else rechazar(new Error('No se ha podido codificar la captura PNG.'));
    }, 'image/png');
  });
}

export async function generarCapturaResultado(
  resultado: ResultadoCompartidoV1,
  etiquetas: EtiquetasParaCaptura,
  opcion: OpcionCaptura,
): Promise<Blob> {
  const lienzo =
    opcion.tipo === 'resumen'
      ? dibujarResumen(resultado, etiquetas)
      : opcion.tipo === 'brujula'
        ? dibujarBrujula(resultado, etiquetas)
        : opcion.tipo === 'afinidades'
          ? dibujarAfinidades(resultado, etiquetas)
          : dibujarFacetas(resultado, etiquetas, opcion.paginaFacetas ?? 0);
  return aPng(lienzo);
}
