"use strict";

// Constants
const CANVAS_ID = 'canv';
const JLOG_FILE = "data/ist.jlog";
const PLAYING_DELAY = 100;
// const WORKER_FILE = '../src/WorkerLoader.js';
const WORKER_FILE = '../dist/WebViewerWorker.js';
const ERROR_MODAL = '#errorModal';
const LOADING_MODAL = '#loadingModal';

$(() => {
    main();
})