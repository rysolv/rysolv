/* eslint-disable no-new */
import React, { useEffect } from 'react';
import Chart from 'chart.js';
import T from 'prop-types';

import { StyledCanvas } from './styledComponents';

const CommitChart = ({ commits }) => {
  const { labels, data } = commits;

  useEffect(() => {
    const ctx = document.getElementById('commit-chart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      fill: true,
      data: {
        labels,
        datasets: [
          {
            label: 'commits',
            data,
            backgroundColor: ['rgba(75, 192, 192, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)'],
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);
  return <StyledCanvas id="commit-chart" />;
};

CommitChart.propTypes = {
  commits: T.object,
};

export default CommitChart;
