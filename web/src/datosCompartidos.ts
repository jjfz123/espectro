/**
 * Índice ligero para el visor de enlaces compartidos. Evita que una persona
 * receptora descargue posiciones, fuentes y convocatorias solo para resolver
 * como máximo cinco nombres. Una prueba contrasta esta proyección con los JSON
 * canónicos para que cualquier alta o cambio de nombre obligue a actualizarla.
 */
export interface PartidoCompartible {
  id: string;
  nombre: string;
  siglas?: string;
}

export const PARTIDOS_COMPARTIBLES: readonly PartidoCompartible[] = [
  { id: 'adelante-andalucia', nombre: 'Adelante Andalucía', siglas: 'AA' },
  { id: 'alianca-catalana', nombre: 'Aliança Catalana', siglas: 'AC' },
  { id: 'alianza-futurista', nombre: 'Alianza Futurista', siglas: 'ALFA' },
  { id: 'alianza-verde', nombre: 'Alianza Verde', siglas: 'AV' },
  { id: 'aragon-existe', nombre: 'Aragón Existe', siglas: 'AE' },
  { id: 'bng', nombre: 'Bloque Nacionalista Galego', siglas: 'BNG' },
  { id: 'chunta-aragonesista', nombre: 'Chunta Aragonesista', siglas: 'CHA' },
  { id: 'ciudadanos', nombre: 'Ciudadanos-Partido de la Ciudadanía', siglas: 'Cs' },
  { id: 'coalicion-canaria', nombre: 'Coalición Canaria', siglas: 'CCa' },
  { id: 'coalicion-existe', nombre: 'Coalición Existe (Aragón Existe – Teruel Existe)', siglas: 'EXISTE' },
  { id: 'coalicion-por-el-bierzo', nombre: 'Coalición por El Bierzo', siglas: 'CB' },
  { id: 'compromis', nombre: 'Compromís', siglas: 'Compromís' },
  { id: 'comunion-tradicionalista-carlista', nombre: 'Comunión Tradicionalista Carlista', siglas: 'CTC' },
  { id: 'comunistes-de-catalunya', nombre: 'Comunistes de Catalunya', siglas: 'Comunistes' },
  { id: 'crt', nombre: 'Corriente Revolucionaria de Trabajadores y Trabajadoras', siglas: 'CRT' },
  { id: 'cup', nombre: "Candidatura d'Unitat Popular", siglas: 'CUP' },
  { id: 'democracia-nacional', nombre: 'Democracia Nacional', siglas: 'DN' },
  { id: 'eaj-pnv', nombre: 'Euzko Alderdi Jeltzalea-Partido Nacionalista Vasco', siglas: 'EAJ-PNV' },
  { id: 'eh-bildu', nombre: 'Euskal Herria Bildu', siglas: 'EH Bildu' },
  { id: 'el-bierzo-existe', nombre: 'El Bierzo Existe', siglas: 'BEX' },
  { id: 'el-pi', nombre: 'El Pi – Proposta per les Illes', siglas: 'El Pi' },
  { id: 'erc', nombre: 'Esquerra Republicana de Catalunya', siglas: 'ERC' },
  { id: 'escanos-en-blanco', nombre: 'Escaños en Blanco', siglas: 'EB' },
  { id: 'espana-2000', nombre: 'España 2000', siglas: 'E-2000' },
  { id: 'fe-jons', nombre: 'Falange Española de las JONS', siglas: 'FE-JONS' },
  { id: 'frente-obrero', nombre: 'Frente Obrero', siglas: 'FO' },
  { id: 'geroa-bai', nombre: 'Geroa Bai' },
  { id: 'iu', nombre: 'Izquierda Unida', siglas: 'IU' },
  { id: 'izquierda-espanola', nombre: 'Izquierda Española', siglas: 'IZQESP' },
  { id: 'junts', nombre: 'Junts per Catalunya', siglas: 'Junts' },
  { id: 'mas-madrid', nombre: 'Más Madrid', siglas: 'MM' },
  { id: 'movimiento-sumar', nombre: 'Movimiento Sumar', siglas: 'MS' },
  { id: 'nacion-andaluza', nombre: 'Nación Andaluza', siglas: 'N.A.' },
  { id: 'noviembre-nacional', nombre: 'Noviembre Nacional', siglas: 'NN' },
  { id: 'nueva-canarias', nombre: 'Nueva Canarias-Bloque Canarista', siglas: 'NC-bc' },
  { id: 'p-lib', nombre: 'Partido Libertario', siglas: 'P-LIB' },
  { id: 'pacma', nombre: 'Partido Animalista con el Medio Ambiente', siglas: 'PACMA' },
  { id: 'partido-carlista', nombre: 'Partido Carlista', siglas: 'PC' },
  { id: 'partido-del-bierzo', nombre: 'Partido de El Bierzo', siglas: 'PB' },
  { id: 'pce-ml', nombre: 'Partido Comunista de España (marxista-leninista)', siglas: 'PCE(m-l)' },
  { id: 'pce', nombre: 'Partido Comunista de España', siglas: 'PCE' },
  { id: 'pcoe', nombre: 'Partido Comunista Obrero Español', siglas: 'PCOE' },
  { id: 'pcpc', nombre: 'Partit Comunista del Poble de Catalunya', siglas: 'PCPC' },
  { id: 'pcpe', nombre: 'Partido Comunista de los Pueblos de España', siglas: 'PCPE' },
  { id: 'pcte', nombre: 'Partido Comunista de los Trabajadores de España', siglas: 'PCTE' },
  { id: 'pdecat', nombre: 'Partit Demòcrata Europeu Català', siglas: 'PDeCAT' },
  { id: 'podemos', nombre: 'Podemos', siglas: 'PODEMOS' },
  { id: 'por-andalucia', nombre: 'Por Andalucía', siglas: 'Por And.' },
  { id: 'por-avila', nombre: 'Por Ávila', siglas: 'XAV' },
  { id: 'posi', nombre: 'Partido Obrero Socialista Internacionalista', siglas: 'POSI' },
  { id: 'pp', nombre: 'Partido Popular', siglas: 'PP' },
  { id: 'prepal', nombre: 'Partido Regionalista del País Leonés', siglas: 'PREPAL' },
  { id: 'psoe', nombre: 'Partido Socialista Obrero Español', siglas: 'PSOE' },
  { id: 'psuc-viu', nombre: 'Partit Socialista Unificat de Catalunya Viu', siglas: 'PSUC Viu' },
  { id: 'pum-j', nombre: 'Por Un Mundo Más Justo', siglas: 'PUM+J' },
  { id: 'recortes-cero', nombre: 'Recortes Cero', siglas: 'RECORTES CERO' },
  { id: 'salf', nombre: 'Se Acabó La Fiesta', siglas: 'SALF' },
  { id: 'soria-ya', nombre: 'Soria ¡YA!', siglas: 'SY' },
  { id: 'teruel-existe', nombre: 'Teruel Existe', siglas: 'TE' },
  { id: 'uce', nombre: 'Unificación Comunista de España', siglas: 'UCE' },
  { id: 'upg', nombre: 'Unión do Povo Galego', siglas: 'UPG' },
  { id: 'upl', nombre: 'Unión del Pueblo Leonés', siglas: 'UPL' },
  { id: 'upn', nombre: 'Unión del Pueblo Navarro', siglas: 'UPN' },
  { id: 'verdes-equo', nombre: 'Verdes Equo (marca política Partido Verde)', siglas: 'VERDES EQUO' },
  { id: 'volt-espana', nombre: 'Volt España', siglas: 'VOLT' },
  { id: 'vox', nombre: 'VOX', siglas: 'VOX' },
] as const;

export function nombrePartidoCompartible(partido: PartidoCompartible): string {
  return partido.siglas ? `${partido.nombre} (${partido.siglas})` : partido.nombre;
}
