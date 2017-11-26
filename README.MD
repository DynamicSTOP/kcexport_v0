# KC Export

Site: [https://export.kc-db.info](https://export.kc-db.info)  
**it's an alpha version, don't expect too much** 

Project was made using code\resources from [React 16](https://github.com/facebook/react/), [KC3](https://github.com/KC3Kai/KC3Kai), [WhoCallsTheFleet](https://github.com/TeamFleet/WhoCallsTheFleet) and many others.  
Please, spend couple seconds, visit those repos and add a star to appreciate their hard work! Thank you!

####Website
Website is hosted on aws [S3](https://aws.amazon.com/s3/) -> [CloudFront](https://aws.amazon.com/cloudfront/).

General caching rules are 60 days for everything except index.html, asset-manifest.json, service-worker.js.
Those should be invalidated every hour.  
Site should be able to run in offline mode and if you think that some content is outdated please consider dropping your cache (though it should be made automatic).

If you find bugs or want to leave some feedback, please post them under issues here(link incoming) or look for me in the Discord **DynamicSTOP#6314**.

####Planned features
- ship locking display
- sharing 
  - as image
  - through goo.gl links
- more interactive UI
    - hide top modded
    - collapse categories  
- helpers modification
  - marking elements in list and resharing it.
  - general recommendations. like highlight for Abukuma, Ayanami etc.
  - highlight ships that have KaiNi
  - highlight ships that will need BP
  - general recommended ships for luck mod
- show missing ships  
- equip lists
- language switch
- customize output with options  
- exporting to image, probably through [html2canvas](https://html2canvas.hertzen.com/)

##Installation

#####Optional, but recommended:  
Checkout what is docker and use it for you local dev. [https://www.docker.com/](https://www.docker.com/)  
It's free and you would probably be amazed by it if you are working with multiple projects that require different environment.  

#####assets
1) Look for instructions under `/src/images/ships/.gitignore`. You will need ship faces for template.
2) run `npm install`
3) run `yarn start` to get server with live reload.
 - if you are using docker and have missed local ip in output, run `docker network ls` and then `docker inspect %network_name%` you can find ip there.
4) run `yarn build` to get static version into `./build` folder