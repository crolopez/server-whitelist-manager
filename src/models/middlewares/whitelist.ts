import { MongoErrorMessage } from '../../helpers/messages'

// FIXME: what the hell is this?
function whiteListPostSaveMiddleware (error: any, _res: any, next: Function): void {
  // FIXME, this is flaky 
  if (error.name === 'MongoError' && error.code === 11000) {
    const jsonError = error.keyValue
    next({
      error: `${MongoErrorMessage.DUPLICATE_KEY}`,
      duplicatedKey: Object.keys(jsonError)[0],
      duplicatedValue: Object.values(jsonError)[0],
    })
  } else {
    next()
  }
}

export { whiteListPostSaveMiddleware }