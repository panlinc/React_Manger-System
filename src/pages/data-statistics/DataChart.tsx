import React, { Fragment, useEffect } from 'react';
import MyBreadcrumb from '../../components/MyBreadcrumb';
import * as echarts from 'echarts';
import styles from './DataChart.less';
export default function DataChart() {
  useEffect(() => {
    const main: HTMLDivElement | null = document.querySelector('#main___HMJqO');
    const myChart = echarts.init(main);
    console.log(main);
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例',
      },
      tooltip: {},
      legend: {
        data: ['销量'],
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
  }, []);
  return (
    <Fragment>
      <MyBreadcrumb />
      <div id={styles.main}>数据报表</div>
    </Fragment>
  );
}
