import { ContentLayout } from '../layout/Layouts';
import * as Style from './PaginationStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

interface PaginationType {
  total: number; //총 컨텐츠 개수
  limit: number; //최대 컨텐츠 개수
  page: number; //페이지 개수
  setPage: React.Dispatch<React.SetStateAction<number>>; //페이지 개수 세팅
}
const Pagination = ({ total, limit, page, setPage }: PaginationType) => {
  const numPages = total > 0 && limit > 0 ? Math.ceil(total / limit) : 1;
  return (
    <>
      {numPages > 1 ? (
        <ContentLayout>
          <Style.Pages>
            <Style.Page onClick={() => setPage(page - 1)} disabled={page === 1}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </Style.Page>
            {Array(numPages)
              .fill(undefined)
              .map((_, i) => (
                <Style.Page
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={i + 1 === page ? 'active' : null}
                >
                  {i + 1}
                </Style.Page>
              ))}
            <Style.Page
              onClick={() => setPage(page + 1)}
              disabled={page === numPages}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </Style.Page>
          </Style.Pages>
        </ContentLayout>
      ) : null}
    </>
  );
};

export default Pagination;
