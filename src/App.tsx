import React, { useState } from 'react';
import './App.css';
import { DataCollectorComponent, MustacheFormatterComponent } from './components';
import { Annotation } from './models/Annotation';

enum AppStep {
  One, Two, Three
}

function App() {
  const [appStep, setAppSep] = useState<AppStep>(AppStep.One);
  const [annotations, setAnnotations] = useState<Annotation[] | null>(null);

  function handleDataLoadComplete(annotations: Annotation[]) {
    setAnnotations(annotations);
    setAppSep(AppStep.Two);
  }

  function handleTemplateSave(template: string) {
    console.log(template);
  }

  switch(appStep) {
    case AppStep.One:
      return <DataCollectorComponent onDataLoadComplete={handleDataLoadComplete} />;
    case AppStep.Two:
      return <MustacheFormatterComponent onTemplateChange={handleTemplateSave}/>;
  }
  return (
    <div>
      <DataCollectorComponent onDataLoadComplete={setAnnotations} />
      <MustacheFormatterComponent onTemplateChange={console.log}/>
      {annotations && annotations.map((a) => (<p key={a.guid}>{a.documentTitle} - {a.documentChapterTitle}<br /><span dangerouslySetInnerHTML={{__html: a.annotationHtml}}></span></p>))}
    </div>
  );
}

export default App;
