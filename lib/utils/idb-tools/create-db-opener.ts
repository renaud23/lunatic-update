import CONSTANTE from '../store-tools/constantes'
import getIDB from './get-idb'

const IDB_REF = getIDB()

export function createDbOpener() {
  return (name: string, version = 1): Promise<IDBDatabase> => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      if (!IDB_REF) {
        reject('indexedDb not supported !')
      }
      const request = IDB_REF.open(name, version)

      request.onupgradeneeded = (e) => {
        try {
          if (e && e.target) {
            if ('result' in e.target) {
              const db = e.target.result as IDBDatabase
              const store = db.createObjectStore(CONSTANTE.STORE_DATA_NAME, {
                keyPath: 'id',
              })

              db.createObjectStore(CONSTANTE.STORE_INFO_NAME, {
                keyPath: 'name',
              })

              store.createIndex(CONSTANTE.STORE_INDEX_NAME, 'tokens', {
                multiEntry: true,
              })

              if ('transaction' in e.target) {
                const txn = e.target.transaction as IDBTransaction
                if (txn && db) {
                  txn.oncomplete = function () {
                    resolve?.(db)
                  }
                }
              }
            }
          }
        } catch (e) {
          console.warn(
            `Une erreur est survenue  lors de la mise jour du store ${name} :${e}`,
          )
          reject()
        }
      }

      request.onsuccess = (e) => {
        if (e && e.target && e.target) {
          if ('result' in e.target) {
            resolve(e.target.result as IDBDatabase)
          } else {
            reject()
          }
        }
      }

      request.onerror = (e) => {
        console.warn(
          `Une erreur est survenue  lors de l'ouverture du store ${name}  : ${e}`,
        )
        reject()
      }

      throw new Error('unimplemented yet!')
    })
  }
}
