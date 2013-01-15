<div id="intro"></div>

## INTRODUCTION

*Ender is a full featured package manager for your browser.*<br/>
It allows you to search, install, manage, and compile front-end JavaScript packages and their dependencies for the web. We like to think of it as [npm](https://github.com/isaacs/npm)'s little sister.

*Ender is not a JavaScript library*.<br/>
It's not a jQuery replacement. It's not even a static asset. It's a tool for making the consumption of front-end JavaScript packages dead simple and incredibly powerful.

### WHY?

In the browser - **small, loosely coupled modules are the future and large, tightly-bound monolithic libraries are the past!**

Ender capitalizes on this by offering a unique way to bring together the exciting work happening in JavaScript packages and allows you to mix, match, and customize your own build, suited to your individual needs, without all the extra cruft that comes with larger libraries.

With Ender, if one library goes bad or unmaintained, it can be replaced with another. Need a specific package version? No problem! Does your package have dependencies? Let us handle that for you too!

<div class="hr" id="docs"></div>

## DOCUMENTATION CONTENTS

<div class="doc-contents"></div>

 * » [overview](#overview)
 * » [installation](#installation)
 * » [the ender command line interface](#cli)
  - ├ [build](#build)
  - ├ [add](#add)
  - ├ [set](#set)
  - ├ [remove](#remove)
  - ├ [refresh](#refresh)
  - ├ [compile](#compile)
  - ├ [info](#info)
  - ├ [search](#search)
  - └ [help](#help)
 * » [building and publishing your own packages](#publishing)
  - ├ [package.json](#packagejson)
  - └ [the bridge](#bridge)
 * » [the ender client api](#client)
  - ├ [require](#require)
  - ├ [provide](#provide)
  - ├ [$.ender](#ender)
  - └ [$._select](#_select)
 * » [the jeesh](#jeesh)
  - ├ [what does this setup look like?](#jeeshoverview)
  - └ [try it out](#tryit)
 * » [beyond the jeesh&mdash;additional packages](#additionalpackages)
  - └ [selector engines](#selectorengines)

<div class="hr" id="overview"></div>

## OVERVIEW

### ON THE COMMAND LINE

```sh

$ ender build backbone
# installs:
# └─┬ backbone@0.5.2 - Give your JS App some Backbone with Models, Views, Collections, and Events.
#   └── underscore@1.1.7 - JavaScript's functional programming helper library.

$ ender add domready qwery
# installs:
# ├── domready@0.2.5 - bullet proof DOM ready method
# └── qwery@2.1.2 - blazing fast CSS1|2|3 query selector engine

$ ender remove qwery
# uninstalls:
# └── qwery@2.1.2 - blazing fast CSS1|2|3 query selector engine
```

### IN THE BROWSER

```js
// Require packages to access them as raw packages
var _ = require('underscore')
_.each([1, 2, 3], alert)

// Access methods augmented directly to the $
$.ready(function () {
  $([1, 2, null, 3])
    .filter(function (item) { return item })
    .each(alert)
})
```

<div class="hr" id="installation"></div>

## INSTALLATION

When installing, first make sure you have a working copy of the latest stable version of both [Node.js](http://nodejs.org) and [npm](https://github.com/isaacs/npm). You can then install Ender with the following single line:

```sh
$ [sudo] npm install ender -g
```

Once installed, you should have access to the `ender` command.

<div class="hr" id="cli"></div>

## USING ENDER FROM THE COMMAND LINE

The `ender` command provides the following actions:

<p id="build"></p>

### BUILD

Installs and assembles JavaScript packages and their dependencies.

```sh
$ ender build [foo, bar, ...]
```

#### arguments

Accepts a list of npm package names and/or paths to local packages. If left blank, the directory root will be used.
You can specify a version by suffixing a package with `@` followed by a version number.

```sh
$ ender build scriptjs backbone@0.1.0 ../../myLocalPackage
```

*note: When providing a path, the package directory must contain a valid package.json file*

#### output

 * » **ender.js** - an uncompressed file containing assembled packages
 * » **ender.min.js** - a copy of ender.js, minified by uglify-js
 * » **local copies of specified packages** - located in the node_modules directory, these are used for dependency management

#### options

 * » **--noop** - this outputs the assembled packages without the ender-js client api.
 * » **--output** - this outputs your assembled packages to a specified path and filename.
 * » **--help** - gives you more info on the build method.

<p id="add"></p>

### ADD

Installs and appends JavaScript packages and their dependencies to an already assembled library.

```sh
$ ender add [foo, bar, ...]
```

#### arguments

Accepts a list of npm package names and/or paths to local packages.

```sh
$ ender add scriptjs
```

#### output

 * »  **ender.js && ender.min.js** - Appends package code to already present ender builds
 * »  **local copies of specified packages** - located in the node_modules directory, these are used for dependency management

#### options

 * »  **--use** - Specify which file to append package code to.
 * »  **--help** - gives you more info on the add method.

*note: You don't need to specify .js when referencing a JavaScript file here*

<p id="set"></p>

### SET

Sets a JavaScript packages to specific version.

```sh
$ ender set foo@0.0.1
```

#### arguments

Accepts a list of npm package names and/or paths to local packages.

```sh
$ ender add scriptjs@0.1.0
```

<p id="remove"></p>

### REMOVE

Uninstalls and removes JavaScript packages and their dependencies from an already assembled library.

```sh
$ ender remove [foo, bar, ...]
```

#### arguments

Accepts a list of npm package names and/or paths to local packages.

```sh
$ ender remove domready
```

#### options

 * »  **--use** - Specify which file to remove package code from.
 * »  **--help** - gives you more info on the remove method.

<p id="refresh"></p>

### REFRESH

Rebuilds and reinstalls packages.

```sh
$ ender refresh
```

#### options

 * »  **--use** - Specify which file to refresh.
 * »  **--help** - gives you more info on the refresh method.

<p id="compile"></p>

### COMPILE

Shortcut for compiling code with google closure compiler.

#### arguments

Accepts file paths.

```sh
$ ender compile ./header.js ./footer.js ./my/app.js
```

<p id="info"></p>

### INFO

Provides the current status of your built Ender library. This information includes the build type, a gzipped file size, and a list of all the current packages (with version numbers, descriptions, and dependency tree).

```sh
$ ender info
```

#### options

 * » **--use** - tell ender which file to operate on

<p id="search"></p>

### SEARCH

Looks up keywords against npm's registry and surfaces the most relevant packages. It promotes results for known Ender compatible packages and also generic npm matches).

```sh
$ ender search underscore
```

<p id="help"></p>

### HELP

Gives a simple run through of the available methods and documentation.

```sh
$ ender
```

<div class="hr" id="publishing"></div>

## BUILDING AND PUBLISHING YOUR OWN PACKAGES

Because Ender relies on npm for package management -- extending your Ender library is as simple as publishing to npm.

<p id="packagejson"></p>

### PACKAGE.JSON

If you haven't already registered your project with npm, create a file called *package.json* in your package root. A completed [package file](http://wiki.commonjs.org/wiki/Packages/1.0) might look something like this:

```js
{
  "name": "blamo",
  "description": "a thing that blams the o's",
  "version": "1.0.0",
  "keywords": ["blamo", "ender"],
  "homepage": "http://example.com",
  "authors": ["Mr. Blam", "Miss O"],
  "repository": {
    "type": "git",
    "url": "https://github.com/fake-account/blamo.git"
  },
  "dependencies": {
    "klass": "*"
  },
  "main": "./src/project/blamo.js",
  "ender": "./src/exports/ender.js"
}
```

Have a look at the [Qwery package.json file](https://github.com/ded/qwery/blob/master/package.json) to get a better idea of this in practice.

#### Ender Specific Practices

 * »  Add the `ender` keyword to your package.json to get promoted by Ender search as a compatible package.
 * »  Add a bridge file for integrating with the Ender client api by specifying an `"ender"` param.
 * »  you may specify `"noop"` for the `"ender"` param to tell Ender to not try to integrate it with the Ender client api.

<p id="bridge"></p>

### THE BRIDGE

The bridge is an optional JavaScript integration file used to integrate your code with the Ender client api.

<div class="hr" id="client"></div>

## THE ENDER CLIENT API

The Ender client api offers two powerful ways to interact with your JavaScript packages, a module API which is based on [CommonJS Modules spec v1.1](http://wiki.commonjs.org/wiki/Modules/1.1) and a heavily augmented $ namespace (like jQuery).

<p id="require"></p>

### REQUIRE

Returns a raw exported JavaScript package.

```js
var myPackage = require('myPackage')
```

#### arguments

A package name.

```js
var _ = require('underscore') //return the underscore object
```

#### examples

If you were to run the following build command <code>ender build backbone</code>, you could then access both backbone and underscore from your browser like this:

```js
var backbone = require('backbone')
  , _ = require('underscore')

backbone.Models(...)
_.each(...)
```

#### pro tip

Ender's module support is also great when you run into libs which are competing for namespace on the $. For example, if package "foo" and package "bar" both expose a method `baz` -- you could use `require` to gain access to the method being overridden -- as well as set which method you would prefer to be on Ender's internal chain.

```js
$.baz() //executes bar's method baz

$.ender({ baz: require('foo').baz }); // sets $.baz to be foo's method baz

require('bar').baz() //bar's baz is still accessible at any time.
```

<p id="provide"></p>

### PROVIDE

Registers a new public package.

```js
provide("myPackage", myPackageObj)
```

#### arguments

A package name and a value to store as the package.

```js
provide('underscore', _)
```

*note: Ender automatically wraps all command line installed packages in a closure and makes them available in this way. Because of this, most modules will not be accessible directly in the global scope -- **this of course is great news!***

<p id="ender"></p>

### $.ENDER

Augments arguments onto the Ender client object ($).

#### arguments

An object to augment onto the Ender $.
An optional boolean value -- if true, the object will be added to the Internal chain.

```js
$.ender({
  myUtility: myLibFn
})

$.myUtility()
```

*note: Within the scope of your extension methods, the internal prototype will be exposed to the developer using the <code>this</code> context representing the node collection.*

```js
$.ender({
  rand: function () {
    return this[Math.floor(Math.random() * this.length)]
  }
}, true)
```

$('p').rand()

<p id="_select"></p>

### $._select

Set the selector engine for the $ object.

#### arguments

A method to be used as the selector engine.

```js
$._select = mySelectorEngine
$('#foo .bar')
```

*note: You can see it in practice in [Qwery](https://github.com/ded/qwery/blob/master/src/ender.js)*

#### example

If you're building a Mobile Webkit or Android application, you might want to set it simply to <code>querySelectorAll</code>.

```js
$._select = function (selector, root) {
  return (root || document).querySelectorAll(selector)
})
```

<div class="hr" id="jeesh"></div>

## THE JEESH

The Jeesh is the official starter pack for Ender. The Jeesh can help you build anything from small prototypes to providing a solid base for large-scale rich application for desktop and mobile devices. At its core, it's a collection of packages that we've found particularly useful for major use-case development endeavors -- but we encourage developers to <code>add</code> and <code>remove</code> packages to really make it your own. Currently, the Jeesh includes:

 * »  domReady - a cross-browser [domReady](https://github.com/ded/domready)
 * »  Qwery - a fast light-weight [selector engine](https://github.com/ded/qwery)
 * »  Bonzo - a bullet-proof [DOM utility](https://github.com/ded/bonzo)
 * »  Bean - a multi-platform [event manager](https://github.com/fat/bean)

<p id="jeeshoverview"></p>

### WHAT DOES THIS SETUP LOOK LIKE?

#### domready

```js
$.domReady(function () {...})
```

#### DOM queries

```js
$('#boosh a[rel~="bookmark"]').each(function (el) { ... })
```

#### Manipulation

```js
$('#boosh p a[rel~="bookmark"]').hide().html('hello').css({
  color: 'red',
  'text-decoration': 'none'
}).addClass('blamo').after('✓').show();
```

#### Events

```js
$('#content a').bind('keydown input', handler)
$('#content a').emit('customEvent')
$('#content a').remove('click.myClick')
```

<p id="tryit"></p>

### TRY IT OUT
If you're looking to test drive this setup, have a play with [the compiled source](http://cdn.enderjs.com/jeesh.min.js)

<div class="hr" id="additionalpackages"></div>

## BEYOND THE JEESH&mdash;ADDITIONAL PACKAGES

Ender is also a thriving ecosystem of packages, some specifically designed for Ender and others that are simply Ender compatible. To get an idea of what's available, why not have a look at these additional packages:

 * »  Traversty - a full-featured [DOM traversal and collection management utility](https://github.com/rvagg/traversty)
 * »  Reqwest - easy [AJAX & form serialization](https://github.com/ded/reqwest)
 * »  Valentine - type checking, functional iterators and async helpers, [JavaScript's Functional Sister](https://github.com/ded/valentine)
 * »  Bowser - [browser detection](https://github.com/ded/bowser)
 * »  Wings - [simple templating](https://github.com/amccollum/wings)
 * »  Morpheus - a brilliant [animator](https://github.com/ded/morpheus)
 * »  Klass - a utility for creating [expressive classes](https://github.com/ded/klass)
 * »  Jar - basic [cookie handling](https://github.com/amccollum/jar)

Or how about something more substantial? **[Ender Bootstrap](https://github.com/rvagg/ender-bootstrap)** gives you the individual [Bootstrap](http://twitter.github.com/bootstrap/) plugins for Ender.

You can find additional modules, or add your own, on the [Ender Wiki](https://github.com/ender-js/Ender/wiki/Ender-package-list).

<p id="selectorengines"></p>
### SELECTOR ENGINES

Ender doesn't limit you to using Qwery as your selector engine. You can also choose from:

 * »  [Sizzle](http://sizzlejs.com/) - available as `sizzle`
 * »  [Sel](https://github.com/amccollum/sel) - available as `sel`
 * »  [NWMatcher](https://github.com/dperini/nwmatcher) - available as `nwmatcher`

<div class="hr" id="learn"></div>

## LEARNING ENDER

Instructional videos and other cool stuff for learning about Ender.

### Getting Started with Ender

  <iframe src="http://player.vimeo.com/video/23836209?portrait=0" width="640" height="360" frameborder="0"></iframe>

### Building an Ender Module

  <iframe src="http://player.vimeo.com/video/24296635?portrait=0" width="640" height="360" frameborder="0"></iframe>

<div class="hr" id="about"></div>

## ABOUT THIS PROJECT

We would love to hear how you're using Ender or why you're not. What you love... what you hate... And we would love all the help we can get! Got a great idea? Open an issue, submit a pull request, follow @ender, or [message us on twitter](http://twitter.com/intent/tweet?text=@fat%20@ded%20-%20I'm%20using%20ender.%20Check%20it%20out%20at%20http://)!

### LICENSE

Ender is licensed under *MIT* - *copyright 2012-2013 Dustin Diaz & Jacob Thornton*

For the individual modules, see their respective licenses.

<div class="clear"></div>