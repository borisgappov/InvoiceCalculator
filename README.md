# Invoice Calculator - frontend developer task

[![Countries test app](https://img.youtube.com/vi/JbgySQWSOaw/0.jpg)](https://www.youtube.com/watch?v=JbgySQWSOaw)

## How to run

`npm install`
`ng serve`, navigate to `http://localhost:4200/`.

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

## Problems and solutions

Since the NgRx/Data creates links with slashes at the end by default, it’s the reason of AppHttpUrlGenerator class. In addition, NgRx/Data does not support API routing yet, which would allow substituting parameter values in the path. The methods of AppHttpUrlGenerator class is fired once and cannot be used to dynamically change url. A beautiful solution require deep diving in the NgRx/Data code, so I added the HttpClientInterceptor and HttpRequestFilter classes that manipulate url.

## Angular version

"@angular/cli": "9.1.7"

## Task description

* Implement an invoice calculator, which will be used by the staff to
  calculate and bill customers based on the number of orders processed.
* Scope
  * Use any language and framework of your choice
    * The team stack currently uses Angular (8)
  * **Don't spend days working on your solution**
    * **Focus on quality over quantity** - we're looking for *production ready*
      code, rather than a rough-and-ready complete solution
    * If you're short of time - this is *perfectly fine* - please feel free to
      limit your work to one small portion of the challenge, but complete it
      to the best of your ability. The purpose of the challenge is enable us
      to gauge your proficiency as a developer
    * If your submission is incomplete, it would be great for you to also
      explain via email what you'd do next - what tools you'd use, etc.

## Workflow / User Journey
* On load, the user is presented with a form, which includes:
  * A customer selector (list retrieved from API)
  * A date range (start and end date)
* After submitting the form, the orders are retrieved from the API
* The page then displays the following:
  * A list of all the orders
    * The recipient name and email address
    * The total price of the order (based on the `total_price` from each item)
    * When the order was made
    * The items within the order
    * The delivery details
  * A summary at the top of the page
    * The date range and the total number of days
    * The total amount to invoice (based on the `charge_customer` value)
    * The number of orders

## API
* The API is documented and hosted on [Apiary](https://byrd1.docs.apiary.io/#).
  **Please use the mock API**.

### BONUS: State persistence
* Devise a way of storing the current state of the app, such that the user is
  able to refresh the page, and when the app reloads the previous state is
  displayed (i.e. including the state of the form and the orders retrieved)
