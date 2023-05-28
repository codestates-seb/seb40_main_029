import { ContentLayout } from '../../atoms/layout/Layouts';
import MoodSelector from '../../module/mood/MoodSelector';
import { ModalContainer } from './IsFullModalStyle';

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
      {children ? <ModalContainer>{children}</ModalContainer> : null}
    </ContentLayout>
  );
};

export default IsFullModal;
