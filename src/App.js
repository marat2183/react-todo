import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import s from './App.module.scss';
import TasksPage from 'pages/root';


const App = () => {
  return (
    <BrowserRouter>
      <section className={s["content"]}>
        <div className={s['content__inner']}>
          <Routes>
            <Route path="/" element={<TasksPage />} />
          </Routes>
        </div>
      </section>
    </BrowserRouter>
  );
}

export default App;
