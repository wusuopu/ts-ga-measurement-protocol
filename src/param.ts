// Reference: https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
export const ParameterMapping = {
  // General
  protocolVersion : 'v',
  trackingId      : 'tid',     // eg: UA-XXXX-Y
  anonymizeIp     : 'aip',     // the IP address of the sender will be anonymized; Optional (boolean)
  disablingAdvertisingPersonalization: 'npa', // Optional (boolean)
  dataSource      : 'ds',
  queueTime       : 'qt',     // Optional
  cacheBuster     : 'z',      // Optional
  // User
  clientId        : 'cid',    // should a UUID v4
  userId          : 'uid',
  // Session
  sessionControl  : 'sc',     // start | end
  ip              : 'uip',
  userAgent       : 'ua',
  geographical    : 'geoid',  // Optional
  // Traffic Sources
  documentReferrer: 'dr',     // Specifies which referral source brought traffic to a website; Optional
  campaignName    : 'cn',     // Optional
  campaignSource  : 'cs',     // Optional
  campaignMedium  : 'cm',     // Optional
  campaignKeyword : 'ck',     // Optional
  campaignContent : 'cc',     // Optional
  campaignId      : 'ci',     // Optional
  googleAdsId     : 'gclid',  // Optional
  googleDisplayAdsId: 'dclid',  // Optional
  // System Info
  screenResolution: 'sr',     // Optional
  viewportSize    : 'vp',     // Optional
  documentEncoding: 'de',     // Optional
  screenColor     : 'sd',     // Optional
  language        : 'ul',     // User Language; Optional
  javaEnabled     : 'je',     // Optional (boolean)
  flashVersion    : 'fl',     // Optional
  // Hit
  hitType         : 't',      // 'pageview', 'screenview', 'event', 'transaction', 'item', 'social', 'exception', 'timing'
  nonInteractive  : 'ni',     // Optional (boolean)
  // Content Information
  documentLocation: 'dl',     // page url; Optional
  documentHost    : 'dh',     // hostname; Optional
  documentPath    : 'dp',     // path of page URL; Optional
  documentTitle   : 'dt',     // title of page; Optional
  screenName      : 'cd',     // Required for screenview hit type
  // contentGroup    : 'cg<groupIndex>',    // can have up to 5 content groupings; Optional
  linkId          : 'linkid', // The ID of a clicked DOM element; Optional
  // Apps
  appName         : 'an',
  appId           : 'aid',
  appVersion      : 'av',
  appInstallerId  : 'aiid',
  // Event
  eventCategory   : 'ec',     // Required for event hit type.
  eventAction     : 'ea',     // Required for event hit type.
  eventLabel      : 'el',     // Optional
  eventValue      : 'ev',     // Integer; Optional
  // E-Commerce
  transactionId   : 'ti',         // Required for transaction hit type. Required for item hit type.
  transactionAffiliation: 'ta',   // Optional
  transactionRevenue: 'tr',       // Optional
  transactionShipping: 'ts',      // Number; Optional
  transactionTax: 'tt',           // Number; Optional
  itemName        : 'in',         // Required for item hit type
  itemPrice       : 'ip',         // Number; Optional
  temQuantity     : 'iq',         // Integer; Optional
  itemCode        : 'ic',         // Optional
  itemCategory    : 'iv',         // Optional
  // Social Interactions
  socialNetwork   : 'sn',         // Required for social hit type;
  socialAction    : 'sa',         // Required for social hit type;
  socialActionTarget: 'st',       // Required for social hit type;
  // Timing
  userTimingCategoty: 'utc',      // Required for timing hit type.
  userTimingVarName : 'utv',      // Required for timing hit type.
  userTimingTime    : 'utt',      // Required for timing hit type. (milliseconds)
  userTimingLabel   : 'utl',      // Optional
  pageLoadTime      : 'plt',      // Optional (milliseconds)
  dnsTime           : 'dns',      // Optional (milliseconds)
  pageDownloadTime  : 'pdt',      // Optional (milliseconds)
  redirectResTime   : 'rrt',      // Optional (milliseconds)
  tcpConnectTime    : 'tcp',      // Optional (milliseconds)
  serverResTime     : 'srt',      // Optional (milliseconds)
  domInteractiveTime: 'dit',      // Optional (milliseconds)
  contentLoadTime   : 'dit',      // Optional (milliseconds)
  // Exceptions
  exceptionDescription: 'exd',    // Optional
  isExceptionFatal    : 'exf',    // Optional (boolean)

}
