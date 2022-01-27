import React from 'react';

import './Statistic.css';



const Statistic = ({tasksPerWeek}) => {
    return (
        <div className="statistics">
            <div className="statistics-item">
                <h2 className="statistics-item__title">Выполнено за последнюю неделю:
                    <span className="statistics-item__value statistics-item__value--week">{tasksPerWeek}</span>
                </h2>
            </div>
        </div>
    );
  }
  
  export default Statistic;