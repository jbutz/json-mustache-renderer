import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch } from "react-redux";
import { fetchAnnotations, LoadingStatus, RootState, selectAllAnnotations } from './store';

function App() {
  const isLoading = useSelector((state: RootState) => state.annotations.loading === LoadingStatus.Pending);
  const annotations = useSelector(selectAllAnnotations);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <button
          aria-label="Fetch Annotations"
          onClick={() => dispatch(fetchAnnotations())}
          disabled={isLoading}
        >
          Fetch Annotations
        </button>
        <ul>
          {annotations && annotations.length && annotations.map((a) => (
            <li key={a.guid}>{a.documentTitle} - {a.documentChapterTitle}</li>
          ))}
        </ul>
    </div>
  );
}

export default App;
