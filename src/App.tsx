import React, { useState } from 'react';
import './App.css';
import { DataCollectorComponent, MustacheFormatterComponent } from './components';
import { Annotation } from './models/Annotation';

function App() {
  const [annotations, setAnnotations] = useState<Annotation[] | null>(null);


  return (
    <div>
      <DataCollectorComponent onDataLoadComplete={setAnnotations} />
      <MustacheFormatterComponent onTemplateChange={console.log}/>
      {annotations && annotations.map((a) => (<p key={a.guid}>{a.documentTitle} - {a.documentChapterTitle}<br /><span dangerouslySetInnerHTML={{__html: a.annotationHtml}}></span></p>))}
    </div>
  );
}

export default App;
