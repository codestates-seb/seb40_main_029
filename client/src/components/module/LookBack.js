import styled from 'styled-components';
import axios from 'axios';
import { LookBackModal } from './Modal';
import { useEffect, useState } from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';
import { BasicTooltip } from '@nivo/tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

const URL = 'http://localhost:4000/mood';
const URL2 = 'http://ec2-15-165-76-0.ap-northeast-2.compute.amazonaws.com:8080';

const LookBack = () => {
  useEffect(() => {
    axios.get(URL).then(res => {
      // console.log(...res.data);
      setData(res.data);
      // const copied = [...res.data];

      // const test = copied.map(each => {
      //   const year = dayjs(each.day).format('YYYY');
      //   each.year = year;
      //   return each;
      // });

      // axios.patch(URL, test);
      // console.log(test);
    });
    axios.get(URL2 + '/mood/회원1/').then(res => {
      const copy = [...res.data];
      copy.map(each => {
        const year = dayjs(each.createdAt).format('YYYY');
        const day = dayjs(each.createdAt).format('YYYY-MM-DD');
        each.createdAt = day;
        each.year = year;
        return each;
      });
      console.log(copy);
    });
  }, []);
  const [data, setData] = useState([]);

  const callTooltip = ({ date, color, value }) => {
    const dayStr = dayjs(date).format('M월 D일');
    const list = {
      25: '기쁨',
      75: '슬픔',
      125: '분노',
      175: '설렘',
      225: '걱정',
      275: '평온',
      325: '예민',
      375: '희망',
    };

    return (
      <BasicTooltip id={dayStr} value={list[value]} color={color} enableChip />
    );
  };
  const theYear = 2022;
  return (
    <LookBackModal>
      <Wrapper>
        <CalendarContainer>
          <LeftRightContainer>
            <LeftRight>
              <FontAwesomeIcon icon={faChevronLeft} />
            </LeftRight>
          </LeftRightContainer>

          <ResponsiveCalendar
            data={data.filter(
              each => dayjs(each.day).format('YYYY') === `${theYear}`
            )}
            from="2022-01-01"
            to="2022-12-31"
            emptyColor="#eeeeee"
            colors={[
              '#f7b0be',
              '#ed8e83',
              '#ef3c23',
              '#f15a42',
              '#fac92c',
              '#cfe5cc',
              '#2178ae',
              '#1b4793',
            ]}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={40}
            monthBorderColor="#ffffff"
            dayBorderWidth={2}
            dayBorderColor="#ffffff"
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left',
              },
            ]}
            tooltip={callTooltip}
            onClick={day => {
              console.log(day.day);
            }}
            daySpacing={1.5}
          />
          <LeftRightContainer>
            <LeftRight>
              <FontAwesomeIcon icon={faChevronRight} />
            </LeftRight>
          </LeftRightContainer>
        </CalendarContainer>
        <div>안녕</div>
      </Wrapper>
    </LookBackModal>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
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
  height: 80%;
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

export default LookBack;
