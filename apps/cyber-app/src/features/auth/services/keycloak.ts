import Keycloak from 'keycloak-js'

const KEYCLOAK_URL = import.meta.env.VITE_KEYCLOAK_URL as string
const KEYCLOAK_REALM = import.meta.env.VITE_KEYCLOAK_REALM as string
const KEYCLOAK_CLIENT_ID = import.meta.env.VITE_KEYCLOAK_CLIENT_ID as string

if (!KEYCLOAK_URL || !KEYCLOAK_REALM || !KEYCLOAK_CLIENT_ID) {
  throw new Error('Missing Keycloak configuration in environment variables.')
}

export const keycloak = new Keycloak({
  url: KEYCLOAK_URL,
  realm: KEYCLOAK_REALM,
  clientId: KEYCLOAK_CLIENT_ID,
})
