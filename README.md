<p>
  <h1 align="center">SIGNING PROJECT<h1>
</p>

## Description

[Signing Project]() give user secure document

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Example curl
Swagger API
```
http://localhost:3000/v1/
```

Create signing request - file can get form folder **resource**
```
curl -X 'POST' \
  'http://localhost:3000/signing' \
  -H 'accept: */*' \
  -H 'Content-Type: multipart/form-data' \
  -F 'createdBy=test@mail.com' \
  -F 'signer=nghoangtuan92@gmail.com' \
  -F 'tagSignatureLocation=tag' \
  -F 'file=@test.pdf;type=application/pdf'
```
Signing document - file can get form folder **resource**
```
curl -X 'PUT' \
  'http://localhost:3000/signing/60c6bfc479fbd30770cabcb0' \
  -H 'accept: */*' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@certificate.p12;type=application/x-pkcs12'
```

## Database Schema
![Database Schema](/images/db_schema.PNG)

## Request signature sequence
![Database Schema](/images/dedoco-request-signature-sequence.png)

## Sign document sequence
![Database Schema](/images/dedoco-sign-document.png)

# **What are other considerations of designing the API service for this use case?**

### Why we should upload files when signing instead of write dedicate API upload file?
* To make sure logic work correctly in one place and don't create redundant files when user missing few step of create sign request.
***
### Should we embed file model to signing model?
* Should not. Because file model is general model and we can use for saving something else.
***
### What type of signatures we should use?
* Electronic (drawing or picture).
* Digital (verifiable using public keys). 

Should digital. Because easy and compatible with lib sign pdf.
***
### What way we implement signature algorithm?
* Use the library. 
* Use the external system. 

Should use the library. Because it's easy to use. Can implement fast. In short time, external system too hard for research and implement. 
***
### What places we should save files?
* Save to disk.
* Save to database.

Should save to disk. Because it will be easy to scale and integrate with cloud like AWS S3, Azure Blob Storage,...Another thing it will not make database grow too fast and throw bad performance.
***
### Why should save both files before after signing?
Keep everything easier to track.
***
### Why we use createdBy and signer is email?
Email is easy to use and can be identified user on the system.
