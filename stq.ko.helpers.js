var stq = stq || {},
stq.ko = (function(stqko){

	//Performs the equivalent of calling jQuery.extend and throwing the result into ko.mapping.fromJS
	//Only difference is that all objects thar are properties of other objects are made observable whereas
	//ko.mapping only makes simple types observable.
	stqko.extendAsObservable = function(target) {
		var mergeObjects = function (t, blueprint) {
            //Loop through all the properties on the blueprint, we will later push them onto the target
            for (propName in blueprint) {
                (function (pN) {
                    //Use this construct to keep the propName sane while doing recursion
                    if (blueprint.hasOwnProperty(pN)) {
                        //Prepare the value that we will push to the target.
                        var blueprintValue = blueprint[pN],
                            targetValue = {};
                        if (ko.isObservable(blueprintValue)) {
                            //We have to unwrap the observable before we can work on it.
                            blueprintValue = blueprintValue();
                        }
                        if (t.hasOwnProperty(pN)) {
                            //Targetobject should of course be existing object, if any.
                            targetValue = t[pN];
                            if (ko.isObservable(targetValue)) {
                                //Unwrap the value if it's an observable
                                targetValue = targetValue();
                            }
                        }

                        if ((isObject(targetValue) || isArray(targetValue)) && !isPrimitive(blueprintValue) && !blueprintValue) {
                            //Never overwrite an existing object or array with a null value.
                            //Does overwrite with primities.
                            targetValue = isArray(targetValue) ? ko.observableArray(targetValue) : ko.observable(targetValue);
                        }
                        else if (isArray(blueprintValue)) {
                            //Try to merge items if the target is also an array. Otherwise overwrite.
                            targetValue = ko.observableArray(mergePlainArrays(targetValue, blueprintValue));
                        }
                        else if (isObject(blueprintValue)) {
                            //Merge normal objects, this is different from ko.mapping which only makes value types/leafs observable
                            targetValue = ko.observable(mergeObjects(targetValue, blueprintValue));
                        }
                        else if (!isFunction(blueprintValue)) {
                            //These should hopefully be simple value types by now, make them observable.
                            targetValue = ko.observable(blueprintValue);
                        }
                        else if (isFunction(blueprintValue)) {
                            targetValue = blueprintValue;
                        }
                        if (t.hasOwnProperty(pN) && ko.isObservable(t[pN]) && !ko.isComputed(t[pN])) {
                            //TODO: Test this
                            t[pN](ko.isObservable(targetValue) ? targetValue() : targetValue);
                        }
                        else {
                            t[pN] = targetValue;
                        }
                    }
                })(propName);
            }
            return t;
        },
        //Returns a plain array after trying to merge properties of each object by index
        mergePlainArrays = function (targetValue, blueprintValue) {
            var newArr = [],
                targetIsArray = isArray(targetValue);
            for (var i = 0; i < blueprintValue.length; i++) {
                var targetItem = targetIsArray && isObject(targetValue[i]) ? targetValue[i] : {},
                    mergedItem = isObject(blueprintValue[i]) ? mergeObjects(targetItem, blueprintValue[i]) : blueprintValue[i];
                newArr.push(mergedItem);
            }
            return newArr;
        },
        isArray = function (possibleArray) {
            return Object.prototype.toString.call(possibleArray) === '[object Array]';
        },
        isObject = function (possibleObject) {
            return Object.prototype.toString.call(possibleObject) === '[object Object]';
        },
        isPrimitive = function (possiblePrimitive) {
        	var typeString = Object.prototype.toString.call(possiblePrimitive);
            return typeString === '[object Boolean]' ||
                typeString === '[object String]' ||
                typeString === '[object Number]' ||
                typeString === '[object Date]';
        },
        isFunction = function (possibleFunction) {
            return Object.prototype.toString.call(possibleFunction) === '[object Function]';
        };

        for (var i = 0; i < arguments.length; i++)
            target = mergeObjects(target, arguments[i]);
        return target;
    }

	return stqko;
})(stq.ko || {});