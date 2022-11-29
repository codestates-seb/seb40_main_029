import styled from 'styled-components';
import { ContentLayout } from './Layouts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

const Pages = styled.nav`
  position: absolute;
  bottom: 0;
  margin-bottom: 16px;
`;

const Page = styled.button`
  border: none;
  padding: 4px;
  margin: 2px;
  background-color: inherit;

  border-radius: 5px;
  &:hover {
    background-color: #f4f4f4;
  }
  &.active {
    background-color: #e3e3e3;
  }
`;

const Pagination = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);
  return (
    <>
      {numPages > 1 ? (
        <ContentLayout>
          <Pages>
            <Page onClick={() => setPage(page - 1)} disabled={page === 1}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </Page>
            {Array(numPages)
              .fill()
              .map((_, i) => (
                <Page
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={i + 1 === page ? 'active' : null}
                >
                  {i + 1}
                </Page>
              ))}
            <Page
              onClick={() => setPage(page + 1)}
              disabled={page === numPages}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </Page>
          </Pages>
        </ContentLayout>
      ) : null}
    </>
  );
};

export default Pagination;
