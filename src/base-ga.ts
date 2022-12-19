export const DEFAULT_PROTOCOL_VERSION = '4'

export interface CollectEventPayload {
  name: string;
  // https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference/events
  params: object;

}
export interface CollectPayload {
  timestamp_micros?: number;
  // https://developers.google.com/analytics/devguides/collection/protocol/ga4/user-properties?client_type=gtag
  user_properties?: object;
  non_personalized_ads?: boolean;
  events: CollectEventPayload[];

}

export default class BaseGA {
  protected _measurementId: string
  protected _apiSecret: string
  protected _clientId: string
  protected _userId: string
  protected _version: string
  protected _userAgent: string

  protected _disabled: boolean
  protected _debug: boolean

  protected collectReq: any   // AxiosInstance

  constructor(measurementId: string, apiSecret: string, axios: any, debug: boolean = false) {
    this._measurementId = measurementId
    this._apiSecret = apiSecret

    this._disabled = false
    this._debug = debug

    // https://developers.google.com/analytics/devguides/collection/protocol/ga4/validating-events?client_type=gtag
    const baseURL = debug ? 'https://www.google-analytics.com/debug/mp/collect' : 'https://www.google-analytics.com/mp/collect'
    this.collectReq = axios.create({
      baseURL,
      method: 'post',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        api_secret: this._apiSecret,
        measurement_id: this._measurementId,
      },
    })
  }

  setClientId (clientId: string) {
    this._clientId = clientId
    return this
  }
  getClientId (): string {
    return this._clientId
  }
  setUserId (userId?: string) {
    this._userId = userId
    return this
  }
  getUserId (): string {
    return this._userId
  }
  setUserAgent (userAgent: string) {
    this._userAgent = userAgent
    if (userAgent) {
      this.collectReq.defaults.headers.common['User-Agent'] = userAgent
    } else {
      delete this.collectReq.defaults.headers.common['User-Agent']
    }
    return this
  }
  disable () {
    this._disabled = true
    return this
  }
  enable () {
    this._disabled = false
    return this
  }
  async startSesssion () {
    // https://support.google.com/analytics/answer/9191807
    return this._collect({
      events: [
        { name: 'session_start', params: {}, },
      ]
    })
  }

  protected _log (...arg: any[]) {
    if (this._debug) {
      console.log(...arg)
    }
  }
  protected async _collect (data: CollectPayload): Promise<any> {
    if (this._disabled) {
      this._log('ga is disabled')
      return false
    }

    try {
      this._log('collect:', data)
      const res = await this.collectReq({
        method: 'post',
        data: {
          ...data,
          client_id: this._clientId,
          user_id: this._userId,
        },
      })
      return res?.data
    } catch (error) {
      this._log('collect error:', error)
    }
  }
}
