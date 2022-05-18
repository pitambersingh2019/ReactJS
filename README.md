# React component in AngularJS

A super simple way to render React components in AngularJS. This was written with the goal of
facilitating conversion of an AngularJS app without doing a full rewrite. 


## Usage
for each React component add the following in utils/RegisterComp
```js
ReactToAngularJS(Name, "compName", angular.module("myApp"), {
    attr1: "=", attr2: "=",... (add more)
  });
```

```html
<comp-Name attr1="" attr2=""></comp-Name>
```


## State managment for React and AngularJS

shared redux for both apps, for each Slice, add the actions to the file utils/angular_redux
AngularJS and you will be able to dispatch actions from angularJS too.


## Building

Since we don't have a normal React entry point, we will need to complie using webpack: 
`npm run-script build`
or
`yarn run webpack`

## auto build & copy and include build files to angularjs app  
`yarn run build-ng`
complied files will be saved to dist folder, please include them in your angularJS app!


