var stq = stq || {},
stq.extensions = (function(extensions){

    /*
     * ObservableArray extensions
     */

    //Moves an item from one index to another.
    //Omiting newIndex will place the item in the last position of the array
    ko.observableArray.fn.moveItem = function (oldIndex, newIndex) {
        var array = this,
            innerArray = array();
        if (typeof newIndex !== "number" || isNaN(newIndex))
            newIndex = innerArray.length;
        if (oldIndex === newIndex)
            return;
        var itemToMove = array.splice(oldIndex, 1)[0];
        if (newIndex > oldIndex)
            newIndex--;
        array.splice(newIndex, 0, itemToMove);
    }

    //Inserts a item or array at the specified index
    ko.observableArray.fn.insert = function (index, itemOrArray) {
        this.splice(index,0,itemOrArray);
    }

    //Removes an item at the specified index
    //Count is optional and specifies how many items will be removed, a single item is removed if omitted
    ko.observableArray.fn.removeAt = function (index, count) {
        this.splice(index, count || 1);
    }

    return extensions;
})(stq.extensions || {});