import React, { useRef } from 'react';
import { ButtonComponent, TextareaComponent } from '../../atoms';

export const DataInputComponent = ({dataUrl, onReceiveData}: {dataUrl: string; onReceiveData: Function}) => {
    const textareaEl = useRef<HTMLTextAreaElement>(null);
    function handleReceiveData() {
        onReceiveData(textareaEl.current?.value);
    }

    return (
        <div>
            <p>Please open <a href={dataUrl} target="_blank" rel="noreferrer">{dataUrl}</a> and paste the results in the box below then click the button.</p>
            <TextareaComponent ref={textareaEl}></TextareaComponent>
            <ButtonComponent className='pure-button-primary' onClick={handleReceiveData}>Save Data</ButtonComponent>
        </div>
    )
}