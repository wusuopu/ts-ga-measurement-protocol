import axios, { AxiosInstance } from 'axios'
import { ParameterMapping } from './param'
import { assign } from './util'

const DEFAULT_PROTOCOL_VERSION = '1'
const EOL = '\n'

const transformData = (data: object): string => {
  let newData = []
  for (let key in data) {
    let newKey = ParameterMapping[key] || key
    newData.push(`${newKey}=${encodeURIComponent(data[key])}`)
  }

  return newData.join('&')
}
const transformRequest = (data: any): string => {
  if (Array.isArray(data)) {
    // data with batch hits
    let newData = []
    for (let item of data) {
      newData.push(transformData(item))
    }
    return newData.join(EOL)
  } else {
    // data with single hit
    return transformData(data)
  }
}

export default class BaseGA {
  protected _trackingId: string
  protected _clientId: string
  protected _userId: string
  protected _version: string
  protected _userAgent: string

  protected _disabled: boolean
  protected _debug: boolean

  protected collectReq: AxiosInstance
  protected batchReq: AxiosInstance

  constructor(trackingId: string, protocolVersion: string = DEFAULT_PROTOCOL_VERSION, debug: boolean = false) {
    this._trackingId = trackingId
    this._version = protocolVersion

    this.collectReq = axios.create({
      baseURL: 'https://www.google-analytics.com/collect',
      method: 'post',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      transformRequest: [transformRequest],
    })
    this.batchReq = axios.create({
      baseURL: 'https://www.google-analytics.com/batch',
      method: 'post',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      transformRequest: [transformRequest],
    })
    this._disabled = false
    this._debug = debug
  }

  setClientId (clientId: string) {
    this._clientId = clientId
    return this
  }
  getClientId (): string {
    return this._clientId
  }
  setUserId (userId: string) {
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

  start (parameters: object): object {
    let params = assign({}, parameters, {sessionControl: 'start'})
    return params
  }
  end (parameters: object): object {
    let params = assign({}, parameters, {sessionControl: 'end'})
    return params
  }

  protected get defaultParameters () {
    let params: any = {}
    if (this._version) {
      params.protocolVersion = this._version
    }
    if (this._trackingId) {
      params.trackingId = this._trackingId
    }
    if (this._clientId) {
      params.clientId = this._clientId
    }
    if (this._userId) {
      params.userId = this._userId
      //params.user_Id = this._userId
      //params.uid = this._userId
    }
    if (this._userAgent) {
      params.userAgent = this._userAgent
    }
    return params
  }
  protected createHit (...arg: object[]): object {
    let params: any = {}
    params = assign(params, this.defaultParameters, ...arg)
    return params
  }
  protected _log (...arg: any[]) {
    if (this._debug) {
      console.log(...arg)
    }
  }
  protected async _collect (data: any): Promise<boolean> {
    if (this._disabled) {
      this._log('ga is disabled')
      return false
    }

    try {
      this._log('collect:', data)
      await this.collectReq({ data, })
      return true
    } catch (error) {
      this._log('collect error:', error)
      return false
    }

  }
  protected async _batch (data: any): Promise<boolean> {
    if (this._disabled) {
      this._log('ga is disabled')
      return false
    }

    try {
      this._log('batch:', data)
      await this.batchReq({ data, })
      return true
    } catch (error) {
      this._log('collect error:', error)
      return false
    }
  }
}
