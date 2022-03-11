# YAAGO - Guest View Project

This GuestView project is a PWA application dedicated to the Guest (invited by the Host) to have access to all necessary information during and before its stay.
 
## Changing Environement 
There is 3 environements so far for all FrontEnd projects : 
- staging
- qa
- and production

In order for the debug to perform on one specific environment you must make some changes in the /assets/config.json file.

{
  "system": {
    "localapiEndPoint": "http://localhost:8080/",
    "apiEndPoint": "https://guest.staging.guru4all.com/",
    "qaapiEndPoint": "https://qa.guru4all.com/",
    "betaapiEndPoint": "https://beta.guru4all.com/",
    "ed-apiEndPoint": "http://lemaistre.edouard.pro.dns-orange.fr:8080/"
  }
}

traduction des fichiers i18n
i18n-translate-json AIzaSyAHs1Dn_MQl6ba08ZjONkwmNDs8vdvPOwY src/assets/i18n/ fr en,de,da,es,it,nl,no,pl,pt,sv,tr,ru,zh


