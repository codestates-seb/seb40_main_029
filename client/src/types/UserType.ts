export type PaletteCode = 'P001' | 'P002' | 'P003' | 'P004' | 'P005' | 'P006';
export type PaletteName =
  | '기본'
  | '테라코타'
  | '빈티지'
  | '크리스마스'
  | '모노'
  | '비비드';
export type Mood =
  | '기쁨'
  | '슬픔'
  | '분노'
  | '설렘'
  | '걱정'
  | '평온'
  | '예민'
  | '희망';

/**
 * 팔레트 object
 * @property {PaletteCode} palette code
 * @property {PaletteName} palett name
 */
export interface MoodPalette {
  paletteCode: PaletteCode;
  paletteName: PaletteName;
}

/**
 * 유저가 현재 사용중인 팔레트명
 * @typedef {object} SettedPalette
 * @property {PaletteName} palette - 팔레트명
 */
export interface SettedPalette {
  palette: PaletteName;
}

/**
 * 팔레트 세부정보
 * @typedef {object} Palette
 * @property {number} memberPaletteId
 * @property {object} moodPalette - 팔레트코드와 팔레트명
 */
export interface Palette {
  readonly memberPaletteId: number;
  moodPalette: MoodPalette;
}

/**
 * 유저 데이터
 * @typedef {object} UserType
 * @property {number} memberId
 * @property {string} email - 유저가 가입할 때 사용한 구글 이메일
 * @property {string} displayName - 유저 닉네임
 * @property {SettedPalette} palette - 유저가 사용중인 팔레트
 * @property {number} point - 유저가 보유중인 포인트
 * @property {'USER'} role - @memo role이 admin도 있는지 확인해볼것
 * @property {Palette[]} palettes - 유저가 보유중인 팔레트 리스트
 * @property {string[]} friends - 유저의 친구
 */
export interface UserType {
  readonly memberId: number;
  email: string;
  displayName: string;
  palette: SettedPalette;
  point: number;
  role: 'USER' | 'ADMIN';
  palettes: Palette[];
  friends: string[];
}
