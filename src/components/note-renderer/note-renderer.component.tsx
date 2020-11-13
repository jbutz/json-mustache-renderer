import React from 'react';
import { Annotation } from "../../models/Annotation";
import { NoteComponent } from "./note/note.component";

export const NoteRendererComponent = ({ annotations, templateString }: { annotations: Annotation[], templateString: string }) => {
    return (
        <React.Fragment>
            {annotations.map((a) => <NoteComponent key={a.guid} annotation={a} templateString={templateString} />)}
        </React.Fragment>
    );
}