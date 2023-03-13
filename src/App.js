import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TasksPage from 'pages/root';

import s from './App.module.scss';

const App = () => {
  return (
    <BrowserRouter>
      <section className={s['content']}>
        <div className={s['content__inner']}>
          <Routes>
            <Route path="/" element={<TasksPage />} />
          </Routes>
        </div>
      </section>
    </BrowserRouter>
  );
};

export default App;
