# Change Log
## May 17, 2023 v1.10.22
Bug fix to PSB Elem Report Card:
- Fixed issue where report card would not load for a previous term if there was no grade for one or more standards in ELA, FLA or MAT
## May 2, 2023 v1.10.17
Bug fixes to PSB Elem Report Card:
- Fixed issue with Writing and Representing standard grade for term 3.
- Added suppression for standards grades from future terms (i.e. standards grades for terms 2no longer print on term 1 report card reprints.)
## April 4, 2023 v1.10.13
- All K-9 report cards except CSLF Maternelle are complete for 2nd report cards and installed on prod.
- Modified K report card to present attendance more clearly for 2nd report cards.
- Resolved minor issues with CSLF Elem report card.
## January 30, 2023
- All 1-9 report cards except CSLF Elem are now complete for 2nd report cards and installed on prod.
- Removed Babel from Node dependencies and from webpack configuration, as we have no need to transpile ES6 code.
## November 13, 2022
- Removed extraneous data fetch on elementary report card, now that all data is in one JSON file. 
- Added plugin.xml to 'prefs' folder. Will need to be moved with each build, for the time being.
## November 9, 2022
- Uploaded v1.5 of plugin to production with fix for elementary standards issue.
## October 12, 2022
- CSLF Intermediate report card complete and working on test1
## September 6, 2022
- Rebuilt Webpack config to allow for multi-page app, merged branches
## September 4, 2022
- Full-draft of 4-term version ready to test on pei-test1
## August 10, 2022
- **Update 1**: Intermediate report card now functional for testing.
- **update 2**: Worked out some db kinks.