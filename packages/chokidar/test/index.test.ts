import * as T from "@effect-ts/core/Effect"
import * as S from "@effect-ts/core/Effect/Experimental/Stream"
import * as M from "@effect-ts/core/Effect/Managed"
import { pipe } from "@effect-ts/core/Function"

import * as W from "../src"

describe("Express", () => {
  it("should pass", async () => {
    const log = (...args: any[]) =>
      T.succeedWith(() => {
        console.log(...args)
      })

    await T.runPromise(
      pipe(
        M.gen(function* (_) {
          const watcher = yield* _(W.make(["~/food"], {}))
          const subscription = yield* _(W.subscribe(watcher))

          yield* _(pipe(subscription, S.tap(log), S.runDrain))
        }),
        M.useForever
      )
    )
  })
})
