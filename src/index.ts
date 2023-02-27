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
  [key: string]: string|number|undefined; // Custom Dimensions
}

export default class GA extends BaseGA {
  pageviewEvent (params: PageViewParam): CollectEventPayload {
    return { name: 'page_view', params }
  }
  screenviewEvent (params: ScreenViewParam): CollectEventPayload {
    return { name: 'screen_view', params }
  }
  async event (events: CollectEventPayload|CollectEventPayload[]) {
    // Custom events: https://support.google.com/analytics/answer/12229021
    if (!Array.isArray(events)) {
      events = [events]
    }
    return await this._collect({ events })
  }
}
