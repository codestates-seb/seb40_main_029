import axios from 'axios';
import dayjs from 'dayjs';

export const topFourColors = async displayName => {
  // const URL = process.env.REACT_APP_BASIC_URL;
  const URL = process.env.REACT_APP_JSON_URL; // client 폴더에서 json-server ./data/dataMonth.json --port 4000 실행
  const currentMonth = dayjs(new Date()).format('MM');
  const path = `/mood/month/${displayName}/${currentMonth}`;
  function notNull(res) {
    if (res.moodPaletteDetails !== null) {
      return res;
    }
  }
  return await axios.get(URL + path).then(res => {
    let colorCodeArr = res.data.filter(notNull); // null 값 제거
    colorCodeArr = colorCodeArr.map(x => x.moodPaletteDetails.colorCode);
    // 색상별 개수 요약 {"a":2,"b":2,"c":1}
    let colorSummary = {};
    colorCodeArr.forEach(x => {
      colorSummary[x] = (colorSummary[x] || 0) + 1;
    });
    const colorSorted = Object.entries(colorSummary).sort(
      (a, b) => b[1] - a[1]
    );
    const topFourColors = [];
    for (let el of colorSorted) {
      topFourColors.push(el[0]);
    }
    return topFourColors; // 상위 4개 색상
  });
};
