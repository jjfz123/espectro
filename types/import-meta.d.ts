/**
 * Declaración mínima para que los tests del motor puedan importar la capa de
 * datos web sin obligar al paquete raíz a depender de Vite. La aplicación usa
 * la declaración completa de `vite/client` desde `web/tsconfig.json`.
 */
interface ImportMeta {
  glob(
    patron: string | readonly string[],
    opciones?: Readonly<Record<string, unknown>>,
  ): Record<string, unknown>;
}
