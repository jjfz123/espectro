import { describe, expect, it } from 'vitest';
import type { ReferenciaDoctrinal, Respuesta } from '../src/engine';
import { compararReferenciasDoctrinales } from '../src/engine';

function referencia(id: string, publicable: boolean): ReferenciaDoctrinal {
  return {
    id,
    nombre: id,
    tipo: 'referencia-doctrinal',
    definicion: 'Referencia sintética suficientemente larga para comprobar la puerta editorial.',
    confianza: 'verificada',
    version: '1.0',
    revisado: '2026-07-11',
    facetasDefinitorias: ['prueba'],
    advertencia: 'Prueba sintética: no representa una candidatura ni una identidad personal.',
    fuentesMarco: [],
    publicacionAfinidad: {
      publicable,
      motivo: 'La auditoría decide explícitamente si esta referencia puede producir afinidad.',
    },
    reglaPublicacion: { minimoItems: 3, minimoCobertura: 1, umbralAfinidad: 0 },
    posiciones: {
      'eco-001': { valor: 2 },
      'eco-002': { valor: 2 },
      'eco-003': { valor: 2 },
    },
  };
}

describe('veto definitorio', () => {
  function conDefinitoria(): ReferenciaDoctrinal {
    const base = referencia('corporativista', true);
    base.posiciones = {
      'eco-001': { valor: 2 },
      'eco-002': { valor: 2 },
      'dr-014': { valor: 2, definitoria: true },
    };
    return base;
  }

  it('rechazar una pregunta definitoria excluye aunque la media supere el umbral', () => {
    const respuestas: Respuesta[] = [
      { itemId: 'eco-001', valor: 2 },
      { itemId: 'eco-002', valor: 2 },
      { itemId: 'dr-014', valor: -1 },
    ];
    const [resultado] = compararReferenciasDoctrinales(respuestas, [conDefinitoria()]);
    expect(resultado?.definitoriasContradichas).toBe(1);
    expect(resultado?.publicable).toBe(false);
  });

  it('un 0 o coincidir en la definitoria no activa el veto', () => {
    for (const valor of [0, 1, 2] as const) {
      const respuestas: Respuesta[] = [
        { itemId: 'eco-001', valor: 2 },
        { itemId: 'eco-002', valor: 2 },
        { itemId: 'dr-014', valor },
      ];
      const [resultado] = compararReferenciasDoctrinales(respuestas, [conDefinitoria()]);
      expect(resultado?.definitoriasContradichas).toBe(0);
      expect(resultado?.publicable).toBe(true);
    }
  });

  it('las posiciones sin marcar no vetan aunque se contradigan', () => {
    const respuestas: Respuesta[] = [
      { itemId: 'eco-001', valor: -2 },
      { itemId: 'eco-002', valor: 2 },
      { itemId: 'dr-014', valor: 2 },
    ];
    const [resultado] = compararReferenciasDoctrinales(respuestas, [conDefinitoria()]);
    expect(resultado?.definitoriasContradichas).toBe(0);
  });
});

describe('puerta editorial de afinidad doctrinal', () => {
  it('un perfil idéntico no rescata una referencia vetada', () => {
    const respuestas: Respuesta[] = ['eco-001', 'eco-002', 'eco-003'].map((itemId) => ({
      itemId,
      valor: 2,
    }));
    const resultados = compararReferenciasDoctrinales(respuestas, [
      referencia('auditada', true),
      referencia('pendiente', false),
    ]);

    expect(resultados.map(({ entidadId }) => entidadId)).toEqual(['auditada']);
    expect(resultados[0]?.puntuacion).toBe(100);
  });
});
