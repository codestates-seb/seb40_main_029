import { TodoModal } from './Modal';
import styled from 'styled-components';
import useInput from '../../utils/useInput';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Todos from './Todos';

const URL = 'http://ec2-15-165-76-0.ap-northeast-2.compute.amazonaws.com:8080/';
const URL2 = 'https://521a-211-58-204-152.jp.ngrok.io:8080/';
const path = 'todo/';
const selected = 'selected/';
const member_id = '15/';
const today = 'today/';

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, todoBind, todoReset] = useInput('');

  useEffect(() => {
    axios.get(URL + path + today + member_id).then(res => {
      const newTodoList = res.data.filter(each => each.selected === false);
      const doneList = res.data.filter(each => each.selected === true);

      setTodoList([...newTodoList, ...doneList]);
    });
  }, []);

  const addTodo = () => {
    if (todoValue === '') {
      return;
    }
    axios.post(URL + path + member_id, { title: todoValue }).then(res => {
      const newTodoList = todoList.filter(each => each.selected === false);
      const doneList = todoList.filter(each => each.selected === true);
      newTodoList.push({
        todoId: res.data.todoId,
        title: res.data.title,
        selected: res.data.selected,
      });
      setTodoList([...newTodoList, ...doneList]);
      todoReset();
    });
  };

  const completeTodo = todoId => {
    axios.patch(URL + path + selected + member_id + todoId).then(res => {
      // console.log(res);
      const newTodoList = todoList.filter(
        each => each.todoId !== res.data.data.todoId
      );
      newTodoList.push({
        todoId: res.data.data.todoId,
        title: res.data.data.title,
        selected: res.data.data.selected,
      });
      console.log(res.data);
      setTodoList(newTodoList);
    });
  };

  const deleteTodo = todoId => {
    axios.delete(URL + path + member_id + todoId);
    setTodoList(todoList.filter(each => each.todoId !== todoId));
    // setTodoList(todoList.filter(e => e.id !== id));
  };

  const lookBack = () => {
    axios.patch(URL + path + 'update/' + member_id).then(res => {
      console.log(res.data);
      setTodoList([...res.data, ...todoList]);
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
