import { ContentLayout } from '../../atoms/layout/Layouts';
import MoodSelector from '../../module/mood/MoodSelector';

interface FullPageProp {
  isFull: boolean;
  children: React.ReactNode;
}

const IsFullModal: React.FC<FullPageProp> = ({ isFull, children }) => {
  return (
    <ContentLayout>
      {isFull ? null : (
        <div>
          <MoodSelector
            lookbackRefresher={undefined}
            pointRefresher={undefined}
          />
        </div>
      )}
      <div style={{ display: 'flex', width: '100%' }}>{children}</div>
    </ContentLayout>
  );
};

export default IsFullModal;
