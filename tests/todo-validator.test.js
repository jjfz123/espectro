import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { validarInventario } from '../scripts/verificar-todo-mapeo.mjs';

const leer = (ruta) => readFileSync(new URL(`../${ruta}`, import.meta.url), 'utf8');
const base = {
  todo: leer('docs/TODO-MAPEO-EXHAUSTIVO.md'),
  todoCandidaturas: leer('docs/TODO-CANDIDATURAS.md'),
  taxonomia: leer('docs/investigacion/TAXONOMIA-MAPA-IDEOLOGIAS.md'),
  partidos: readdirSync(new URL('../data/partidos', import.meta.url))
    .filter((fichero) => fichero.endsWith('.json') && !fichero.startsWith('_'))
    .map((fichero) => JSON.parse(leer(`data/partidos/${fichero}`))),
  sindicatos: readdirSync(new URL('../data/sindicatos', import.meta.url))
    .filter((fichero) => fichero.endsWith('.json') && !fichero.startsWith('_'))
    .map((fichero) => JSON.parse(leer(`data/sindicatos/${fichero}`))),
  convocatorias: readdirSync(new URL('../data/convocatorias', import.meta.url))
    .filter((fichero) => fichero.endsWith('.json') && !fichero.startsWith('_'))
    .sort()
    .map((fichero) => JSON.parse(leer(`data/convocatorias/${fichero}`))),
  rapido: JSON.parse(leer('data/rapido.json')),
  manifiesto: JSON.parse(leer('data/inventario-canonico-mapeo.json')),
  atlas: JSON.parse(leer('data/mapa-ideologias.json')),
};

const validar = (cambios = {}) => validarInventario({ ...base, ...cambios });

describe('inventario TODO adversarial', () => {
  it('acepta la estructura canónica aunque el trabajo siga abierto', () => {
    expect(validar().errores).toEqual([]);
  });

  it('detecta borrar la misma ideología de taxonomía y TODO', () => {
    const filaTax = /^\|\s*1\s*\|.*$/mu;
    const filaTodo = /^- \[[ x]\] 001\..*$/mu;
    const resultado = validar({
      taxonomia: base.taxonomia.replace(filaTax, ''),
      todo: base.todo.replace(filaTodo, ''),
    });
    expect(resultado.errores.join('\n')).toMatch(/manifiesto|177\/178/u);
  });

  it('detecta borrar el mismo partido de datos y TODO', () => {
    const partido = base.partidos.find((candidato) => candidato.id === 'bng');
    const resultado = validar({
      partidos: base.partidos.filter((candidato) => candidato.id !== 'bng'),
      todo: base.todo.replace(/^- \[[ x]\] `bng`.*$/mu, ''),
    });
    expect(partido).toBeDefined();
    expect(resultado.errores.join('\n')).toMatch(/manifiesto|64\/65/u);
  });

  it('detecta duplicados aunque la otra lista conserve una fila', () => {
    const partido = base.partidos.find((candidato) => candidato.id === 'bng');
    const resultado = validar({ partidos: [...base.partidos, partido] });
    expect(resultado.errores.join('\n')).toMatch(/duplicados|66\/65/u);
  });

  it('impide cambiar el banco de posiciones sin actualizar su total contractual', () => {
    const partidos = base.partidos.map((partido) =>
      partido.id === 'bng'
        ? { ...partido, posiciones: Object.fromEntries(Object.entries(partido.posiciones).slice(1)) }
        : partido,
    );
    expect(validar({ partidos }).errores.join('\n')).toMatch(/posiciones partidistas/u);
  });

  it('detecta borrar el mismo sindicato de datos y TODO', () => {
    const resultado = validar({
      sindicatos: base.sindicatos.filter((sindicato) => sindicato.id !== 'cnt'),
      todo: base.todo.replace(/^- \[[ x]\] `cnt`.*$/mu, ''),
    });
    expect(resultado.errores.join('\n')).toMatch(/manifiesto|13\/14/u);
  });

  it('blinda las secciones funcionales del contrato exhaustivo', () => {
    const todo = base.todo.replace(
      '## Modos del cuestionario, continuidad y privacidad de la respuesta',
      '## Modos eliminados',
    );
    expect(validar({ todo }).errores.join('\n')).toMatch(/Modos del cuestionario/u);
  });

  it('detecta borrar una candidatura tanto de datos como del anexo', () => {
    const convocatorias = base.convocatorias.map((convocatoria) =>
      convocatoria.id === 'andalucia-2026-05'
        ? {
            ...convocatoria,
            candidaturas: convocatoria.candidaturas.filter(
              (candidatura) => candidatura.id !== 'and-2026-pp',
            ),
          }
        : convocatoria,
    );
    const todoCandidaturas = base.todoCandidaturas.replace(
      /^- \[[ x]\] `andalucia-2026-05\|and-2026-pp`.*$/mu,
      '',
    );
    const resultado = validar({ convocatorias, todoCandidaturas });
    expect(resultado.errores.join('\n')).toMatch(/manifiesto|322\/323/u);
  });

  it('blinda los 50 ids rápidos, las diez ampliaciones y la criba de 30', () => {
    expect(
      validar({ rapido: { ...base.rapido, ids: base.rapido.ids.slice(1) } }).errores.join('\n'),
    ).toMatch(/rápido|49\/50/u);
    expect(
      validar({
        todo: base.todo.replace(/^- \[[ x]\] `Kuomintangism`.*$/mu, ''),
      }).errores.join('\n'),
    ).toMatch(/criba|29\/30/u);
  });

  it('detecta borrar una tarea funcional aunque no sea una entidad nominal', () => {
    const todo = base.todo.replace(
      /^- \[[ x]\] La primera brújula mantiene.*$/mu,
      '',
    );
    expect(validar({ todo }).errores.join('\n')).toMatch(/contrato funcional|187\/188/u);
  });

  it('detecta ordinal repetido con nombre distinto', () => {
    const taxonomia = base.taxonomia.replace(/^\|\s*2\s*\|/mu, '| 1 |');
    const todo = base.todo.replace(/^- \[[ x]\] 002\./mu, '- [x] 001.');
    const resultado = validar({ taxonomia, todo });
    expect(resultado.errores.join('\n')).toMatch(/ordinales|consecutivos/u);
  });

  it('permite cerrar un perfil explícitamente auditado sin mapa, pero no uno ordinario insuficiente', () => {
    const sinMapa = validar({
      todo: base.todo.replace('- [ ] `aragon-existe`', '- [x] `aragon-existe`'),
      gradosPartidos: new Map(),
    });
    expect(sinMapa.errores.join('\n')).not.toMatch(/aragon-existe/u);

    const ordinario = validar({
      todo: base.todo.replace('- [ ] `bng`', '- [x] `bng`'),
      gradosPartidos: new Map(),
    });
    expect(ordinario.errores.join('\n')).toMatch(/bng/u);
  });

  it('detecta una fila movida fuera de su sección', () => {
    const fila = base.todo.match(/^- \[[ x]\] 001\..*$/mu)?.[0] ?? '';
    const todo = base.todo.replace(fila, '').replace('## Reglas de cierre', `${fila}\n\n## Reglas de cierre`);
    expect(validar({ todo }).errores.join('\n')).toMatch(/177\/178|manifiesto/u);
  });

  it('la puerta de cierre falla mientras haya casillas abiertas', () => {
    const resultado = validarInventario({ ...base, exigirCierre: true });
    expect(resultado.errores.join('\n')).toMatch(/casillas siguen abiertas/u);
  });
});
