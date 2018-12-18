# SharePoint Classic Extension

## Yeoman Generator
SharePoint Classic Extension Generator using **React**, **Flux**, **PnPjs**, **TypeScript**, **Sass**, **WebPack**, **Jest** (test), **Istanbul** (code coverage) and **PnP PowerShell** for deployment. Working on SP Online and 2016. The project also includes a SP authentication proxy. IE 10+ compatible.

### Install 
```bash
npm install -g generator-sp-classic
```

### Run
```bash
yo sp-classic
```

### Setup steps
1\. Setup Proxy
```bash
npm run proxy
```
2\. Set `_spPageContextInfo`-object in default.html
```javascript
var _spPageContextInfo = {};
    _spPageContextInfo.serverRequestPath = "/sites/[SITE_NAME]/pages/welcome.aspx";
    _spPageContextInfo.siteAbsoluteUrl = "https://[TENANT].sharepoint.com/sites/[SITE_NAME]";
    _spPageContextInfo.siteServerRelativeUrl = "/sites/[SITE_NAME]";
    _spPageContextInfo.webServerRelativeUrl = "/sites/[SITE_NAME]";
    _spPageContextInfo.webTitle = "Test";
    ...
```

### Build
Compile scripts and style, and create deployment folder.
```bash
npm run build
```

### Develop
Starts the proxy for local development.
```bash
npm run serve
```
    
### Test/Lint
Execute tests and lint.
```bash
npm run test  
jest --c ./config/Jest/jest.config.json --no-cache --watch
npm run lint  
```

### Requirements
The tenant need to have the following scripts running:
* [@proactive-as/pnp.vendor](https://www.npmjs.com/package/@proactive-as/pnp.vendor)
* [core-js](https://www.npmjs.com/package/core-js)
```bash
npm i @proactive-as/pnp.vendor
npm i core-js
```

Setup example using PnP PowerShell:
```powershell
$webUrl = (Get-PnPWeb).ServerRelativeUrl.TrimEnd('/')

# Add PnP JS
$coreJSUrl = $webUrl + "/Style Library/Plesner/Scripts/core.min.js"
$pnpJSUrl = $webUrl + "/Style Library/Plesner/Scripts/pnp.vendor.js"
# Only for on prem 2016 without React
$reactJSurl = $webUrl + "/Style Library/Plesner/Scripts/react.production.min.js"
$reactDomJSurl = $webUrl + "/Style Library/Plesner/Scripts/react-dom.production.min.js"
$scriptBlock = "
                SP.SOD.registerSod('core.min.js', '$coreJSUrl');
                SP.SOD.registerSod('pnp.vendor.js', '$pnpJSUrl');
                SP.SOD.registerSod('react.production.min.js', '$reactJSurl');
                SP.SOD.registerSod('react-dom.production.min.js', '$reactDomJSurl');
                RegisterSodDep('react.production.min.js', 'core.min.js');
                RegisterSodDep('react-dom.production.min.js', 'react.production.min.js');
                RegisterSodDep('pnp.vendor.js', 'react-dom.production.min.js');
                SP.SOD.loadMultiple(['react-dom.production.min.js', 'react.production.min.js', 'pnp.vendor.js', 'core.min.js'], function(){
                });
                "

Add-PnPJavaScriptBlock -Name "Vendor scripts" -script $scriptBlock -Sequence 1000 -Scope Site
```