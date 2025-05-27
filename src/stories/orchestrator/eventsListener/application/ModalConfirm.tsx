import { useCallback, useRef, useState } from 'react'

import {
  buildAfterNextPage,
  buildBeforeNextPage,
  useEventsListener,
  useNavigation,
} from '@lib/main'

const idBefore = 'CONF_BEFORE'
const idAfter = 'CONF_AFTER'

export function ModalConfirm() {
  const [display, setDisplay] = useState(false)
  const bypass = useRef(false)
  const { goNextPage } = useNavigation()

  const beforeNext = useCallback(() => {
    if (bypass.current) {
      return true
    } else {
      setDisplay(true)
      return false
    }
  }, [])

  const afterNext = useCallback(() => {
    setDisplay(false)
    bypass.current = false
  }, [])

  useEventsListener(idBefore, buildBeforeNextPage(beforeNext))
  useEventsListener(idAfter, buildAfterNextPage(afterNext))

  const suivant = useCallback(() => {
    setDisplay(false)
    bypass.current = true
    goNextPage()
  }, [goNextPage])

  const corriger = useCallback(() => {
    setDisplay(false)
    bypass.current = false
  }, [])

  return (
    <dialog id="my_modal_1" className="modal" open={display}>
      <div className="modal-box">
        <h3 className="text-lg font-bold">Page suivante</h3>
        <p className="py-4">Voullez-vous vraiment changer de page ?</p>
        <div className="modal-action">
          <form method="dialog">
            <div className="join" role="group">
              <button className="join-item btn btn-primary" onClick={corriger}>
                Corriger Mes réponses
              </button>
              <button className="join-item btn" onClick={suivant}>
                Continuer
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  )
}
