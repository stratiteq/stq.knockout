stq.knockout
============

A collection of extensions and helper functions for KnockoutJS

## Helpers
* **stq.ko.extendAsObservable( target[, object1 ] [, objectN ] )**

    This will merge properties from every object onto the target in parameter order and make them observable, sort of like ko.mapping combined with jQuery.extend, the difference is that this makes properties that are objects observable whereas ko.mapping doesn't.
    
    Objects in arrays are also merged based on index in the array. Meaning that target.arrayProp[0] will get every property from object1.arrayProp[0].
    
    
## Extensions
#### ObservableArrays
* **insert( index, itemOrArray )**

    Inserts an item or array into the original arary at the specified index. Alias for [].splice(index,0,itemOrArray)
    
* **moveItem( oldIndex, (optional)newIndex )**

    Moves an item in the original array based on indexes. Item is moved to the end of the array if newIndex is omitted/NaN
    
* **removeAt( index, (optional)count )**

    Removes the specified amount of items from the original arary starting at the specified index. Alias for [].splice(index, count || 1)
