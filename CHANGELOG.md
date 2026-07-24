# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.4](https://github.com/Moritz344/wallpaper-selector/compare/v0.0.3...v0.0.4) (2026-07-24)


### Features

* add button to open the local wallpaper folder ([9ef9100](https://github.com/Moritz344/wallpaper-selector/commit/9ef9100c83ab0f9b1b1d20351b6077b4934e8300))


### Bug Fixes

* category search not working,smaller width and height for about window,implement minimizing window, ([2f12a4d](https://github.com/Moritz344/wallpaper-selector/commit/2f12a4d6053b32c92652a997895e81881d972440))
* check page before going to the next or previous page,refactor searchparameter ([dd3de94](https://github.com/Moritz344/wallpaper-selector/commit/dd3de94c25018ce8ec11b175de9817cd7cae3c6d))
* make window draggable ([37e24ad](https://github.com/Moritz344/wallpaper-selector/commit/37e24ad47d196af4b17a03084de1ea25b0b6a202))
* max width and height for about window ([0fab6da](https://github.com/Moritz344/wallpaper-selector/commit/0fab6dabd38d78d9d3af7e47c85ad712485c0065))
* only allow one about window instance ([bb53851](https://github.com/Moritz344/wallpaper-selector/commit/bb53851027ebeb1323b0b471e5e6ee167bfd1aeb))
* showing wallpapers while loading for local,remove search icon ([127468c](https://github.com/Moritz344/wallpaper-selector/commit/127468c3c4b37055ab5a8317fef51cd2829d16f1))
* wrong path to project root ([47dfcaa](https://github.com/Moritz344/wallpaper-selector/commit/47dfcaa2aa394c8fc3962d6e172c1d890d3c34eb))

### [0.0.3](https://github.com/Moritz344/wallpaper-selector/compare/v0.0.2...v0.0.3) (2026-07-17)


### Features

* add about window ([d0e60be](https://github.com/Moritz344/wallpaper-selector/commit/d0e60be5be203ec1226c0a981175a64689a99664))
* add menu button, ([9323d21](https://github.com/Moritz344/wallpaper-selector/commit/9323d210bf05f7f260ba0c1a6e77e944269be8ec))
* automatically search when local wallpaper path changed,use types defined in home.types.ts ([4324620](https://github.com/Moritz344/wallpaper-selector/commit/4324620b6d1a21c8872caf369c41f7cf9eabaa27))
* change your local wallpaper folder,download wallpapers ([f2dfdb4](https://github.com/Moritz344/wallpaper-selector/commit/f2dfdb4fadd73c065c7990e18cf81cfb49d539a8))
* close wallpaper in fullscreen with escape key,add open in folder button ([c79e637](https://github.com/Moritz344/wallpaper-selector/commit/c79e637d645708ddfe975dd96b3c650abb88d2d4))
* create about component ([d55fbb6](https://github.com/Moritz344/wallpaper-selector/commit/d55fbb65132d665c97d99b30187f0f7f1a8c1dc4))
* create menu component ([4ec1d76](https://github.com/Moritz344/wallpaper-selector/commit/4ec1d7686e431174aee0b2196d9d4e865305300a))
* dont show wallpaper bigger => open local wallpaper in folder on click and wallhaven download ([5ce1ae5](https://github.com/Moritz344/wallpaper-selector/commit/5ce1ae562fcacd0da88019cca94fe84e395a5af5))
* expose about window,get about data and close electron window function ([3724f6c](https://github.com/Moritz344/wallpaper-selector/commit/3724f6c5270d960a83ef6f6c67686e0469612269))
* implement ipc for opening wallpaper in folder ([67b5f12](https://github.com/Moritz344/wallpaper-selector/commit/67b5f128e86f49ab3a234bd5e091027ce25e0f05))
* open dialog when clicking on 'Change Local Folder' button,update variable ([85db207](https://github.com/Moritz344/wallpaper-selector/commit/85db2077f14a2d800da6c05f9bbca0aac43435ce))
* search on dropdown change, ([f8f44c6](https://github.com/Moritz344/wallpaper-selector/commit/f8f44c6eb945cdfb6bbbf5cd1908a8e326758d1d))
* show current page and total page number ([79a9be9](https://github.com/Moritz344/wallpaper-selector/commit/79a9be9c4010ec7e16ad52d9170190b51a04fb6d))
* show wallpaper name for local wallpapers,hide load more button if every wallpapers is loaded,make imgs not draggable ([09ee89c](https://github.com/Moritz344/wallpaper-selector/commit/09ee89c8c65f5a136dc466f1bad3473e401af994))
* track local wallpaper path ([5fc6182](https://github.com/Moritz344/wallpaper-selector/commit/5fc6182a30793e51b83c1a4110cb9ba5a1fdd75c))


### Bug Fixes

* implement wallhaven search in electron ([4854f95](https://github.com/Moritz344/wallpaper-selector/commit/4854f951e31ec7be96d6573e0076cb5de49ceff3))
* make category name lower case ([72e38fe](https://github.com/Moritz344/wallpaper-selector/commit/72e38fe9d29df5d454f7bf6e6ba3878f2e50f6dd))
* menu not showing when scrolled down ([255565a](https://github.com/Moritz344/wallpaper-selector/commit/255565a02f4ab15e1349d5ad09270a4b6cd79679))
* topabr showing in about window => only show in home component ([df03051](https://github.com/Moritz344/wallpaper-selector/commit/df03051d7ca87ada34742bb4e6ae34617828c111))

### [0.0.2](https://github.com/Moritz344/wallpaper-selector/compare/v0.0.1...v0.0.2) (2026-07-12)


### Features

* add search parameter,show results and total,loading indicator ([c84638e](https://github.com/Moritz344/wallpaper-selector/commit/c84638e2409d37cb252fe7a13c45ee7ab0bf89ba))
* create wallhaven service,method to search wallpapers,define readonly variables for search params ([b8b480e](https://github.com/Moritz344/wallpaper-selector/commit/b8b480ea4b040e904947652a83be6eed7a1c258b))
* input mode for load more and pagination, ([520ffbb](https://github.com/Moritz344/wallpaper-selector/commit/520ffbb39f07ce6ab90ad600a9bf9666dcde622f))


### Bug Fixes

* fix cors,return name and path ([b20c198](https://github.com/Moritz344/wallpaper-selector/commit/b20c19883999f4ff9aa9c46b98178e833126f4ad))

### 0.0.1 (2026-07-11)
