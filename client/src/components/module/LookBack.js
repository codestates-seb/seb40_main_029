import styled from 'styled-components';
import axios from 'axios';
import { LookBackModal } from './Modal';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import { Pie } from './Charts';
import ActivityCalendar from './ActivityCalendar';
import { paletteCodeSelector } from '../../redux/hooks';
import { useSelector } from 'react-redux';
import { memberIdSelector, displayNameSelector } from '../../redux/hooks';

const URL = `${process.env.REACT_APP_JSON_URL}/`;
const p = 'palette/';
const m = 'mood/';
const t = 'todo/';

// memberId, displayname 필요
const dum = [
  '#F7B0BE',
  '#2178AE',
  '#ED8E83',
  '#EF3C23',
  '#F15A42',
  '#FAC92C',
  '#CFE5CC',
  '#1B4793',
];

const LookBack = ({ lookbackRefresh }) => {
  const paletteCode = useSelector(paletteCodeSelector);
  const memberId = useSelector(memberIdSelector);
  const displayName = useSelector(displayNameSelector);
  const [palette, setPalette] = useState([]);

  useEffect(() => {
    // axios.get(URL + p + paletteCode).then(res => {
    //   // const arr = [];
    //   // for (const each of res.data) {
    //   //   arr.push('#' + each.colorCode);
    //   // }
    //   // setPalette(arr);
    //   setPalette(res.data.map(each => '#' + each.colorCode));
    // });
    setPalette(dum.map(each => each));

    // axios.get(URL + m + displayName).then(res => {   <--- 이걸 살려야 함
    axios.get(URL + 'moods').then(res => {
      setData(
        res.data
          .filter(each => each.moodPaletteDetails !== null)
          .map(each => {
            const details = each.moodPaletteDetails;
            each.count =
              details !== null ? Number(details.moodCode[3]) * 50 - 25 : 0;
            each.date = dayjs(each.createdAt).format('YYYY-MM-DD');
            return each;
          })
      );
      handleSetPieData(res.data, Number(year), palette);
    });

    axios.get(URL + t + memberId).then(res => {
      setTodoData(res.data);
    });
  }, [lookbackRefresh]);

  const today = new Date();
  const [data, setData] = useState([]);
  const [todoData, setTodoData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [selected, setSelected] = useState(dayjs(today).format('YYYY-MM-DD'));
  const [viewDetails, setViewDetails] = useState(false);
  const [year, setYear] = useState(today.getFullYear());

  const withoutDup = data.filter(e => e.date === selected);
  const selectedData = withoutDup.pop();
  const selectedTodoData = todoData.filter(
    e => dayjs(e.createdAt).format('YYYY-MM-DD') === selected
  );

  const extent = [];
  for (const each of data) {
    const year = Number(dayjs(each.date).format('YYYY'));
    extent.includes(year) ? null : extent.push(year);
  }
  extent.sort((a, b) => a - b);

  const handleSetYear = num => {
    const max = extent[extent.length - 1];
    const min = extent[0];
    const output = year + num;
    if (output < min || output > max) {
      return;
    }
    handleSetPieData(data, output);
    return setYear(output);
  };

  const handleSetPieData = (data, year) => {
    const moods = {
      기쁨: 0,
      슬픔: 0,
      분노: 0,
      설렘: 0,
      걱정: 0,
      평온: 0,
      예민: 0,
      희망: 0,
    };
    const filtered = data.filter(
      ea => Number(dayjs(ea.date).format('YYYY')) === year
    );

    for (const each of filtered) {
      if (each.moodPaletteDetails !== null) {
        moods[each.moodPaletteDetails.mood] += 1;
      }
    }

    const moodsKeys = Object.keys(moods);
    const moodsValues = Object.values(moods);
    const result = [];
    for (let i = 0; i < 8; i++) {
      if (moodsValues[i] !== 0) {
        result.push({
          id: moodsKeys[i],
          label: moodsKeys[i],
          value: moodsValues[i],
          code: moodsKeys.indexOf(moodsKeys[i]),
        });
      }
    }
    setPieData(result);
  };

  const handleViewDetails = () => {
    const selection = window.getSelection();
    if (selection.type != 'Range') {
      setViewDetails(!viewDetails);
    }
  };

  return (
    <LookBackModal>
      <Wrapper>
        {data.length === 0 ? (
          <article>
            <p>기록된 무드가 없어요</p>
          </article>
        ) : (
          <>
            <CalendarContainer>
              <LeftRightContainer>
                <LeftRight>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    onClick={() => {
                      handleSetYear(-1);
                    }}
                  />
                  <Spacer />
                </LeftRight>
              </LeftRightContainer>
              <ActivityCalendar
                palette={palette}
                year={year}
                data={data.filter(
                  each => dayjs(each.date).format('YYYY') === `${year}`
                )}
                setSelected={setSelected}
                showWeekdayLabels={true}
                blockMargin={5}
                blockSize={11}
              />

              <LeftRightContainer>
                <LeftRight>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    onClick={() => handleSetYear(1)}
                  />
                  <Spacer />
                </LeftRight>
              </LeftRightContainer>
            </CalendarContainer>
            <StatisticsContainer>
              <PieCard>
                <div>{year}년 회고</div>
                <Pie pieData={pieData} year={year} palette={palette} />
              </PieCard>
              <MoodCard>
                <Title>하루 돌아보기</Title>
                <CardContainer viewDetails={viewDetails}>
                  <Mood
                    viewDetails={viewDetails}
                    color={
                      selectedData === undefined
                        ? '#eeeeee'
                        : palette[
                            Number(
                              selectedData.moodPaletteDetails.moodCode[3]
                            ) - 1
                          ]
                    }
                  />
                  <Info>
                    <Type>
                      {selectedData === undefined
                        ? ''
                        : selectedData.moodPaletteDetails.mood}
                    </Type>
                    <Hexcode>{selected}</Hexcode>
                    <Contents
                      onClick={() => handleViewDetails()}
                      viewDetails={viewDetails}
                    >
                      {viewDetails ? (
                        <Details data={selectedData} todo={selectedTodoData} />
                      ) : (
                        '자세히보기'
                      )}
                    </Contents>
                  </Info>
                </CardContainer>
              </MoodCard>
            </StatisticsContainer>
          </>
        )}
      </Wrapper>
    </LookBackModal>
  );
};

const Details = ({ data, todo }) => {
  const done = todo.filter(e => e.selected === true);
  const notyet = todo.filter(e => e.selected === false);

  return (
    <article>
      <br />
      <h3>이날 있었던 일</h3>
      <article>{data.body === '' ? '-' : data.body}</article>
      <br />
      <h3>이날 완료한 일</h3>
      <article>
        {done.length === 0
          ? '-'
          : done.map(each => <li key={each.todoId}>{each.title}</li>)}
      </article>
      <br />
      <h3>이날 완료 못한 일</h3>
      <article>
        {notyet.length === 0
          ? '-'
          : notyet.map(each => <li key={each.todoId}>{each.title}</li>)}
      </article>
      <br />
    </article>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
const CalendarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 90%;
  height: 200px;
`;

const PieCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 45%;
`;

const MoodCard = styled(PieCard)`
  width: 40%;
`;

const StatisticsContainer = styled(CalendarContainer)`
  height: 50%;
  justify-content: center;
`;

const LeftRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;
const LeftRight = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: transparent;
  border: none;
  margin: 40px 0;
  font-size: 30px;
  path {
    color: #333435;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: ${({ viewDetails }) => (viewDetails ? '340px' : '190px')};
  height: 260px;
  background-color: white;
  /* border: 1px solid; */
  box-shadow: 2px 2px 5px rgba(22, 27, 29, 0.25), -2px -2px 5px #faf8ff;
  transition: width 0.2s;
  animation-timing-function: ease-in-out;
`;

const Title = styled.div`
  margin-bottom: 10px;
`;

const Spacer = styled.div`
  height: 13px;
`;

const Mood = styled.div`
  width: ${({ viewDetails }) => (viewDetails ? '330px' : '180px')};
  height: 195px;
  margin: 5px 5px 0 5px;
  background-color: ${({ color }) => color};
  transition-property: width, background-color;
  transition-duration: 0.2s;
  /* transition: background-color 0.2s; */
  animation-timing-function: ease-in-out;
`;

const Info = styled.div`
  width: 100%;
  margin: 5px auto auto auto;
  padding: 5px;
  text-align: left;
`;

const Type = styled.div`
  height: 20px;
  line-height: 20px;
  font-size: 20px;
  font-weight: 800;
`;

const Hexcode = styled.div`
  height: 18px;
  font-size: 12px;
  font-weight: 300;
  margin-bottom: 5px;
`;
const Contents = styled.div`
  height: ${({ viewDetails }) =>
    viewDetails ? '197px' : '22px'}; //460 - 94 - 10

  font-size: 12px;
  font-weight: 300;
  white-space: pre-line;
  overflow-y: scroll;
  transition: height 0.2s;
  animation-timing-function: ease-in-out;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default LookBack;

// const d1 = new Date('2021-01-01');
// const d2 = new Date('2022-12-31');
// const getDatesInRange = (startDate, endDate) => {
//   const date = new Date(startDate.getTime());

//   const moods = [];
//   const todos = [];

//   let todoId = 1;
//   let moodId = 1;

//   const todos_nom = [
//     '할 일 AAAA',
//     '마트에서 장보기',
//     '블로그 작성하기',
//     '밀린 메일 답장하기',
//     '할 일 BBBB',
//     '할 일 CCCC',
//     '코드 리뷰',
//     '일기 쓰기',
//     '할 일 DDDD',
//     '알고리즘 문제 풀기',
//     '책 읽기',
//     '스트레칭 및 가벼운 운동',
//     '할 일 EEEE',
//   ];

//   const body_nom = [
//     '',
//     '이런이런 일이 있었음...',
//     '이런이런 일이 있었음... 저런저런 일도 있었음...',
//     '이런이런 일이 있었고... 저런저런 일도 있어서... 이러저러한 이유로 나의 심경은 이러했음...',
//   ];

//   const list = {
//     1: '기쁨',
//     2: '슬픔',
//     3: '분노',
//     4: '설렘',
//     5: '걱정',
//     6: '평온',
//     7: '예민',
//     8: '희망',
//   };

//   const colorList = {
//     1: 'E7AF8D',
//     2: 'B0AEBA',
//     3: 'CD686D',
//     4: 'E08890',
//     5: 'A2A987',
//     6: 'F0DCB1',
//     7: 'BEB5BF',
//     8: 'A9C0C5',
//   };

//   while (date <= endDate) {
//     const numbers_of_todo = Math.floor(Math.random() * 14) + 0;
//     const selected = [true, false];
//     const day = dayjs(date).format('YYYY-MM-DD');

//     if (numbers_of_todo !== 0) {
//       for (let i = 0; i < numbers_of_todo; i++) {
//         const obj = {
//           todoId,
//           title: todos_nom[Math.floor(Math.random() * todos_nom.length)],
//           selected: selected[Math.floor(Math.random() * selected.length)],
//           createdAt: day,
//         };
//         todos.push(obj);
//         todoId++;
//       }
//     }

//     const mood = Math.floor(Math.random() * 8) + 1;
//     const mood_obj = {
//       body: body_nom[Math.floor(Math.random() * body_nom.length)],
//       createdAt: day,
//       memberId: 1,
//       moodId,
//       moodPaletteDetails: {
//         mood: list[mood],
//         moodCode: 'm00' + mood,
//         colorCode: colorList[mood],
//       },
//     };

//     moods.push(mood_obj);
//     moodId++;
//     date.setDate(date.getDate() + 1);
//   }

//   return { moods, todos };
// };

// const { moods, todos } = getDatesInRange(d1, d2);
// axios.post('jsonURL' + 'moods', moods);
// axios.post('jsonURL' + 'todos', todos);
// console.log(moods);
// console.log(todos);
