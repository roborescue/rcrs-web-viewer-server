# RCRS Web Viewer  [ Client Side ]

![Screenshot of RCRS Web Viewer](https://user-images.githubusercontent.com/13227657/94995109-d28c8080-05a8-11eb-9897-3040aac9238f.PNG)

## Requirements
- Modern browser (supports Web Workers and WebGL)
- ``nodejs`` (development and installing dependencies)
- ``php`` (used for ``php-server`` command)

## Documentation
Documents of each file and each function of that can accessible from these links:
- [Constants](docs/jsdoc/Constants.md)
- [Entity](docs/jsdoc/Entity.md)
- [EntityColor](docs/jsdoc/EntityColor.md)
- [EntityHandler](docs/jsdoc/EntityHandler.md)
- [GameMaker](docs/jsdoc/GameMaker.md)
- [UIController](docs/jsdoc/UIController.md)
- [WorkerDataLoader](docs/jsdoc/WorkerDataLoader.md)
- [WorkerMain](docs/jsdoc/WorkerMain.md)

## Commands

### `` compile `` command
```sh
npm run compile
```
This command creates many files from source files (``./src/*``) and config file (``config.json``). For example creates distribution files, preview files, and etc.

### ``php-server`` command
```sh
npm run php-server
```
This command runs built-in webserver of PHP for serving preview files on ``localhost:1715``.


## Versioning System
```
{Major}.{Minor}.{TimeStamp}
```

## License
Released under the [BSD 3-Clause](../LICENSE) License