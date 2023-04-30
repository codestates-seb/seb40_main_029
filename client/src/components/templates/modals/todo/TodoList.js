import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { memberIdSelector } from '../../../../redux/hooks';
import axios from 'axios';
import useInput from '../../../../utils/useInput';
import { TodoModal } from '../../../module/modal/Modal';
import Todos from '../../../module/todo/Todos';
import styled from 'styled-components';

const URL = `${process.env.REACT_APP_BASIC_URL}/todo/`;
const selected = 'selected/';
const today = 'today/';
const update = 'update/';

const TodoList = ({ lookbackRefresher }) => {
  const memberId = `${useSelector(memberIdSelector)}/`;

  const [todoList, setTodoList] = useState([]);
  const [todoValue, todoBind, todoReset] = useInput('');

  useEffect(() => {
    axios.get(URL + today + memberId).then(res => {
      const newTodoList = res.data.filter(each => each.selected === false);
      const doneList = res.data.filter(each => each.selected === true);

      setTodoList([...newTodoList, ...doneList]);
    });
  }, []);

  const addTodo = () => {
    if (todoValue === '') {
      return;
    }
    axios.post(URL + memberId, { title: todoValue }).then(res => {
      const newTodoList = todoList.filter(each => each.selected === false);
      const doneList = todoList.filter(each => each.selected === true);
      newTodoList.push({
        todoId: res.data.todoId,
        title: res.data.title,
        selected: res.data.selected,
      });
      setTodoList([...newTodoList, ...doneList]);
      todoReset();
      // lookbackRefresher();
    });
  };

  const completeTodo = todoId => {
    axios.patch(URL + selected + memberId + todoId).then(res => {
      const newTodoList = todoList.filter(
        each => each.todoId !== res.data.data.todoId
      );
      newTodoList.push({
        todoId: res.data.data.todoId,
        title: res.data.data.title,
        selected: res.data.data.selected,
      });
      setTodoList(newTodoList);
      // lookbackRefresher();
    });
  };

  const deleteTodo = todoId => {
    axios.delete(URL + memberId + todoId);
    // axios.delete(URL + memberId + todoId).then(() => lookbackRefresher());
    setTodoList(todoList.filter(each => each.todoId !== todoId));
  };

  const lookBack = () => {
    axios.patch(URL + update + memberId).then(res => {
      const safe = [];
      for (const each of res.data) {
        const test = todoList.filter(ea => ea.todoId === each.todoId);
        if (test.length === 0) {
          safe.push(each);
        }
      }
      setTodoList([...safe, ...todoList]);
      // lookbackRefresher();
    });
  };

  return (
    <TodoModal lookBack={lookBack}>
      <Wrapper>
        <TodoContainer>
          {todoList.map(each => (
            <Todos
              key={each.todoId}
              each={each}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
            />
          ))}
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

const InputContainer = styled.form`
  display: flex;
  width: 100%;
  border-top: 0.5px solid gray;
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
