import React from 'react';
import ReactCalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
type Props = {values:any}
const Heatmap:React.FC<Props> = ({ values }) => {
  return (
    <div>
      <ReactCalendarHeatmap
        startDate={new Date('2024-01-01')} 
        endDate={new Date('2024-12-31')} 
        values={values}
        classForValue={(value) => {
          if (value) {
            return `color-scale-${value.count}`;
          }
          return 'color-empty'
        }}
        tooltipDataAttrs={(value:any) => {
          return {
            'data-tip': `${value.date}: ${value.count} activities`,
          };
        }}
      />
    </div>
  );
};

export default Heatmap;
