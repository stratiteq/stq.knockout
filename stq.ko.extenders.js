ko.extenders.delayedSubscribe = function (target, options) {
    target.subscribe(function () {
        clearTimeout(target._delayedCallback);
        target._delayedCallback = setTimeout(options.callback, options.delay);
    });
}