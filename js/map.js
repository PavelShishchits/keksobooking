!function () {
    'use strict';

    /**
     * Временные данные для объекта объявления
     * @type {{object}}
     */
    var data = {
        offerLength: 8,
        offerTitles: [
            'Большая уютная квартира',
            'Маленькая неуютная квартира',
            'Огромный прекрасный дворец',
            'Маленький ужасный дворец',
            'Красивый гостевой домик',
            'Некрасивый негостеприимный домик',
            'Уютное бунгало далеко от моря',
            'Неуютное бунгало по колено в воде'
        ],
        types: ['flat', 'house', 'bungalo'],
        minPrice: 1000,
        maxPrice: 1000000,
        minRooms: 1,
        maxRooms: 5,
        checkIns: ['12:00', '13:00', '14:00'],
        features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
        minLocX: 300,
        maxLocX: 900,
        minLocY: 100,
        maxLocY: 500
    };

    /**
     * Объект модели
     * @type {{object}}
     */
    var model = {

        adds: [],

        /**
         * Генерирует массив объявлений
         * @method createAdds
         */
        createAdds: function () {

            for (var i = 0; i < data.offerLength; i++) {
                this.adds.push(this.generateAdd(i));
            }

            controller.createPins();
        },

        /**
         * Генерирует объект обяъвления
         * @method generateAdd
         * @param {number} i порядковый номер объекта в массиве
         * @return [obj]
         */
        generateAdd: function (i) {
            var locX = window.util.getRandomNumber(data.minLocX, data.maxLocX);
            var locY = window.util.getRandomNumber(data.minLocY, data.maxLocY);
            var checkTime = data.checkIns[window.util.getRandomNumber(0, data.checkIns.length - 1)];
            var rooms = window.util.getRandomNumber(data.minRooms, data.maxRooms);
            this.addItem = {
                author: {
                    avatar: 'img/avatars/user' + window.util.convertNum(i + 1) +'.png'
                },
                offer: {
                    title: data.offerTitles[window.util.getRandomNumber(0, data.offerTitles.length - 1)],
                    address: '' + locX + ', ' + locY + '',
                    price: window.util.getRandomNumber(data.minPrice, data.maxPrice),
                    type: data.types[window.util.getRandomNumber(0, data.types.length - 1)],
                    rooms: rooms,
                    guests: rooms * 2,
                    checkin: checkTime,
                    checkout: checkTime,
                    features: window.util.arrayShuffler(data.features.slice(0, window.util.getRandomNumber(1, data.features.length))),
                    description: '',
                    photos: []
                },
                location: {
                    x: locX,
                    y: locY
                }
            };
            return this.addItem;
        }
    };

    /**
     * Объект контроллер (Обработка действий пользователя)
     * @type {{object}}
     */
    var controller = {

        /**
         * @method createPins
         */
        createPins: function () {
            view.renderPins();
        }
    };

    /**
     * Объект представления
     * @type {{object}}
     */
    var view = {

        /**
         * Генерирует разметку пина
         * @param {obj} item Объект объявления
         */
        generatePin: function (item) {
            var pin = document.createElement('div');
            pin.innerHTML = '<img src="' + item.author.avatar + '" class="round" width="40" height="40">';
            pin.className = 'pin';
            setTimeout(function () {
                pin.style.left = (item.location.x - (pin.offsetWidth / 2)) + 'px';
                pin.style.top = (item.location.y - pin.offsetHeight) + 'px';
            }, 0); // without timeout offsetHeight is 0
            return pin;
        },

        /**
         * Вставляет пины на карту
         */
        renderPins: function () {
            var pinsWrapper = document.querySelector('.tokyo__pin-map');
            var fragment = document.createDocumentFragment();
            model.adds.forEach(function (item) {
                fragment.append(view.generatePin(item));
            });
            pinsWrapper.append(fragment);
        }
    };

    /**
     * Объект приложения
     * @type {{object}}
     */
    var mapApp = {
        init: function () {
            model.createAdds();
        }
    };

    document.addEventListener('DOMContentLoaded', function () {
        mapApp.init();
    });
}();