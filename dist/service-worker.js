"use strict";var precacheConfig=[["4113edbe480fdeb4a887bd2638820e31.svg","4113edbe480fdeb4a887bd2638820e31"],["5f72b09dd5180da55431d6846f3b4608.jpg","5f72b09dd5180da55431d6846f3b4608"],["912ec66d7572ff821749319396470bde.svg","912ec66d7572ff821749319396470bde"],["D:/dev/web/portfolio/index.html","ba4f1d8ccca4ffb56dd9ac5b404f4abd"],["f44d1a7cb9d2e8ed692f2354f3fb46f5.jpg","f44d1a7cb9d2e8ed692f2354f3fb46f5"],["icon_128x128.d21869e4ba4e848ed5b178d7b02c1b73.jpeg","d21869e4ba4e848ed5b178d7b02c1b73"],["icon_192x192.4047643d9ff77b241106230d3f349214.jpeg","4047643d9ff77b241106230d3f349214"],["icon_256x256.5bccda1816d5a28ec958b2a564291cb0.jpeg","5bccda1816d5a28ec958b2a564291cb0"],["icon_384x384.035ccfa1b62ade891f2edeedc9e6fcdd.jpeg","035ccfa1b62ade891f2edeedc9e6fcdd"],["icon_512x512.bc425d9c0a31bae9d9639f3cb3d03134.jpeg","bc425d9c0a31bae9d9639f3cb3d03134"],["icon_96x96.d4b78592fcb8488416f28824d69f1f8b.jpeg","d4b78592fcb8488416f28824d69f1f8b"],["main.css","92b2892ff014cbd37b19f02377e80b43"],["main.js","f9614930d0ffd596ed75ec2b5890fca3"],["manifest.87b6740b93d49a142c2d4dc780eaaf14.json","87b6740b93d49a142c2d4dc780eaaf14"]],cacheName="sw-precache-v3-alexey-khrushch-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,n){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=n),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(n){return new Response(n,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,n,t,r){var a=new URL(e);return r&&a.pathname.match(r)||(a.search+=(a.search?"&":"")+encodeURIComponent(n)+"="+encodeURIComponent(t)),a.toString()},isPathWhitelisted=function(e,n){if(0===e.length)return!0;var t=new URL(n).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return n.every(function(n){return!n.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var n=e[0],t=e[1],r=new URL(n,self.location),a=createCacheKey(r,hashParamName,t,/\.\w{8}\./);return[r.toString(),a]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var r=new Request(t,{credentials:"same-origin"});return fetch(r).then(function(n){if(!n.ok)throw new Error("Request for "+t+" returned a response with status "+n.status);return cleanResponse(n).then(function(n){return e.put(t,n)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!n.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var n,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(n=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),n=urlsToCacheKeys.has(t));!n&&"navigate"===e.request.mode&&isPathWhitelisted([],e.request.url)&&(t=new URL("https://alexeykhr.github.io/",self.location).toString(),n=urlsToCacheKeys.has(t)),n&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(n){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,n),fetch(e.request)}))}});