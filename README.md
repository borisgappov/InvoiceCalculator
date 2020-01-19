# Byrd frontend developer task

The application remembers its state and, when the page is reloaded, restores it without additional requests to the server. This works not only with the customer form but also with loaded entities

## What inside?
* NgRx https://ngrx.io/docs
* NgRx Data https://ngrx.io/guide/data  
* NgRx local storage https://github.com/btroncone/ngrx-store-localstorage
* ngx-bootstrap https://valor-software.com/ngx-bootstrap/#/
* Angular Reactive Forms
* Http Interceptor
* Lazy loading
* Pipes

## Problrms and solutions

Since the NgRx/Data creates links with slashes at the end by default, it’s the reason of AppHttpUrlGenerator class. In addition, NgRx/Data does not support API routing yet, which would allow substituting parameter values in the path. The methods of AppHttpUrlGenerator class is fired once and cannot be used to dynamically change url. A beautiful solution require deep diving in the NgRx/Data code, so I added the HttpClientInterceptor and HttpRequestFilter classes that manipulate url.

## Angular version

The byrd stack currently uses Angular (6), but I used @ngrx/data - it is awailable in v8 only. I can downdgade, but I need one more day for this

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version  8.3.23.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.



