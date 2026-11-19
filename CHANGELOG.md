# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.5](https://github.com/Moritz344/wallview/compare/v0.0.4...v0.0.5) (2026-11-19)


### Features

* add fav tab ([a0e2101](https://github.com/Moritz344/wallview/commit/a0e21013ecddd2f3ff0a8b735bce5ed2ae2e2a1a))
* add quit button ([403336b](https://github.com/Moritz344/wallview/commit/403336b4148ce9e35234adae729ea04be8508f26))
* apply wallpaper option ([b58c82c](https://github.com/Moritz344/wallview/commit/b58c82c396e8fe23d4f8738d535a1bd1bf81dfb4))
* create own tooltip component ([aa000d6](https://github.com/Moritz344/wallview/commit/aa000d65b33c49fa6a990289bc027e3c0ff4c504))
* create preview component for wallpapers ([ae528d0](https://github.com/Moritz344/wallview/commit/ae528d053f5ea2ed4f71060718ed8a5124869f0c))
* implement search for favourite tab ([4848285](https://github.com/Moritz344/wallview/commit/4848285450ed42fa6a07338eababf8d56a3149be))
* remove electron window for about ([dcd4da8](https://github.com/Moritz344/wallview/commit/dcd4da806b30a0b59fcc6104368e537f7f4489b1))
* show different icon depending on if the wallpaper is marked as favourite,update favourite status,change hover title ([cc3c3f9](https://github.com/Moritz344/wallview/commit/cc3c3f92a57b81d1621243dd4a3d2617f7a48331))
* show different placeholder depending on the selectedTab ([25eae11](https://github.com/Moritz344/wallview/commit/25eae11919d7f014fa3716836d9290490a65b739))
* show preview of wallpaper when clicking on one,switch to the next and previous,download wallpaper,show in folder and mark as favourite ([f7e3702](https://github.com/Moritz344/wallview/commit/f7e3702764eb2a051bc1da6d7313daeb8966e68c))


### Bug Fixes

* current loaded wallpapers and max not showing ([f4a8786](https://github.com/Moritz344/wallview/commit/f4a878627002499237339d2c8d02449866d97bb2))
* disable button for opening the local wallpaper folder if path was not set ([56526a2](https://github.com/Moritz344/wallview/commit/56526a23dd7c0d45ab3bb1054c0c783c2ffb69d9))
* dont show loading indicator for local wallpaper ([bf5f858](https://github.com/Moritz344/wallview/commit/bf5f858c6f1bb614758de16524dab7cdfbb2cecb))
* open repo instead of github profile ([94c7134](https://github.com/Moritz344/wallview/commit/94c7134195c70798bebf68b4afd8fab6345a0126))
* pagination data not being at bottom,disable prev and next button on certain condition ([3bbc8ed](https://github.com/Moritz344/wallview/commit/3bbc8ed5e66471330892fbb970e4f95fa52048a4))
* search when typing in input field ([35f8dfb](https://github.com/Moritz344/wallview/commit/35f8dfb751b762896c34091f828fa7a753b185db))
* searchparameter q not being resetted when changing between tabs ([e4ab2da](https://github.com/Moritz344/wallview/commit/e4ab2da9b319b8dba7c3b05344755f7553de46b3))
* TypeError => only update the path when  wallpaper is actually in favourites ([fb1df8d](https://github.com/Moritz344/wallview/commit/fb1df8da1c25ffe581546a79807b286bbea87630))

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
