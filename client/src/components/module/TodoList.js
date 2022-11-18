import { TodoModal } from './Modal';
import styled from 'styled-components';
import useInput from '../../utils/useInput';
import Input from '../atoms/Input';
import axios from 'axios';
import { useEffect, useState } from 'react';
import uuid from 'react-uuid';

const url = 'http://localhost:3001/data/';

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, todoBind, todoReset] = useInput('');

  useEffect(() => {
    const fetchData = async () => {
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
              <Todo key={each.todoId}>
                {each.title}
                <button onClick={() => deleteTodo(each.todoId)}>
                  삭제{each.todoId}
                </button>
              </Todo>
            );
          })}
        </TodoContainer>
        <InputContainer>
          <Input placeHolder={'할 일 적어보기...'} value={todoBind} />
          <button
            onClick={e => {
              e.preventDefault();
              addTodo();
            }}
          >
            +
          </button>
        </InputContainer>
      </Wrapper>
    </TodoModal>
  );
};

export default TodoList;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 5%;
  display: flex;
  flex-direction: column;
`;

const TodoContainer = styled.div``;

const Todo = styled.div``;

const InputContainer = styled.form``;
