import { type PropsWithChildren } from 'react'

import ReactDOM from 'react-dom'

export function ModalContainer({ children }: PropsWithChildren) {
  return ReactDOM.createPortal(
    <div className="lunatic-modal-controls">
      <div className="modal-content">{children}</div>
    </div>,
    document.body,
  )
}
