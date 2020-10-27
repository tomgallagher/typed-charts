import { useEffect, useState } from 'react';
import { DomToJson } from './../utils/domToJson';

type DomJson = {
    nodeType: string;
    nodeTagName: string;
    nodeName: string;
    nodeValue: number;
};

export const useDomToJson = (node: HTMLElement | null) => {
    //use DomToJson function to set the initial state
    const [json, setJson] = useState<DomJson | null>(DomToJson(node));
    //then add useEffect hook so it can update when the node appears in the dom
    useEffect(() => {
        setJson(DomToJson(node));
    }, [node]);
    //allow for the data to be updated
    const updateJson = (json: DomJson | null) => setJson(json);
    // here, we freeze the array to a tuple
    return [json, updateJson] as const;
};
