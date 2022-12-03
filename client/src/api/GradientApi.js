import axios from 'axios';
import dayjs from 'dayjs';

export const GetColors = async () => {
  // const jsonServer = 'http://localhost:4000/moods'; // client 폴더에서 json-server ./data/dataMonth.json --port 4000 실행
  const getURL = process.env.REACT_APP_BASIC_URL;
  const month = dayjs(new Date()).format('MM');
  const path = `/mood/month/회원1/${month}`;
  return await axios.get(getURL + path).then(res => {
    function notNull(el) {
      if (el.moodPaletteDetails !== null) {
        return el;
      }
    }
    let colors = res.data.filter(notNull);
    colors = colors.map(x => x.moodPaletteDetails.colorCode); // null이 있는 애들이 있음
    // console.log(colors);
    // 요약 {"a":2,"b":2,"c":1}
    let summary = {};
    colors.forEach(x => {
      summary[x] = (summary[x] || 0) + 1;
    });
    // console.log(summary);
    const sorted = Object.entries(summary).sort((a, b) => b[1] - a[1]);
    const topColor = [];
    for (let el of sorted) {
      topColor.push(el[0]);
    }
    return topColor; // 많은 색 부터 순서대로 있는 배열
  });
};
