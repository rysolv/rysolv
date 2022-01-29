/* eslint-disable no-new */
import React, { useEffect } from 'react';
import Chart from 'chart.js';
import T from 'prop-types';

import { ChartContainer, StyledCanvas, TitleRow } from './styledComponents';

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
            backgroundColor: ['rgb(53 115 255 / 20%)'],
            borderColor: ['rgb(53 115 255 / 100%)'],
            borderWidth: 1,
            data,
            fill: true,
            label: 'commits',
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
      <TitleRow>
        <div>Total Commits</div>
        <div>Last 12 months</div>
      </TitleRow>
      <StyledCanvas id="commit-chart" />
    </ChartContainer>
  );
};

CommitChart.propTypes = {
  commits: T.object,
};

export default CommitChart;
