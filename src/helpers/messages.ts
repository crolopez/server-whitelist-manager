const MongoErrorMessage = {
  MONGO_DB_MISSING: 'Mongo database is not defined, could not connect',
  DUPLICATE_KEY: 'Duplicate key',
} as const

const APIMessage = {
  WHITELIST_SUCCESS: {
    ENTRY_SAVED: 'The whitelist entry was saved.',
    ENTRY_UPDATED: 'The whitelist entry was updated.',
    ENTRY_FOUND: 'The whitelist entry was obtained.',
    ENTRY_REMOVED: 'The whitelist entry was removed.',
  },
  WHITELIST_ERROR: {
    ENTRY_NOT_SAVED: 'The whitelist entry was not saved.',
    ENTRY_NOT_UPDATED: 'The whitelist entry was not be updated.',
    ENTRY_NOT_FOUND: 'The whitelist entry could not be obtained.',
    ENTRY_NOT_REMOVED: 'The whitelist entry was not be removed.',
  },
} as const

const ServerMessage = {
  ERROR: {
    INTERNAL_SERVER_ERROR: 500
  }
} as const

export { MongoErrorMessage, APIMessage, ServerMessage }
