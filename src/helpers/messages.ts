const MongoErrorMessage = {
  MONGO_DB_MISSING: 'Mongo database is not defined, could not connect',
  DUPLICATE_KEY: 'Duplicate key',
} as const

const LocalTunnelMessage = {
  ERROR: {
    LOCALTUNNEL_SUBDOMAIN_MISSING: 'LocalTunnel subdomain is not defined.',
    EXPOSED_PORT_MISSING: 'Exposed port is not defined.',
    ACCEPT_RANDOM_SUBDOMAIN_MISSING: 'It is necessary to define whether or not to accept LocalTunnel random subdomains.',
    RANDOM_SUBDOMAIN_NOT_ALLOWED: 'Random subdomains are not allowed. Select an unique subdomain.',
  },
  SUCCESS: {
    UNEXPOSED_SERVICE: 'The service will not be exposed.',
    CONNECTION: 'LocalTunnel has been connected to ',
  },
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
    INTERNAL_SERVER_ERROR: 500,
  },
} as const

export { MongoErrorMessage, LocalTunnelMessage, APIMessage, ServerMessage }
