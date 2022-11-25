import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Todos = ({ each, completeTodo, deleteTodo }) => {
  return (
    <Todo selected={each.selected}>
      <div>
        <CheckButton
          onClick={() => completeTodo(each.todoId)}
          selected={each.selected}
          disabled={each.selected}
        >
          <FontAwesomeIcon icon={faCircleCheck} />
        </CheckButton>
        {each.title}
      </div>

      <DeleteButton onClick={() => deleteTodo(each.todoId)}>
        <FontAwesomeIcon icon={faTrashCan} />
      </DeleteButton>
    </Todo>
  );
};

export default Todos;

const Todo = styled.div`
  /* box-sizing: border-box; */
  display: flex;
  justify-content: space-between;
  /* width: 650px; */
  margin: 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(22, 27, 29, 0.25), -2px -2px 5px #faf8ff;
  padding: 10px;
  text-decoration: ${({ selected }) => (selected ? 'line-through' : 'none')};
  background-color: #ffffff;
  :hover {
    text-decoration: none;
  }
`;

const DeleteButton = styled.button`
  border: none;
  background: transparent;
`;

const CheckButton = styled.button`
  margin-right: 5px;
  border: none;
  background: transparent;

  cursor: ${({ selected }) => (selected ? 'default' : 'pointer')};
  path {
    color: ${({ selected }) => (selected ? 'green' : 'lightgray')};
  }
`;
