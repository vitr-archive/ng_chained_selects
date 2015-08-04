# ng_chained_selects
AngularJS implementation of chained select boxes with ajax calls for data   
let's make it as a custom directive 
   
base angular application  
https://github.com/Swiip/generator-gulp-angular


php back-end to support ajax requests

http://ng-chained-selects.appspot.com/  


https://cloud.google.com/appengine/docs/php/gettingstarted/uploading


option tree sample  
![Image](./option-tree.png?raw=true)

####Note
2 ajax calls are involved:  
- initial tree returns an object with options array on each level (1, 2, 3, etc.)  
- options list returns an array of options which are the children(leaves) of the parent option




TODO: bower package (javascript)        
TODO: add interfaces for the tree and options services(php)