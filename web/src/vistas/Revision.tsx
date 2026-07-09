import type { Item, Valor } from '@engine';
import { etiquetaValor, MODULO_POR_ID, secuenciaItems } from '../datos';
import type { Accion, Estado } from '../estado';

interface Props {
  estado: Estado;
  despachar: (accion: Accion) => void;
}

interface GrupoRevision {
  modulo: string;
  items: Item[];
}

function agrupar(items: Item[]): GrupoRevision[] {
  const grupos: GrupoRevision[] = [];
  for (const item of items) {
    const ultimo = grupos.at(-1);
    if (ultimo?.modulo === item.modulo) ultimo.items.push(item);
    else grupos.push({ modulo: item.modulo, items: [item] });
  }
  return grupos;
}

function textoRespuesta(valor: Valor | null | undefined): string {
  if (valor === undefined) return 'Sin responder';
  if (valor === null) return 'Sin opinión';
  return etiquetaValor(valor);
}

export function Revision({ estado, despachar }: Props) {
  const secuencia = secuenciaItems(estado.modulosActivos, estado.respuestas);
  const grupos = agrupar(secuencia);
  const total = secuencia.length;
  const conOpinion = secuencia.filter((item) => estado.respuestas[item.id] != null).length;

  return (
    <div className="contenedor contenedor--ancho">
      <p className="kicker">Revisión</p>
      <h1 className="titular" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 2.4rem)' }}>
        Revisa tus respuestas
      </h1>
      <p className="entradilla" style={{ fontSize: '1.05rem' }}>
        Puedes corregir cualquier respuesta sin repetir el cuestionario. Los cambios se guardan
        en este navegador y los resultados se recalculan al volver.
      </p>
      <p className="nota-al-margen revision-resumen">
        {total} ítems · {conOpinion} posiciones expresadas · {total - conOpinion} sin opinión
      </p>

      <div className="revision-grupos">
        {grupos.map((grupo) => {
          const modulo = MODULO_POR_ID.get(grupo.modulo);
          return (
            <section className="revision-grupo" key={grupo.modulo}>
              <h2>{modulo?.nombre ?? grupo.modulo}</h2>
              <ol className="revision-lista">
                {grupo.items.map((item) => {
                  const valor = estado.respuestas[item.id];
                  return (
                    <li key={item.id}>
                      <div>
                        <p className="revision-pregunta">{item.texto}</p>
                        <p className="revision-valor">
                          {textoRespuesta(valor)}
                          {estado.importantes[item.id] ? (
                            <span className="insignia">importa el doble</span>
                          ) : null}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="boton boton--terciario"
                        onClick={() => despachar({ tipo: 'editar-respuesta', itemId: item.id })}
                      >
                        Editar
                      </button>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>

      <div className="acciones">
        <button
          type="button"
          className="boton"
          onClick={() => despachar({ tipo: 'ir-a-resultados' })}
        >
          Volver a los resultados
        </button>
      </div>
    </div>
  );
}
