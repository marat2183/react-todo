import React from 'react';
import {Link} from "react-router-dom";

import Statistic from 'components/Statistic';
import s from './index.module.scss';


const StatisticPage = () => {
  return (
      <>
        <h1 className={s["content__title"]}>
          Statistics
        </h1>
        <nav className={s["navigation"]}>
          <Link to="/" className={s["navigation"]}>Tasks</Link>{" "}
        </nav>
        <Statistic/>
      </>
  );
}

export default StatisticPage
