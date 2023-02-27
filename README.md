# ga-measurement-protocol 

Google Analytics Measurement Protocol with typescript. It can run in nodejs, browser, react-native, etc.
Current it only supports protocol v4.  
If you want to use protocol v1, please install previous version: ` yarn add ga-measurement-protocol@1.1.2`


## Installation

```console
yarn add ga-measurement-protocol
yarn add uuid, axios
```

## Usage
Reference https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference?client_type=gtag

Create API Secret: Admin > Data Streams > choose your stream > Measurement Protocol > Create  
Get Measurement ID: Admin > Data Streams > choose your stream > Measurement ID

```typescript
pageviewEvent (params: PageViewParam): CollectEventPayload

screenviewEvent (params: ScreenViewParam): CollectEventPayload

event (events: CollectEventPayload|CollectEventPayload[])
```

## Example

```typescript
import GA from 'ga-measurement-protocol'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

// measurementId, apiSecret, AxiosStatic, enableDebug
const ga = new GA(measurementId, apiSecret, axios, false)
ga.setUserAgent(customUserAgent)
ga.setClientId(uuidv4())    // clientId is a random string
ga.setUserId('user-1')

// send a pageview event with a new session
ga.startSesssion(ga.pageviewEvent({page_location: '/debug', page_title: 'Debug Page'}), uuidv4())

// send a pageview
ga.event(ga.pageviewEvent({
  page_location: '/member/profile',
  page_title: 'User Profile',
}))

// send a event
ga.event({
  name: 'custom_event',
  params: { my_event_param1: 'value1', my_event_param2: 'value2' }
})

// send batch events
ga.event([
  {
    name: 'custom_event1',
    params: { my_event_param1: 'value1', my_event_param2: 'value2' }
  },
  {
    name: 'custom_event2',
    params: { my_event_param1: 'value1', my_event_param2: 'value2' }
  },
])
```
