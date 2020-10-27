import { useEffect, useState } from 'react';
import { DomToJson } from './../utils/domToJson';

type DomJson = {
    nodeType: string;
    nodeTagName: string;
    nodeName: string;
    nodeValue: number;
};

export const useDomToJson = (node: HTMLElement | null) => {
    const [json, setJson] = useState<DomJson | null>(null);
    useEffect(() => {
        const json = DomToJson(node);
        setJson(json);
    }, [node]);
    return json;
};
