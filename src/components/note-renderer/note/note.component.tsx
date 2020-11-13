import React from 'react';
import { render } from "mustache";
import { Annotation } from "../../../models/Annotation";

export const NoteComponent = ({annotation, templateString}: {annotation: Annotation, templateString: string}) => {
    return (<div dangerouslySetInnerHTML={{__html: render(templateString, annotation)}}></div>);
}