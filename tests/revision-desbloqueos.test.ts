import { describe, expect, it } from 'vitest';
import {
  ESTADO_INICIAL,
  cargarEstado,
  modulosRecienDesbloqueados,
  ofertaVigente,
  reductor,
  type Estado,
} from '../web/src/estado.js';
import { secuenciaItems } from '../web/src/datos.js';
import type { Valor } from '../src/engine/index.js';

/**
 * Casilla del TODO «La ruta de Revisión re-evalúa desbloqueos al editar
 * respuestas que cruzan umbrales»: la edición desde revisión que mueve el
 * perfil por encima de un umbral dispara la oferta ciega al volver; rechazar
 * devuelve a revisión, aceptar lleva a las preguntas nuevas y el libro de
 * ofrecidos impide bucles de confirmación.
 */

const MODULO_ACTIVO = 'democracia-instituciones';

/** Responde todo (núcleo + módulo activo) con econ a la izquierda salvo `neutros` ítems económicos. */
function respuestasConNeutros(neutros: number): {
  respuestas: Record<string, Valor | null>;
  neutralizados: string[];
} {
  const respuestas: Record<string, Valor | null> = {};
  const neutralizados: string[] = [];
  for (let vuelta = 0; vuelta < 8; vuelta += 1) {
    const visibles = secuenciaItems([MODULO_ACTIVO], respuestas).filter(
      (item) => !(item.id in respuestas),
    );
    if (visibles.length === 0) break;
    for (const item of visibles) {
      const cargaEco = item.ejes.find((c) => c.eje === 'economico' && c.carga !== 0);
      if (cargaEco && neutralizados.length < neutros) {
        neutralizados.push(item.id);
        respuestas[item.id] = 0;
      } else if (cargaEco) {
        respuestas[item.id] = (cargaEco.carga > 0 ? -2 : 2) as Valor;
      } else {
        respuestas[item.id] = 0;
      }
    }
  }
  return { respuestas, neutralizados };
}

function estadoBase(respuestas: Record<string, Valor | null>): Estado {
  const base: Estado = {
    ...ESTADO_INICIAL,
    modo: 'completo',
    fase: 'revision',
    modulosActivos: [MODULO_ACTIVO],
    modulosOfrecidos: [],
    respuestas,
  };
  // Simula el paso real por confirmar-módulos: lo ya desbloqueado con este
  // perfil queda anotado y solo un desbloqueo NUEVO puede disparar oferta.
  return { ...base, modulosOfrecidos: modulosRecienDesbloqueados(base) };
}

/**
 * Busca el estado «justo bajo el umbral»: con `k` ítems económicos en 0 el
 * perfil ya no desbloquea nada nuevo, pero editar UNO de esos ítems al
 * extremo vuelve a cruzar el umbral. Devuelve null si el banco no ofrece esa
 * frontera (el test de premisa lo detectaría).
 */
function estadoJustoBajoUmbral(): { estado: Estado; pivote: string } | null {
  for (let k = 1; k <= 40; k += 1) {
    const { respuestas, neutralizados } = respuestasConNeutros(k);
    const estado = estadoBase(respuestas);
    if (modulosRecienDesbloqueados(estado).length > 0) continue;
    for (const pivote of neutralizados) {
      const editadas = { ...respuestas, [pivote]: -2 as Valor };
      const trasEdicion: Estado = { ...estado, respuestas: editadas };
      if (modulosRecienDesbloqueados(trasEdicion).length > 0) {
        return { estado, pivote };
      }
    }
  }
  return null;
}

function editarDesdeRevision(estado: Estado, itemId: string, valor: Valor): Estado {
  const secuencia = secuenciaItems(estado.modulosActivos, estado.respuestas);
  const indice = secuencia.findIndex((item) => item.id === itemId);
  expect(indice).toBeGreaterThanOrEqual(0);
  const editando: Estado = { ...estado, fase: 'cuestionario', indice, editando: true };
  const respondido = reductor(editando, { tipo: 'responder', itemId, valor });
  return reductor(respondido, { tipo: 'siguiente' });
}

