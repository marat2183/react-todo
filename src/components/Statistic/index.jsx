import React from 'react';
import { useSelector } from 'react-redux';

import s from './index.module.scss';

const Statistic = () => {
  const tasksPerWeek = useSelector((state) => state.statistic.completedTasksPerWeek);

  return (
    <div className={s['statistics']}>
      <div className={s['statistics-item']}>
        <h2 className={s['statistics-item__title']}>
          Выполнено за последнюю неделю:
          <span className={`${s['statistics-item__value']} ${s['statistics-item__value--week']}`}>{tasksPerWeek}</span>
        </h2>
      </div>
    </div>
  );
};

export default Statistic;
