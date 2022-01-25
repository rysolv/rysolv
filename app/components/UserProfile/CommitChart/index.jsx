/* eslint-disable no-new */
import React, { useEffect } from 'react';
import Chart from 'chart.js';
import T from 'prop-types';

import { ChartContainer, StyledCanvas } from './styledComponents';

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
            backgroundColor: ['rgb(53 115 255 / 20%)'],
            borderColor: ['rgb(53 115 255 / 100%)'],
            borderWidth: 1,
            fill: true,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);
  return (
    <ChartContainer>
      Total Commits
      <StyledCanvas id="commit-chart" />
    </ChartContainer>
  );
};

CommitChart.propTypes = {
  commits: T.object,
};

export default CommitChart;
