import { TodoModal } from './Modal';
import styled from 'styled-components';
import useInput from '../../utils/useInput';
import axios from 'axios';
import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
const url = 'http://localhost:3001/data/';

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, todoBind, todoReset] = useInput('');

  useEffect(() => {
    const fetchData = () => {
      axios.get(url).then(res => setTodoList(res.data));
    };
    fetchData();
  }, []);

  const addTodo = () => {
    if (todoValue === '') {
      return;
    }
    const newTodoList = [...todoList];
    const newTodo = {
      // todoId: uuid(),
      title: todoValue,
      selected: false,
    };
    newTodoList.push(newTodo);
    axios.post(url, newTodo);
    setTodoList(newTodoList);
    todoReset();
  };

  const deleteTodo = id => {
    axios.delete(url + id);
    setTodoList(todoList.filter(e => e.id !== id));
    // setTodoList(todoList.filter(e => e.id !== id));
  };

  return (
    <TodoModal>
      <Wrapper>
        <TodoContainer>
          {todoList.map(each => {
            return (
              <Todo key={each.todoId} checked={each.selected}>
                <div>
                  <CheckButton checked={each.selected}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </CheckButton>
                  {each.title}
                </div>

                <DeleteButton onClick={() => deleteTodo(each.todoId)}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </DeleteButton>
              </Todo>
            );
          })}
        </TodoContainer>
        <InputContainer>
          <Input placeholder={'Enter 눌러 입력'} {...todoBind} />
          <InvisibleButton
            onClick={e => {
              e.preventDefault();
              addTodo();
            }}
          ></InvisibleButton>
        </InputContainer>
      </Wrapper>
    </TodoModal>
  );
};

export default TodoList;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 2%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TodoContainer = styled.div`
  height: 370px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Todo = styled.div`
  /* box-sizing: border-box; */
  display: flex;
  justify-content: space-between;
  /* width: 650px; */
  margin: 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(22, 27, 29, 0.25), -2px -2px 5px #faf8ff;
  padding: 10px;
  text-decoration: ${checked => (checked ? 'line-through' : 'none')};
  background-color: #ffffff;
`;

const InputContainer = styled.form`
  display: flex;
  width: 100%;
  border-top: 0.5px solid gray;
`;

const DeleteButton = styled.button`
  border: none;
  background: transparent;
`;

const Input = styled.input`
  border: none;
  width: 100%;
  box-shadow: 2px 2px 5px rgba(22, 27, 29, 0.25), -2px -2px 5px #faf8ff;
  padding: 4px 8px;
  border-radius: 10px;
  margin: 16px;
  padding: 10px 30px;
  ::placeholder {
    color: '#333435';
  }
`;
const InvisibleButton = styled.button`
  border: none;
  background: transparent;
`;
const CheckButton = styled.button`
  margin-right: 5px;
  border: none;
  background: transparent;

  path {
    color: ${selected => (selected ? 'green' : 'lightgray')};
  }
`;
