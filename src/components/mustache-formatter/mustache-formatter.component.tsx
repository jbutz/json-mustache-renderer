import { render } from 'mustache';
import React, { useRef, useState } from 'react';
import { Annotation } from '../../models/Annotation';
import { ButtonComponent, TextareaComponent } from '../atoms';

const DEFAULT_TEMPLATE = `<h2><a href="{{documentChapterUrl}}">{{documentTitle}} - {{documentChapterTitle}}</a></h2>
{{{annotationHtml}}}
`;

export const MustacheFormatterComponent = ({ onTemplateChange, exampleInput }: { onTemplateChange: Function, exampleInput: Annotation }) => {
    const [templateString, setTemplateString] = useState(DEFAULT_TEMPLATE);
    const textareaEl = useRef<HTMLTextAreaElement>(null);

    function handleTextareaChange(e: any) {
        setTemplateString(textareaEl.current?.value || '')
    }

    return (
        <React.Fragment>
            <p>Explain Mustache templates</p>
            <table>
                <thead>
                    <tr>
                        <th>Variable</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><pre>{`{{documentTitle}}`}</pre></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><pre>{`{{documentCoverUrl}}`}</pre></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><pre>{`{{documentChapterUrl}}`}</pre></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><pre>{`{{documentChapterTitle}}`}</pre></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><pre>{`{{{annotationHtml}}}`}</pre></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><pre>{`{{annotationText}}`}</pre></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <TextareaComponent ref={textareaEl} defaultValue={DEFAULT_TEMPLATE} onChange={handleTextareaChange}></TextareaComponent>
            <ButtonComponent className='pure-button-primary' onClick={() => onTemplateChange(templateString)}>Use Template</ButtonComponent>
            <div>
                <h2>Preview</h2>
                <div dangerouslySetInnerHTML={{__html: render(templateString, exampleInput)}}></div>
            </div>
        </React.Fragment>
    )
}