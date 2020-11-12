import React, { useState } from 'react';
import { Annotation } from '../../models/Annotation';
import { OReillyResponse } from '../../models/OReillyResponse';
import { DataInputComponent } from './data-input';

export const DataCollectorComponent = ({onDataLoadComplete}: {onDataLoadComplete: Function}) => {
    const [annotations, setAnnotations] = useState([] as Annotation[]);
    const [waitingForData, setWaitingForData] = useState(true);
    const [dataUrl, setDataUrl] = useState('https://learning.oreilly.com/api/v1/annotations/all/?page_size=1000');

    function onReceiveData(stringData: string) {
        setWaitingForData(false);
        const jsonData: OReillyResponse = JSON.parse(stringData);
        if(jsonData.results) {
            const updatedValue = [
                ...annotations,
                ...jsonData.results.map((v) => Annotation.fromOReillyAnnotation(v)),
            ];
            console.log(updatedValue);
            setAnnotations(updatedValue);

            if(jsonData.next) {
                setDataUrl(jsonData.next);
                setWaitingForData(true);
            } else {
                onDataLoadComplete(updatedValue.reverse());
            }
        }
        // else throw error
    }

    return (
        <React.Fragment>
            {waitingForData && (<DataInputComponent dataUrl={dataUrl} onReceiveData={onReceiveData} />)}

        </React.Fragment>
    )
}