import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { calcularEjes } from '../src/engine/index.js';
import type { Eje, Item, Respuesta } from '../src/engine/index.js';
import { ITEM_POR_ID } from '../web/src/datos.js';
import { PARTIDOS } from '../web/src/datosOrganizaciones.js';

const raiz = fileURLToPath(new URL('..', import.meta.url));

describe('marco de referencia del ítem', () => {
  const eje: Eje = {
    id: 'eje-prueba',
    nombre: 'Eje de prueba',
    poloNegativo: 'menos',
    poloPositivo: 'más',
  };

  it('es contexto descriptivo y no cambia la puntuación del motor', () => {
    const base: Item = {
      id: 'sin-marco',
      texto: 'Afirmación de prueba sobre el eje.',
      modulo: 'nucleo',
      ejes: [{ eje: 'eje-prueba', carga: 1 }],
    };
    const conMarco: Item = {
      ...base,
      id: 'con-marco',
      marco: { supuesto: 'sistema-actual', aclaracion: 'Piensa en el marco vigente.' },
    };
    const sinMarco: Respuesta[] = [{ itemId: 'sin-marco', valor: 2 }];
    const respuestaConMarco: Respuesta[] = [{ itemId: 'con-marco', valor: 2 }];

    expect(calcularEjes(respuestaConMarco, [conMarco], [eje])).toEqual(
      calcularEjes(sinMarco, [base], [eje]),
    );
  });

  it('separa monopolio sindical y gestión económica, y declara el supuesto', () => {
    const monopolio = ITEM_POR_ID.get('lab-006');
    expect(monopolio?.marco?.supuesto).toBe('sistema-actual');
    expect(monopolio?.texto).not.toMatch(/gestión económica/i);
    expect(ITEM_POR_ID.get('lab-007')?.marco?.supuesto).toBe('sistema-actual');
    expect(ITEM_POR_ID.get('lab-018')?.marco?.supuesto).toBe('sociedad-deseada');
  });
});

describe('comprensibilidad jurídica', () => {
  it('describe con precisión los vocales judiciales del CGPJ y enlaza el glosario', () => {
    const item = ITEM_POR_ID.get('nuc-001');
    expect(item?.texto).toMatch(/doce vocales judiciales/i);
    expect(item?.terminos).toEqual(
      expect.arrayContaining(['consejo-general-poder-judicial', 'independencia-judicial']),
    );
  });

  it('explica la prisión permanente revisable desde ambos ítems que la usan', () => {
    expect(ITEM_POR_ID.get('soc-006')?.terminos).toContain('prision-permanente-revisable');
    expect(ITEM_POR_ID.get('der-019')?.terminos).toContain('prision-permanente-revisable');
  });
});

describe('doble lectura de partidos', () => {
  it('toda capa base tiene título y descripción', () => {
    for (const partido of PARTIDOS) {
      if (!partido.dobleLectura) continue;
      expect(partido.dobleLectura.etiquetaBase.trim()).not.toBe('');
      expect(partido.dobleLectura.descripcionBase.trim()).not.toBe('');
    }
  });

  it('transporta y renderiza descripcionBase, no solo la conserva en los datos', () => {
    const resultados = readFileSync(join(raiz, 'web/src/vistas/Resultados.tsx'), 'utf8');
    const detalle = readFileSync(join(raiz, 'web/src/componentes/DetallePartido.tsx'), 'utf8');
    expect(resultados).toContain(
      'descripcionBase: partido.dobleLectura.descripcionBase',
    );
    expect(detalle).toContain('{lecturaContraste.descripcionBase}');
  });
});
