import React, { useCallback, useState } from 'react';
import Chart, { Series, Legend, CommonSeriesSettings, Point, ArgumentAxis, ScrollBar } from 'devextreme-react/chart';
import RangeSelector, { Size, Chart as ChartOptions, Margin, Scale, Behavior } from 'devextreme-react/range-selector';
import { zoomingData } from './data.js';

export default function RangeSelectorEx() {
  const [visualRange, setVisualRange] = useState({ startValue: 10, endValue: 880 });
  const updateVisualRange = useCallback(
    (e) => {
      setVisualRange(e.value);
    },
    [setVisualRange],
  );
  return (
    <React.Fragment>
      <Chart id='zoomedChart' palette='Harmony Light' dataSource={zoomingData} onOptionChanged={(e) => console.log(e)}>
        <Series argumentField='arg' valueField='y1' />
        <Series argumentField='arg' valueField='y2' />
        <Series argumentField='arg' valueField='y3' />
        <ArgumentAxis visualRange={visualRange} />
        <ScrollBar visible={true} position='bottom' onValueChanged={updateVisualRange} />
        <Legend visible={false} />
        <CommonSeriesSettings>
          <Point size={7} />
        </CommonSeriesSettings>
      </Chart>
      <RangeSelector
        dataSource={zoomingData}
        onValueChanged={updateVisualRange}
        onOptionChanged={(e) => console.log(e)}
      >
        <Behavior valueChangeMode='onHandleMove' />
        <Size height={120} />
        <Margin left={10} />
        <Scale minorTickCount={100} startValue={10} endValue={880} />
        <ChartOptions palette='Harmony Light'>
          <Legend visible={false} />
          {/* <Series argumentField='arg' valueField='y1' /> */}
          {/* <Series argumentField='arg' valueField='y2' /> */}
          {/* <Series argumentField='arg' valueField='y3' /> */}
        </ChartOptions>
      </RangeSelector>
    </React.Fragment>
  );
}
