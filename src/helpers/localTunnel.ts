import { LocalTunnelMessage } from './messages'
import localtunnel from'localtunnel'

const LOCALTUNNEL_URL = 'https://SUB.loca.lt'

function checkSubdomain(): void {
  if (!process.env.LOCALTUNNEL_SUBDOMAIN) {
    throw new Error(LocalTunnelMessage.ERROR.LOCALTUNNEL_SUBDOMAIN_MISSING)
  }
}

function checkAcceptRandomSubdomain(): void {
  if (!process.env.ACCEPT_RANDOM_SUBDOMAIN) {
    throw new Error(LocalTunnelMessage.ERROR.ACCEPT_RANDOM_SUBDOMAIN_MISSING)
  }

  const acceptRandom = process.env.ACCEPT_RANDOM_SUBDOMAIN as unknown as string
  if (acceptRandom === 'false') {
    throw new Error(LocalTunnelMessage.ERROR.RANDOM_SUBDOMAIN_NOT_ALLOWED)
  }
}

async function connectLocalTunnel(): Promise<void> {
  try {
    checkSubdomain()

    if (process.env.LOCALTUNNEL_SUBDOMAIN === 'none') {
      console.log(LocalTunnelMessage.SUCCESS.UNEXPOSED_SERVICE)
      return
    }

    const tunnel = await localtunnel({
      port: process.env.PORT as unknown as number,
      subdomain: process.env.LOCALTUNNEL_SUBDOMAIN as unknown as string,
    })

    const expectedURL = LOCALTUNNEL_URL.replace('SUB', process.env.LOCALTUNNEL_SUBDOMAIN as unknown as string)
    if (tunnel.url !== expectedURL) {
      checkAcceptRandomSubdomain()
    }

    console.log(LocalTunnelMessage.SUCCESS.CONNECTION + tunnel.url)
  } catch (error) {
    console.error(error)
    process.exit(-1)
  }
}

export { connectLocalTunnel }
