# Flujo seguro de subagentes

## Resultado de la investigación

La documentación oficial de Codex recomienda usar subagentes para partes independientes y mantener el hilo raíz centrado en requisitos, decisiones y salida final. Recomienda empezar por trabajo intensivo en lectura —exploración, pruebas, triage y resumen— y extremar cautela cuando varios agentes escriben a la vez, porque aumentan los conflictos y el coste de coordinación. También permite agentes personalizados con instrucciones y esfuerzo distintos en clientes locales compatibles, aunque la sesión colaborativa actual proporciona agentes con la misma capacidad base; aquí diferenciamos **rol, alcance y profundidad de validación**, no fingimos capacidades que la herramienta no expone. Véase [Subagents — documentación oficial de Codex](https://learn.chatgpt.com/codex/agent-configuration/subagents).

Para tareas escritoras paralelas, tanto Codex como Git recomiendan worktrees: cada tarea obtiene su propio checkout y rama, mientras comparte el repositorio Git. Esto evita que dos procesos modifiquen el mismo árbol. Una rama solo puede estar abierta en un worktree a la vez. Los subagentes no reciben ese aislamiento automáticamente por mencionarlo: el integrador debe crearlo o reservar archivos disjuntos y comprobar el SHA/estado real. Véanse [Worktrees — Codex](https://learn.chatgpt.com/codex/environments/git-worktrees) y [git-worktree](https://git-scm.com/docs/git-worktree.html).

GitHub permite convertir la revisión en barrera técnica mediante protección de rama: revisión obligatoria, checks requeridos, rama actualizada, resolución de conversaciones, historial lineal y, si aumenta el volumen, cola de merge. Véanse [ramas protegidas](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) y [CODEOWNERS](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners).

## Matriz aplicada

| Rol | Escritura | Alcance | Entrega | Revisión |
|---|---:|---|---|---|
| Explorador | No | Localizar código, datos, fuentes y riesgos | Hallazgos con rutas | Integrador |
| Investigador político | Solo JSON asignados | Partido/cuadrante delimitado | Fuentes, antes/después y huecos | Validador + revisor metodológico |
| Implementador | Worktree o archivos exclusivos | Función concreta | Commit/diff atómico y pruebas focales | Revisor adversarial distinto |
| Adversarial | No | Buscar contraejemplos, privacidad, sesgo y regresiones | P0–P3 reproducibles | Integrador corrige o rechaza |
| Integrador raíz | Sí | Contrato global y archivos calientes | Matriz completa | Usuario + CI |

## Protocolo de una tanda

1. Congelar SHA base y registrar tareas/archivos.
2. Separar lectores de escritores; asignar un único propietario a cada archivo caliente.
3. Ejecutar trabajo independiente en paralelo.
4. Esperar entregas; no publicar resultados parciales como terminados.
5. Inspeccionar cada diff de forma aislada y reproducir sus pruebas.
6. Integrar, ejecutar validadores globales y resolver incompatibilidades en el agente raíz.
7. Lanzar una revisión adversarial nueva que no haya implementado el cambio.
8. Ejecutar matriz técnica y visual completa.
9. Actualizar casillas nominales solo con evidencia.
10. Commit y push a la rama de trabajo; promoción posterior a `main` mediante protección/revisión.

Cuando se usan worktrees manuales, el flujo reproducible es:

```bash
git worktree add -b agent/<tarea> <ruta> <sha-base>
git -C <ruta> rev-parse HEAD
git -C <ruta> status --porcelain
# El subagente entrega un commit focal, sin push.
test -z "$(git status --porcelain)"
git show --stat --oneline <sha>
git diff --check <sha>^!
git cherry-pick <sha>
# Ante conflicto inesperado: git cherry-pick --abort
git worktree remove <ruta>
git worktree prune
git branch -d agent/<tarea>
```

## Configuración recomendada en GitHub

El repositorio incluye `CODEOWNERS`, pero su revisión solo se vuelve obligatoria al activar una regla/ruleset para `main`. Configuración recomendada:

- exigir pull request y una aprobación;
- exigir aprobación del último push por otra revisión cuando haya colaboradores;
- exigir los checks reales `espectro / test` y `espectro / e2e`;
- exigir que la rama esté actualizada antes de fusionar; la merge queue no está disponible para este repositorio personal;
- exigir resolución de conversaciones;
- bloquear force-push y borrado de `main`;
- aplicar las reglas también al administrador cuando se quiera una barrera real.

No se activa remotamente desde esta tanda porque `gh` no tiene una sesión autenticada con permisos administrativos. El código y CI sí quedan preparados.

`CODEOWNERS` solo entra en vigor cuando el archivo existe en la rama base. En un repositorio con un único propietario, exigir una aprobación del propio `CODEOWNER` bloquearía sus PR porque GitHub no permite autoaprobarlos; debe añadirse otra persona con permiso de escritura antes de activar esa exigencia. Sí conviene activar ya PR obligatorio, checks, rama actualizada, resolución de conversaciones y bloqueo de force-push/borrado.

La CI diferencia dos contratos: `validate:todo-inventory` comprueba durante el desarrollo que no desaparezcan entidades; `validate:todo` falla si queda cualquier casilla abierta y es la puerta de publicación. Ningún recuento de inventario se presenta como trabajo terminado.
