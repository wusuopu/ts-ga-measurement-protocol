import { v4 as uuidv4 } from 'uuid'
import BaseGA from './base-ga'

export type HitType = 'pageview' | 'screenview' | 'event' | 'transaction' | 'item' | 'social' | 'exception' | 'timing'

export interface PageViewParam {
  documentPath  : string;  // Page Path.
  documentHost? : string;  // Document Hostname.
  documentTitle?: string;  // Title.
  [key: string]: string|number; // Custom Dimensions
}
export interface ScreenViewParam {
  screenName   : string;
  [key: string]: string|number; // Custom Dimensions
}
export interface EventParam {
  eventCategory: string;  // Event Category.
  eventAction  : string;  // Event Action. 
  eventLabel?  : string;  // Event label.
  eventValue?  : number;  // Event value.
  [key: string]: string|number; // Custom Dimensions
}
export interface TransactionParam {
  transactionId   : string;
  transactionAffiliation?: string;
  transactionRevenue?: string;
  transactionShipping?: number;
  transactionTax?: number;
  [key: string]: string|number; // Custom Dimensions
}
export interface ItemParam {
  itemName      : string;
  itemPrice?    : number;
  itemQuantity? : number;
  itemCode?     : string;
  itemCategory? : string;
  [key: string] : string|number; // Custom Dimensions
}
export interface SocialParam {
  socialNetwork     : string;
  socialAction      : string;
  socialActionTarget: string;
  [key: string]: string|number; // Custom Dimensions
}
export interface ExceptionParam {
  exceptionDescription: string;
  isExceptionFatal    : 1 | 0;
  [key: string]: string|number; // Custom Dimensions
}
export interface TimingParam {
  userTimingCategoty  : string;
  userTimingVarName   : string;
  userTimingTime      : number;
  userTimingLabel?    : string;
  pageLoadTime        : number;
  dnsTime             : number;
  pageDownloadTime    : number;
  redirectResTime     : number;
  tcpConnectTime      : number;
  serverResTime       : number;
  domInteractiveTime  : number;
  contentLoadTime     : number;
  [key: string]: string|number; // Custom Dimensions
}

export const genClientId = (): string => {
  return uuidv4()
}

export default class GA extends BaseGA {
  async pageview (param: PageViewParam) {
    return await this._collect(this.createHit(param, {hitType: 'pageview'}))
  }
  async screenview (param: ScreenViewParam) {
    return await this._collect(this.createHit(param, {hitType: 'screenview'}))
  }
  async event (param: EventParam) {
    return await this._collect(this.createHit(param, {hitType: 'event'}))
  }
  async transaction (param: TransactionParam) {
    return await this._collect(this.createHit(param, {hitType: 'transaction'}))
  }
  async item (param: ItemParam) {
    return await this._collect(this.createHit(param, {hitType: 'item'}))
  }
  async social (param: SocialParam) {
    return await this._collect(this.createHit(param, {hitType: 'social'}))
  }
  async exception (param: ExceptionParam) {
    return await this._collect(this.createHit(param, {hitType: 'exception'}))
  }
  async timing (param: TimingParam) {
    return await this._collect(this.createHit(param, {hitType: 'timing'}))
  }

  async batch (data: Array<PageViewParam|ScreenViewParam|EventParam|TransactionParam|ItemParam|SocialParam|ExceptionParam|TimingParam>) {
    return await this._batch(data)
  }
}
