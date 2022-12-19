import BaseGA, { CollectEventPayload } from './base-ga'

export interface PageViewParam {
  page_location: string;
  page_referrer?: string;
  page_title?: string;
  [key: string]: any; // Custom Dimensions
}
export interface ScreenViewParam {
  firebase_screen: string;
  firebase_previous_screen: string;
  screen_resolution?: string;     // widthxheight
  [key: string]: string|number; // Custom Dimensions
}

export default class GA extends BaseGA {
  async pageview (params: PageViewParam) {
    return await this._collect({
      events: [ { name: 'page_view', params }, ]
    })
  }
  async screenview (params: ScreenViewParam) {
    return await this._collect({
      events: [ { name: 'screen_view', params }, ]
    })
  }
  async event (events: CollectEventPayload|CollectEventPayload[]) {
    // Custom events: https://support.google.com/analytics/answer/12229021
    if (!Array.isArray(events)) {
      events = [events]
    }
    return await this._collect({ events })
  }
}
