# Jargon
- Refactoring


# Middleware

 * There are two types
  - normal
  - error handling
 
 * can come from different sources:
  - built in: included with express
  - third party: needs to be installed seperately 
  - custom: we write it 

 * We can use it :
    - globally: it runs on every request to any endpoint
    - locally: is only applied to a specific endpoint or group of endpints


 * Middleware can: 
    - make changes to the `request` and `response` objects
    - inspect the `request` and `response` pbjects
    - move to the `request` or `response` object to the _next_ middleware in the queue
    - stops the `request` and send back a `response` to the client


** order matters **