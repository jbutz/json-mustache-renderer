import React, { useRef } from 'react';

const DEFAULT_TEMPLATE = `
<h2><a href="{{documentChapterUrl}}">{{documentTitle}} - {{documentChapterTitle}}</a></h2>
{{{annotationHtml}}}
`;

export const MustacheFormatterComponent = ({onTemplateChange}: {onTemplateChange: Function}) => {
    const textareaEl = useRef<HTMLTextAreaElement>(null);
    return (
        <React.Fragment>
            <p>Explain Mustache templates</p>
            <table>
                <thead>
                    <th>Variable</th>
                    <th>Description</th>
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
            <textarea defaultValue={DEFAULT_TEMPLATE} onChange={() => onTemplateChange(textareaEl.current?.value)}></textarea>
        </React.Fragment>  
    )
}