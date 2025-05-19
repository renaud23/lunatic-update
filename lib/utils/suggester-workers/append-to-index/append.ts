import { idbBulkInsert, openDb } from '../../idb-tools'
import { CONSTANTES } from '../../store-tools'
// @ts-ignore
import prepareEntities from './prepare-entities'
// @ts-ignore
import MESSAGES from './store-messages'

async function append(
  storeInfo: { name: string; stopWords?: string[]; fields: string[] },
  version: number,
  entities: unknown,
  log = (v: unknown) => console.warn(`${v}`),
) {
  try {
    const { name, stopWords, fields } = storeInfo
    const prepared = prepareEntities(entities, { fields, stopWords }, log)
    const db = await openDb(name, version)
    log({ message: MESSAGES.startInsertBatch })
    await idbBulkInsert(db, CONSTANTES.STORE_DATA_NAME, function (args) {
      const { message } = args
      log({ message })
    })(prepared)
    log({ message: MESSAGES.insertBatchDone })
    log({ message: MESSAGES.done })
    return 'success'
  } catch (e) {
    log({ message: 'Errors occurred when trying to append data.' })
    console.error(e)
  }
}

export default append
