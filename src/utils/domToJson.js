export const DomToJson = (node) => {
    //set up the object properties
    let obj = {
        //we need the node type
        nodeType: node.nodeType,
        //we need the tag name, if it's an element
        nodeTagName: node.tagName ? node.tagName.toLowerCase() : null,
        //we need the node name if it's not an element
        nodeName: node.nodeName ? node.nodeName : null,
        //then we need the node value
        nodeValue: node.nodeValue,
    };
    //then we need to get the key attributes - at the moment we only care about images and links
    let attrs = node.attributes;
    //we only need to work the key attributes if there are any attributes at all
    if (attrs) {
        //we define a new map
        let attrNames = new Map();
        //then we loop through the attributes
        for (let i = 0; i < attrs.length; i++) {
            //and we set the map key to the nodeName of the attribute and we have defined as the default
            attrNames.set(attrs[i].nodeName, undefined);
        }
        //we create an array to hold the final outputs
        let arr = [];
        //then we loop through the map
        for (let [name, defaultValue] of attrNames) {
            //set up the value variable
            let value;
            switch (name) {
                case 'width':
                    value = node.attributes['width'].value;
                    //then we can just push that to the array
                    arr.push(['width', value]);
                    break;
                case 'height':
                    value = node.attributes['height'].value;
                    //then we can just push that to the array
                    arr.push(['height', value]);
                    break;
                //then we need to treat the style attribute differently
                case 'style':
                    //if we query the node with the attribute getter, we get a CSS style declaration, not a string. We can get the cssText string though
                    value = node.style.cssText;
                    //then we can just push that to the array
                    arr.push(['style', value]);
                    break;
                //and we need to treat the cellpadding attribute for tables differently
                case 'cellpadding':
                    value = node.cellPadding;
                    arr.push(['cellpadding', value]);
                    break;
                default:
                    //then we see if the node has a value for the name
                    value = node[name];
                    //then if we are not hitting our default of undefined then we can push to the array
                    if (value !== defaultValue) {
                        arr.push([name, value]);
                    }
            }
        }
        //and if we have an array of any length we can allocate to the object
        if (arr.length) {
            obj.attributes = arr;
        }
    }
    //get the childnodes
    let childNodes = node.childNodes;
    //if there are any childnodes
    if (childNodes && childNodes.length) {
        //set up the array that will hold the items
        let arr = (obj.children = []);
        //then for each of the childnode we need process it into the childnodes array
        for (let i = 0; i < childNodes.length; i++) {
            //then we push the result into the child nodes array
            arr[i] = DomToJson(childNodes[i]);
        }
    }
    return obj;
};
