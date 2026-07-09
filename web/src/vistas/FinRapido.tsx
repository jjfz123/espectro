import { ITEMS_NUCLEO } from '../datos';
import type { Accion, Estado } from '../estado';

interface Props {
  estado: Estado;
  despachar: (accion: Accion) => void;
}

export function FinRapido({ estado, despachar }: Props) {
  const respondidas = ITEMS_NUCLEO.filter((item) => item.id in estado.respuestas).length;
  const conOpinion = ITEMS_NUCLEO.filter(
    (item) => item.id in estado.respuestas && estado.respuestas[item.id] !== null,
  ).length;

  return (
    <div className="contenedor fin-rapido">
      <p className="kicker">Modo rápido completado</p>
      <h1 className="titular" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
        Ya puedes ver tu perfil provisional
      </h1>
      <p className="entradilla" style={{ fontSize: '1.08rem' }}>
        Has respondido {respondidas} de {ITEMS_NUCLEO.length} preguntas generales
        {conOpinion < respondidas ? ` y has expresado posición en ${conOpinion}` : ''}. El modo
        rápido permite una primera lectura; no cierra las facetas que necesitan más evidencia.
      </p>

      <div className="fin-rapido-aviso" role="status">
        <strong>La incertidumbre seguirá visible.</strong>
        <p>
          El perfil marcará qué facetas son provisionales y cada afinidad mostrará cuántas de tus
          respuestas puede comparar con cada partido. Continuar después no borra ni vuelve a
          preguntarte nada compatible.
        </p>
      </div>

      <div className="acciones fin-rapido-acciones" aria-label="Siguiente paso">
        <button
          type="button"
          className="boton"
          onClick={() => despachar({ tipo: 'ver-perfil-provisional' })}
        >
          Ver perfil provisional
        </button>
        <button
          type="button"
          className="boton boton--secundario"
          onClick={() => despachar({ tipo: 'continuar-exhaustivo' })}
        >
          Continuar al exhaustivo
        </button>
      </div>
      <p className="nota-al-margen">
        El exhaustivo prepara módulos temáticos y territoriales sin revelar tu puntuación mientras
        respondes.
      </p>
    </div>
  );
}
