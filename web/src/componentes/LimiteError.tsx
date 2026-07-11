import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  recuperacion: ReactNode;
}

interface State {
  fallo: boolean;
}

/**
 * Recuperación deliberadamente local: no envía errores ni respuestas a
 * terceros. Cambiar la `key` del componente permite reintentar su contenido.
 */
export class LimiteError extends Component<Props, State> {
  state: State = { fallo: false };

  static getDerivedStateFromError(): State {
    return { fallo: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo): void {
    // Sin telemetría: las respuestas políticas nunca salen del navegador.
  }

  render(): ReactNode {
    return this.state.fallo ? this.props.recuperacion : this.props.children;
  }
}
