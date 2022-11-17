// import styled from 'styled-components';
// import Button from '../atoms/Button';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar, faMinus } from '@fortawesome/free-solid-svg-icons';
// import { useState } from 'react';
// import BookmarkCreate from './BookmarkCreate';
// import BookmarkEdit from './BookmarkEdit';

// const LightIcon = styled.span`
//   svg {
//     vertical-align: 0 !important; /* fontawsome icon 가운데정렬 */
//   }
//   path {
//     color: #cbcccd;
//   }
// `;
// export const CenterLayout = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `;

// const BookmarkHandle = ({ booksArr, setBookmarkArr }) => {
//   const [addBtnIsOpen, setAddBtnIsOpen] = useState(false);
//   const [ListIsOpen, setListIsOpen] = useState(false);
//   const onClickAddBtn = () => {
//     setAddBtnIsOpen(!addBtnIsOpen);
//   };
//   const handleBookmarkEdit = () => {
//     setListIsOpen(!ListIsOpen);
//   };
//   return (
//     <>
//       <Button size="circle" onClick={onClickAddBtn}>
//         <LightIcon>
//           <FontAwesomeIcon icon={faStar} />
//         </LightIcon>
//       </Button>
//       <Button size="circle" onClick={handleBookmarkEdit}>
//         <LightIcon>
//           <FontAwesomeIcon icon={faMinus} size="lg" />
//         </LightIcon>
//       </Button>
//       {addBtnIsOpen ? (
//         <CenterLayout>
//           <BookmarkCreate
//             setAddBtnIsOpen={setAddBtnIsOpen}
//             setBookmarkArr={setBookmarkArr}
//             booksArr={booksArr}
//           />
//         </CenterLayout>
//       ) : null}
//       {ListIsOpen ? (
//         <CenterLayout>
//           <BookmarkEdit />
//         </CenterLayout>
//       ) : null}
//     </>
//   );
// };

// export default BookmarkHandle;

import styled from 'styled-components';
import Button from '../atoms/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import BookmarkCreate from './BookmarkCreate';

const LightIcon = styled.span`
  svg {
    vertical-align: 0 !important; /* fontawsome icon 가운데정렬 */
  }
  path {
    color: #cbcccd;
  }
`;
export const CenterLayout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BookmarkHandle = ({ booksArr, setBookmarkArr }) => {
  const [addBtnIsOpen, setAddBtnIsOpen] = useState(false);
  const onClickAddBtn = () => {
    setAddBtnIsOpen(!addBtnIsOpen);
  };
  return (
    <>
      <Button size="circle" onClick={onClickAddBtn}>
        <LightIcon>
          <FontAwesomeIcon icon={faStar} />
        </LightIcon>
      </Button>
      {addBtnIsOpen ? (
        <CenterLayout>
          <BookmarkCreate
            setAddBtnIsOpen={setAddBtnIsOpen}
            setBookmarkArr={setBookmarkArr}
            booksArr={booksArr}
          />
        </CenterLayout>
      ) : null}
    </>
  );
};

export default BookmarkHandle;
