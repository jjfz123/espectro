#!/usr/bin/env node

/**
 * Regenera el anexo nominal de candidaturas desde los JSON validados.
 *
 * El anexo es deliberadamente mecánico: identifica cada papeleta incluida y
 * permite cerrar por separado su identidad y relación con perfiles. No crea
 * ni hereda posiciones políticas.
 */
import { existsSync, readFileSync, readdirSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const directorio = join(raiz, 'data/convocatorias');
const destino = join(raiz, 'docs/TODO-CANDIDATURAS.md');
const estadosExistentes = existsSync(destino)
  ? new Map(
      [...readFileSync(destino, 'utf8').matchAll(/^- \[([ x])\] `([^`]+)` —/gmu)].map(
        (coincidencia) => [coincidencia[2], coincidencia[1]],
      ),
    )
  : new Map();
const convocatorias = readdirSync(directorio)
  .filter((fichero) => fichero.endsWith('.json') && !fichero.startsWith('_'))
  .sort()
  .map((fichero) => JSON.parse(readFileSync(join(directorio, fichero), 'utf8')));

const escapar = (texto) => String(texto).replaceAll('`', '´').replaceAll('\n', ' ');
const porcentaje = (valor) =>
  typeof valor === 'number'
    ? `${valor.toLocaleString('es-ES', { maximumFractionDigits: 6 })} %`
    : 'sin porcentaje';

const lineas = [
  '# TODO nominal de candidaturas electorales',
  '',
  'Anexo generado desde `data/convocatorias`. Una casilla solo se cierra cuando la identidad de la papeleta, su inclusión y la relación —o ausencia de relación— con perfiles políticos han sido auditadas. Enlazar un perfil nunca hereda posiciones entre coaliciones, componentes u organizaciones territoriales.',
  '',
];

let total = 0;
for (const convocatoria of convocatorias) {
  lineas.push(`## ${escapar(convocatoria.nombre)} (\`${convocatoria.id}\`)`, '');
  for (const candidatura of convocatoria.candidaturas) {
    total += 1;
    const relaciones = (candidatura.perfilRelaciones ?? []).map(
      (relacion) => `\`${relacion.perfilId}\` (${relacion.relacion})`,
    );
    const tratamiento = relaciones.length
      ? `perfiles: ${relaciones.join(', ')}`
      : 'sin perfil enlazado; inventariada sin datos políticos';
    lineas.push(
      `- [${estadosExistentes.get(`${convocatoria.id}|${candidatura.id}`) ?? ' '}] \`${convocatoria.id}|${candidatura.id}\` — ${escapar(candidatura.nombre)} — ${porcentaje(candidatura.porcentaje)} — ${tratamiento}; inclusión: ${candidatura.motivoInclusion}.`,
    );
  }
  lineas.push('');
}

lineas.splice(3, 0, `**Total canónico:** ${total} candidaturas en ${convocatorias.length} convocatorias.`, '');
const temporal = `${destino}.tmp`;
writeFileSync(temporal, `${lineas.join('\n')}\n`);
renameSync(temporal, destino);
console.log(`✓ Anexo generado: ${total} candidaturas en ${convocatorias.length} convocatorias.`);
