/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

var myMap,
    clusterer,
    balloons = [];

var getDate = function getDate() {
    var date = new Date(),
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    var now = year + '.' + month + '.' + day + ' ' + hours + ':' + minutes + ':' + seconds;

    return now;
};

ymaps.ready(init);

function init() {
    myMap = new ymaps.Map('map', {
        center: [55.753994, 37.622093],
        zoom: 9,
        controls: ['zoomControl']

    });

    myMap.events.add('click', function (e) {
        var coords = e.get('coords');

        ymaps.geocode(coords).then(function (res) {
            var object = res.geoObjects.get(0),
                address = object.properties.get('text');

            myMap.balloon.open(coords, {
                coords: coords,
                address: address,
                message: 'Отзывов пока нет...'
            }, {
                layout: balloonTpl,
                contentLayout: balloonContentTpl
            });
        });
    });

    var balloonTpl = ymaps.templateLayoutFactory.createClass('<div class="desk-map">\n            <div class="desk-head">                \n                {{properties.data.address|default: address}}\n                <div class="desk-map__close"></div>\n            </div>\n            <div class="desk-body">{% include options.contentLayout %}</div>\n            <div class="desk-form">\n                <h3>\u0412\u0430\u0448 \u043E\u0442\u0437\u044B\u0432</h3>\n                <form id="form">\n                    <input type="text" name="name" id="name" placeholder="\u0412\u0430\u0448\u0435 \u0438\u043C\u044F">\n                    <input type="text" name="place" id="place" placeholder="\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043C\u0435\u0441\u0442\u043E">\n                    <textarea id="comment" rows="3" name="comment" placeholder="\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u0435\u0441\u044C \u0432\u043F\u0435\u0447\u0430\u0442\u043B\u0435\u043D\u0438\u044F\u043C\u0438"></textarea>\n                    <button id="addComment">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>\n                </form>\n            </div>\n        </div>', {
        build: function build() {
            this.constructor.superclass.build.call(this);

            var closeBtn = document.querySelector('.desk-map__close'),
                addComment = document.querySelector('#addComment');

            addComment.addEventListener('click', this.addReview.bind(this));
            closeBtn.addEventListener('click', this.closeBalloon.bind(this));
        },
        clear: function clear() {
            var closeBtn = document.querySelector('.desk-map__close'),
                addComment = document.querySelector('#addComment');

            addComment.removeEventListener('click', this.addReview);
            closeBtn.removeEventListener('click', this.closeBalloon);
            this.constructor.superclass.clear.call(this);
        },
        closeBalloon: function closeBalloon(e) {
            e.preventDefault();

            this.events.fire('userclose');
        },
        addReview: function addReview(e) {
            e.preventDefault();

            var name = document.getElementById('name'),
                place = document.getElementById('place'),
                comment = document.getElementById('comment'),
                reviews = document.querySelector('.desk-body');

            if (name.value && place.value && comment.value) {
                var tplElement = document.getElementById('balloonTpl'),
                    source = tplElement.innerHTML,
                    render = Handlebars.compile(source),
                    reviews = reviews.firstElementChild.firstElementChild,
                    coords = this.getData().properties ? this.getData().properties.getAll().data.coords : this.getData().coords,
                    address = this.getData().properties ? this.getData().properties.getAll().data.address : this.getData().address,
                    date = getDate(),
                    myPlacemark,
                    data;

                data = {
                    coords: coords,
                    address: address,
                    name: name.value,
                    place: place.value,
                    date: date,
                    message: comment.value
                };

                balloons.push(data);
                document.getElementById('form').reset();

                if (reviews.firstElementChild) {
                    reviews.innerHTML += render(data);
                } else {
                    reviews.innerHTML = render(data);
                }

                myPlacemark = this.createPlacemark.call(this, data);
                clusterer.add(myPlacemark);
                myMap.geoObjects.add(clusterer);
            } else {
                alert('Заполните все поля!');
            }
        },
        createPlacemark: function createPlacemark(data) {
            return new ymaps.Placemark(data.coords, {
                data: data
            }, {
                preset: 'islands#violetIcon',
                balloonLayout: balloonTpl,
                balloonContentLayout: balloonContentTpl,
                balloonPanelMaxMapArea: 0
            });
        }
    });

    var balloonContentTpl = ymaps.templateLayoutFactory.createClass('{% if properties.data %}\n            <div class="desk-item">\n                <div class="desk-item__name">{{properties.data.name}}</div>\n                <div class="desk-item__place">{{properties.data.place}}</div>\n                <div class="desk-item__date">{{properties.data.date}}</div>\n                <div class="desk-item__message">{{properties.data.message}}</div>\n            </div>\n        {% else if %}\n            {{message|raw}}\n        {% endif %}');

    var clustererTpl = ymaps.templateLayoutFactory.createClass('<div class="cluster-map">\n            <div class="cluster-map__top">\n                <div class="cluster-map__place">{{properties.data.place}}</div>\n                <a href="#" id="routeLink" class="cluster-map__link">{{properties.data.address}}</a>\n                <div class="cluster-map__message">{{properties.data.message}}</div>\n            </div>\n            <div class="cluster-map__bottom">\n                <div class="cluster-map__date">{{properties.data.date}}</div>\n            </div>\n        </div>', {
        build: function build() {
            this.constructor.superclass.build.call(this);
            var link = document.getElementById('routeLink');

            link.addEventListener('click', this.linkRoute.bind(this));
        },
        clear: function clear() {
            var link = document.getElementById('routeLink');

            link.removeEventListener('click', this.linkRoute);
            this.constructor.superclass.clear.call(this);
        },
        linkRoute: function linkRoute(e) {
            e.preventDefault();

            var coords = this.getData().properties.getAll().data.coords,
                source = document.getElementById("desksTpl").innerHTML,
                render = Handlebars.compile(source),
                points = [];

            points = balloons.filter(function (point) {
                return coords[0] === point.coords[0] && coords[1] === point.coords[1];
            });

            myMap.balloon.open(coords, {
                coords: coords,
                address: points[0].address,
                message: render({ list: points })
            }, {
                layout: balloonTpl,
                contentLayout: balloonContentTpl
            });

            this.events.fire('userclose');
        }
    });

    clusterer = new ymaps.Clusterer({
        preset: 'islands#invertedVioletClusterIcons',
        clusterDisableClickZoom: true,
        clusterHideIconOnBalloonOpen: false,
        clusterBalloonContentLayout: "cluster#balloonCarousel",
        clusterBalloonCycling: false,
        clusterOpenBalloonOnClick: true,
        clusterBalloonItemContentLayout: clustererTpl,
        clusterBalloonPanelMaxMapArea: 0
    });
}

/***/ })
/******/ ]);
//# sourceMappingURL=main.b7782dcaebab72184d1a.js.map