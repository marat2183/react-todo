import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import s from './App.module.scss';
import StatisticPage from 'pages/statistic';
import TasksPage from 'pages/root';


const App = () => {
  return (
    <BrowserRouter>
      <section className={s["content"]}>
        <div className={s['content__inner']}>
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="statistic" element={<StatisticPage />} />
          </Routes>
        </div>
      </section>
    </BrowserRouter>
  );
}

export default App;
