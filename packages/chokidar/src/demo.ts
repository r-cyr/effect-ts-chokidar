import * as T from "@effect-ts/core/Effect"
import * as S from "@effect-ts/core/Effect/Experimental/Stream"
import * as M from "@effect-ts/core/Effect/Managed"
import { pipe } from "@effect-ts/core/Function"
import { runMain } from "@effect-ts/node/Runtime"

import * as W from "../src"

const log = (...args: any[]) =>
  T.succeedWith(() => {
    console.log(...args)
  })

pipe(
  M.gen(function* (_) {
    const watcher = yield* _(
      T.toManagedRelease_(W.make(["/tmp/watch-test"]), W.shutdown)
    )
    const subscription = yield* _(W.subscribe(watcher))

    yield* _(pipe(subscription, S.tap(log), S.runDrain))
  }),
  M.useForever,
  runMain
)
