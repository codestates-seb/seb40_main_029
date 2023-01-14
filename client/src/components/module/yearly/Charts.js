import { ResponsivePie } from '@nivo/pie';

const Pie = ({ pieData, palette }) => {
  return (
    <ResponsivePie
      data={pieData.map(each => {
        each.color = palette[each.code];
        return each;
      })}
      colors={{ datum: 'data.color' }}
      margin={{ top: 15, right: 15, bottom: 15, left: 15 }}
      sortByValue={true}
      padAngle={2}
      innerRadius={0.3}
      cornerRadius={1}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      enableArcLabels={false}
      enableArcLinkLabels={false}
    />
  );
};

export { Pie };
// const callTooltip = ({ date, color, value }) => {
//   const dayStr = dayjs(date).format('M월 D일');
//   const list = {
//     15: '기쁨',
//     30: '슬픔',
//     45: '분노',
//     60: '설렘',
//     75: '걱정',
//     90: '평온',
//     105: '예민',
//     120: '희망',
//   };
//   return <BasicTooltip id={dayStr} color={color} enableChip />;
// };

// const Calendar = ({ year, data, palette, setSelected }) => {
//   return (
//     <ResponsiveCalendar
//       data={data.filter(each => dayjs(each.day).format('YYYY') === `${year}`)}
//       from={`${year}-01-01`}
//       to={`${year}-12-31`}
//       emptyColor="#eeeeee"
//       colors={palette}
//       margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
//       yearSpacing={40}
//       monthBorderColor="#ffffff"
//       dayBorderWidth={2}
//       dayBorderColor="#ffffff"
//       legends={[
//         {
//           anchor: 'bottom-right',
//           direction: 'row',
//           translateY: 36,
//           itemCount: 4,
//           itemWidth: 42,
//           itemHeight: 36,
//           itemsSpacing: 14,
//           itemDirection: 'right-to-left',
//         },
//       ]}
//       tooltip={callTooltip}
//       onClick={each => {
//         setSelected(each.data.day);
//       }}
//       daySpacing={1.5}
//     />
//   );
// };
