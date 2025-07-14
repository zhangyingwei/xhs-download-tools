'use strict';

import {download} from './background/download.js';

// import { onRequest,onRequestCompleted } from './background/network.js';
//
// console.log("==================",chrome)
// chrome.webRequest.onBeforeRequest.addListener(onRequest, { urls: ["<all_urls>"] }, ['blocking']);
// chrome.webRequest.onCompleted.addListener(onRequestCompleted, { urls: ["<all_urls>"] });

chrome.runtime.onMessage.addListener(download);