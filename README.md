Vending Machine
=====

Clone this repo and then run `npm install`

## What do we need?

- https://nodejs.org/download/
- http://gruntjs.com/getting-started#installing-the-cli
- http://www.browsersync.io

## Grunt Tasks

#### Development
- `grunt server` Runs a development server using BrowserSync

#### Build
- `grunt build` 

## App initialization
Run the following commands in order to start the application

* npm install
* bower install
* grunt serve


## Tech Stack

* ###Angular.js
  MV* framework of choice.

* ###Yeoman Angular Generator
  Project generator, has useful scaffolding functionalities

* ###Grunt.js
  Task runner

## Assumptions

* ### The VM accepts six different coins values [0.01, 0.05, 0.10, 0.25, 0.50, 1.0] for buy products
* ### The VM has seven diffent product options
* ### Each product has different price
* ### The user can buy one product entering the exact amount or entering N amount and after buy N quantity of products
* ### The user only can buy products as long as the amount that the MV has available
* ### The user can buy more products with the amount remaining or take the change
* ### The user can't buy products out of the stock or select a product that not exist


## Live Preview
[a link](http://lobcode.com/test/vending-machine)




