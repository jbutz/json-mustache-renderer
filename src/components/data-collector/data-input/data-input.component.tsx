import React, { useRef } from 'react';

export const DataInputComponent = ({dataUrl, onReceiveData}: {dataUrl: string; onReceiveData: Function}) => {
    const textareaEl = useRef<HTMLTextAreaElement>(null);
    function handleReceiveData() {
        onReceiveData(textareaEl.current?.value);
    }

    return (
        <div>
            <p>Please open <a href={dataUrl} target="_blank">{dataUrl}</a> and paste the results in the box below then click the button.</p>
            <textarea ref={textareaEl}></textarea>
            <button onClick={handleReceiveData}>Save Data</button>
        </div>
    )
}