import { Mood, PaletteCode } from '../../../types/UserType';

/**
 * 친구의 기분
 * @typedef {object} Friend
 * @property {number} respondentId - readonly
 * @property {string} respondentDisplayName - 친구의 닉네임
 * @property {object} respondentMoodPaletteDetails - 친구의 기분
 */
export interface Friend {
  readonly respondentId: number;
  respondentDisplayName: string;
  respondentMoodPaletteDetails: {
    moodPaletteDetailsId: number;
    paletteCode: PaletteCode;
    moodCode: string;
    colorCode: string;
    mood: Mood;
  };
}

/**
 * 친구 무드카드 데이터
 * @typedef {object} FriendCard
 * @property {string} friend - 친구 닉네임
 * @property {string} friendsColor - 친구의 무드컬러 @memo 컬러코드가 따로 있는데 왜 굳이 또 find를 써가면서 뽑았을까? 데이터가 바뀌었던건지?
 */
export interface FriendCard {
  friend: Friend;
  friendsColor: Pick<
    Friend,
    'respondentMoodPaletteDetails'
  >['respondentMoodPaletteDetails'];
}
