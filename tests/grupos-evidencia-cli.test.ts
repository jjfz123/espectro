import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const SCRIPT = new URL('../scripts/asignar-grupos-evidencia.mjs', import.meta.url).pathname;
const temporales: string[] = [];

function raizTemporal(): string {
  const raiz = mkdtempSync(join(tmpdir(), 'espectro-grupos-'));
  temporales.push(raiz);
  for (const directorio of ['partidos', 'referencias', 'sindicatos']) {
    mkdirSync(join(raiz, 'data', directorio), { recursive: true });
  }
  return raiz;
}

function posicion(cita: string, grupoEvidencia?: string) {
  return {
    valor: 1,
    justificacion: 'La cita responde de manera directa al contraste documentado.',
    calidadEvidencia: 'alta',
    ...(grupoEvidencia ? { grupoEvidencia } : {}),
    fuente: {
      tipo: 'programa',
      titulo: 'Programa de prueba',
      url: 'https://example.test/programa.pdf',
      consultado: '2026-07-11',
      cita,
    },
  };
}

function escribirPerfil(raiz: string, nombre: string, posiciones: Record<string, object>): string {
  const ruta = join(raiz, 'data', 'partidos', `${nombre}.json`);
  writeFileSync(
    ruta,
    `${JSON.stringify({ id: nombre, nombre, confianza: 'verificada', posiciones }, null, 2)}\n`,
  );
  return ruta;
}

function ejecutar(raiz: string, ...argumentos: string[]): string {
  return execFileSync(process.execPath, [SCRIPT, ...argumentos], {
    encoding: 'utf8',
    env: { ...process.env, ESPECTRO_EVIDENCE_ROOT: raiz },
  });
}

function ejecutarFallido(raiz: string, ...argumentos: string[]) {
  return spawnSync(process.execPath, [SCRIPT, ...argumentos], {
    encoding: 'utf8',
    env: { ...process.env, ESPECTRO_EVIDENCE_ROOT: raiz },
  });
}

afterEach(() => {
  while (temporales.length > 0) rmSync(temporales.pop()!, { recursive: true, force: true });
});

describe('CLI de grupos de evidencia', () => {
  it('cumple check → write → check y la segunda escritura es idéntica', () => {
    const raiz = raizTemporal();
    const cita = 'El control democrático de la propiedad se ejercerá por quienes trabajan.';
    const ruta = escribirPerfil(raiz, 'partido', {
      a: posicion(cita),
      b: posicion(cita),
    });
    const antes = readFileSync(ruta, 'utf8');

    const comprobacion = ejecutarFallido(raiz);
    expect(comprobacion.status).not.toBe(0);
    expect(comprobacion.stderr).toContain('Faltan 2 asignaciones');
    expect(readFileSync(ruta, 'utf8')).toBe(antes);
    expect(ejecutar(raiz, '--write')).toContain('Asignados 2 grupos de evidencia');
    const escrito = readFileSync(ruta, 'utf8');
    const perfil = JSON.parse(escrito) as {
      posiciones: Record<string, { grupoEvidencia: string }>;
    };
    expect(perfil.posiciones.a?.grupoEvidencia).toBe(perfil.posiciones.b?.grupoEvidencia);
    expect(ejecutar(raiz)).toContain('Todos los pasajes citados');
    expect(ejecutar(raiz, '--write')).toContain('Todos los pasajes citados');
    expect(readFileSync(ruta, 'utf8')).toBe(escrito);
  });

  it('un conflicto tardío impide también la escritura válida anterior', () => {
    const raiz = raizTemporal();
    const valida = escribirPerfil(raiz, 'a-valido', {
      a: posicion('La propiedad cooperativa tendrá control democrático y rendición de cuentas.'),
    });
    const conflictiva = escribirPerfil(raiz, 'z-conflicto', {
      a: posicion(
        'La propiedad cooperativa tendrá control democrático y rendición de cuentas.',
        'pasaje-manual-conflictivo',
      ),
      b: posicion(
        'El parlamento elegirá la presidencia por mayoría reforzada y mandato limitado.',
        'pasaje-manual-conflictivo',
      ),
    });
    const antesValida = readFileSync(valida, 'utf8');
    const antesConflictiva = readFileSync(conflictiva, 'utf8');

    const escritura = ejecutarFallido(raiz, '--write');
    expect(escritura.status).not.toBe(0);
    expect(escritura.stderr).toContain('transcripciones inconexas');
    expect(readFileSync(valida, 'utf8')).toBe(antesValida);
    expect(readFileSync(conflictiva, 'utf8')).toBe(antesConflictiva);
  });
});
