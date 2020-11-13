import React, { useState } from 'react';
import './App.scss';
import { DataCollectorComponent, MustacheFormatterComponent } from './components';
import { NoteRendererComponent } from './components/note-renderer';
import { Annotation } from './models/Annotation';

enum AppStep {
  One, Two, Three
}

function App() {
  const [appStep, setAppSep] = useState<AppStep>(AppStep.One);
  const [annotations, setAnnotations] = useState<Annotation[] | null>(null);
  const [templateString, setTemplateString] = useState('');

  function handleDataLoadComplete(annotations: Annotation[]) {
    setAnnotations(annotations);
    setAppSep(AppStep.Two);
  }

  function handleTemplateSave(template: string) {
    setTemplateString(template);
    setAppSep(AppStep.Three);
  }

  switch(appStep) {
    case AppStep.One:
      return <DataCollectorComponent onDataLoadComplete={handleDataLoadComplete} />;
    case AppStep.Two:
      return <MustacheFormatterComponent onTemplateChange={handleTemplateSave} exampleInput={annotations ? annotations[0] : {} as any} />;
    case AppStep.Three:
      return <NoteRendererComponent annotations={annotations || []} templateString={templateString} />;
    default:
      return <p>Error</p>;
  }
}

export default App;
