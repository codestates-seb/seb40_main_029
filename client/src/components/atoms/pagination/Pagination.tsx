import { ContentLayout } from '../layout/Layouts';
import * as Style from './PaginationStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);
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
