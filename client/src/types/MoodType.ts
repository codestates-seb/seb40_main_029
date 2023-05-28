export interface MoodObj {
  paletteCode: string;
  moodCode: string;
  colorCode: string;
  mood: MoodType;
  paletteKorName?: string;
}

type happy = '기쁨';
type sad = '슬픔';
type anger = '분노';
type flutter = '설렘';
type worry = '걱정';
type calm = '평온';
type sensitive = '예민';
type hope = '희망';

export type MoodType =
  | happy
  | sad
  | anger
  | flutter
  | worry
  | calm
  | sensitive
  | hope;
