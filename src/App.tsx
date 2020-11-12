import React, { useState } from 'react';
import './App.css';
import { DataCollectorComponent } from './components';
import { Annotation } from './models/Annotation';

function App() {
  const [annotations, setAnnotations] = useState<Annotation[] | null>(null);


  return (
    <div>
      <DataCollectorComponent onDataLoadComplete={setAnnotations} />
      {annotations && annotations.map((a) => (<p key={a.guid}>{a.documentTitle} - {a.documentChapterTitle}<br /><pre dangerouslySetInnerHTML={{__html: a.annotationHtml}}></pre></p>))}
    </div>
  );
}

export default App;
