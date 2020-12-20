const MongoErrorMessage = {
  MONGO_DB_MISSING: 'Mongo database is not defined, could not connect',
  DUPLICATE_KEY: 'Duplicate key',
} as const

const APIMessage = {
  WHITELIST: {
    ENTRY_SAVED: 'Whitelist entry saved.',
    ENTRY_UPDATED: 'Whitelist entry updated.',
    ENTRY_REMOVED: 'Whitelist entry removed.',
  },
  WHITELIST_ERROR: {
    ENTRY_NOT_SAVED: 'Whitelist entry was not saved.',
  },
} as const

export { MongoErrorMessage, APIMessage }