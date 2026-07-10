import { useId, useRef, useState } from 'react';
import type { Eje } from '@engine';
import { ayudaEje, nombreLlanoEje, poloLlano } from '../lecturaEjes';

interface Props {
  /** Ejes a explicar, en orden de lectura. */
  ejes: Eje[];
  /** Etiqueta accesible del botón «?». */
  etiqueta?: string;
  /** Rótulo del panel (kicker). */
  titulo?: string;
}

/**
 * Panel de ayuda de los ejes con el mismo patrón que el glosario del
 * cuestionario: botón «?» que despliega un panel con filete. En superficie
 * van los nombres y polos llanos; la jerga politológica («¿qué es GAL-TAN?»)
 * vive solo aquí dentro, como nota de los textos de lecturaEjes.ts.
 */
export function AyudaEjes({ ejes, etiqueta, titulo = 'Qué mide cada eje' }: Props) {
  const idPanel = useId();
  const [abierta, setAbierta] = useState(false);
  const botonRef = useRef<HTMLButtonElement>(null);

  if (ejes.length === 0) return null;
  const nombres = ejes.map((eje) => nombreLlanoEje(eje)).join(', ');

  return (
    <>
      <button
        type="button"
        ref={botonRef}
        className="glosario-marca glosario-marca--mini"
        aria-expanded={abierta}
        aria-controls={idPanel}
        aria-label={etiqueta ?? `Qué mide: ${nombres}`}
        onClick={() => setAbierta((antes) => !antes)}
      >
        <span aria-hidden="true">?</span>
      </button>
      <aside id={idPanel} className="glosario-panel glosario-panel--ejes" hidden={!abierta}>
        <div className="glosario-cabecera">
          <span className="kicker">{titulo}</span>
          <button
            type="button"
            className="glosario-cerrar"
            onClick={() => {
              setAbierta(false);
              botonRef.current?.focus();
            }}
          >
            Cerrar
          </button>
        </div>
        <dl>
          {ejes.map((eje) => (
            <div key={eje.id} className="glosario-entrada">
              <dt>{nombreLlanoEje(eje)}</dt>
              <dd>
                {ayudaEje(eje)}{' '}
                <span className="glosario-polos">
                  Escala: −100 «{poloLlano(eje, 'negativo')}» a +100 «
                  {poloLlano(eje, 'positivo')}».
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </aside>
    </>
  );
}