describe('revisión re-evalúa desbloqueos al editar', () => {
  const construccion = estadoJustoBajoUmbral();

  it('existe una frontera de umbral editable desde revisión (premisa del contrato)', () => {
    expect(construccion).not.toBeNull();
  });

  it('una edición que cruza el umbral dispara la oferta ciega al volver', () => {
    if (!construccion) return;
    const tras = editarDesdeRevision(construccion.estado, construccion.pivote, -2);
    expect(tras.fase).toBe('oferta-modulos');
    expect(tras.ofertaDesdeRevision).toBe(true);
    expect(ofertaVigente(tras).length).toBeGreaterThan(0);
  });

  it('una edición que NO cruza el umbral vuelve directa a revisión', () => {
    if (!construccion) return;
    const tras = editarDesdeRevision(construccion.estado, construccion.pivote, 0);
    expect(tras.fase).toBe('revision');
    expect(tras.editando).toBe(false);
    expect(tras.ofertaDesdeRevision).toBe(false);
  });

  it('rechazar devuelve a revisión, anota lo ofrecido y no vuelve a interrumpir al reeditar', () => {
    if (!construccion) return;
    const enOferta = editarDesdeRevision(construccion.estado, construccion.pivote, -2);
    const ofrecidos = ofertaVigente(enOferta);
    const tras = reductor(enOferta, { tipo: 'rechazar-oferta-modulos' });
    expect(tras.fase).toBe('revision');
    expect(tras.ofertaDesdeRevision).toBe(false);
    expect(tras.modulosActivos).toEqual(construccion.estado.modulosActivos);
    for (const id of ofrecidos) expect(tras.modulosOfrecidos).toContain(id);
    // Reeditar el mismo ítem al mismo valor no re-ofrece: el libro manda.
    const reeditado = editarDesdeRevision(tras, construccion.pivote, -2);
    expect(reeditado.fase).toBe('revision');
  });

  it('aceptar activa los bloques y lleva a la primera pregunta nueva pendiente', () => {
    if (!construccion) return;
    const enOferta = editarDesdeRevision(construccion.estado, construccion.pivote, -2);
    const nuevos = ofertaVigente(enOferta);
    const tras = reductor(enOferta, { tipo: 'aceptar-oferta-modulos' });
    expect(tras.fase).toBe('cuestionario');
    expect(tras.ofertaDesdeRevision).toBe(false);
    for (const id of nuevos) expect(tras.modulosActivos).toContain(id);
    const secuencia = secuenciaItems(tras.modulosActivos, tras.respuestas);
    const itemActual = secuencia[tras.indice];
    expect(itemActual !== undefined && itemActual.id in tras.respuestas).toBe(false);
  });

  it('la marca de origen sobrevive a la recarga (sanitizador)', () => {
    if (!construccion) return;
    const enOferta = editarDesdeRevision(construccion.estado, construccion.pivote, -2);
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
    const contenido = new Map<string, string>([
      [
        'espectro.v1',
        JSON.stringify({
          ...enOferta,
          guardadoEn: new Date().toISOString(),
          versionInstrumento: ESTADO_INICIAL.versionInstrumento,
        }),
      ],
    ]);
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: {
        getItem: (k: string) => contenido.get(k) ?? null,
        setItem: (k: string, v: string) => contenido.set(k, v),
        removeItem: (k: string) => contenido.delete(k),
        clear: () => contenido.clear(),
        key: () => null,
        length: 0,
      } as Storage,
    });
    try {
      const cargado = cargarEstado();
      expect(cargado.ofertaDesdeRevision).toBe(true);
    } finally {
      if (descriptor) Object.defineProperty(globalThis, 'localStorage', descriptor);
      else delete (globalThis as { localStorage?: Storage }).localStorage;
    }
  });
});
