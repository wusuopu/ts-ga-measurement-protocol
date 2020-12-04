# ga-measurement-protocol
Google Analytics Measurement Protocol with typescript. It can run in nodejs, browser, react-native, etc.
Current it only supports protocol v1.


## Installation

```
yarn add ga-measurement-protocol
yarn add uuid, axios
```

## Usage
parameters for each hitType: https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters

```
pageview (param: PageViewParam)

screenview (param: ScreenViewParam)

event (param: EventParam)

transaction (param: TransactionParam)

item (param: ItemParam)

social (param: SocialParam)

exception (param: ExceptionParam)

timing (param: TimingParam)

batch (params: any[])
```

## Example

```
import GA from 'ga-measurement-protocol'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

// trackingId, AxiosStatic, protocolVersion, enableDebug
const ga = new GA('UA-XXXX-Y', axios '1', false)
ga.setClientId(uuidv4())    // clientId is a random string
ga.setUserId('user-1')

// send a pageview
ga.pageview({
  documentPath: '/member/profile',
  documentTitle: 'User Profile',
})

// send a event
ga.event({
  eventCategory: 'category-1',
  eventAction: 'action-1',
  eventLabel: 'label-1'
})


// send batch hit
ga.batch([
  {
    documentPath: '/member/profile',
    documentTitle: 'User Profile',
    hitType: 'pageview',
  },
  {
    eventCategory: 'category-1',
    eventAction: 'action-1',
    eventLabel: 'label-1'
    hitType: 'event',
  }
])
```
