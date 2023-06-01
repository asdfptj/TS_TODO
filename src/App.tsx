import { useState, useEffect } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import {
  Container,
  RowBox,
  Input,
  Button,
  List,
  Todo,
  Title,
  B2,
} from "./App.Styled";

interface Todo {
  id: number;
  name: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoName, setTodoName] = useState<string>("");
  //현재 수정중인 todo의 id를 담는 useState
  const [editId, setEditId] = useState<number | undefined>();
  const [editName, setEditName] = useState<string>("");
  // 수정 버튼을 누른 뒤 나온 Input의 값을 수정하는데 써야하기 때문에 static에 담아 놓는다

  const handleInputChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setTodoName(value);
  };

  // todo를 만드는 input에서 enter를 눌렀을 때 todo를 추가해주는 함수
  const handlePressEnter = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") addTodo();
  };

  // todo를 추가해주는 함수
  const addTodo = () => {
    // todoName이 빈값이면 추가하지 않음 (이후 코드 실행 x)
    if (!todoName.trim()) return;

    //localStorage에서 count를 +1 해줌 (id로 사용하기 위해)
    const count = Number(localStorage.getItem("count")) + 1;
    localStorage.setItem("count", `${count}`);
    // todos에 새로운 todo 추가
    setTodos((prevState) => [
      ...prevState,
      { id: prevState.length, name: todoName },
    ]);
  };

  // 초기화 해주는 함수
  const resetTodo = () => {
    setTodos([]);
    localStorage.setItem("count", "0");
  };

  // 수정할 todo의 내용을 Input의 onChange에서 setState 해주는 함수
  const handlerEditName = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setEditName(value);
  };

  // 컴포넌트(페이지)가 "처음" 렌더링 됐을 때 localStorage의 todos를 static에 넣어줌
  useEffect(() => {
    // JSON 함수는 에러가 나면 그냥 터져버리기 때믄에 try/catch로 감싸줌
    try {
      const parseData: Todo[] = JSON.parse(localStorage.getItem("todos") || "");
      setTodos(parseData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // static todos가 변환 될 때(추가, 삭제) localStorage에도 저장해줌
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <Container>
        <Title>Todo List</Title>
        <RowBox>
          <Input
            placeholder="Todo를 입력해주세요"
            value={todoName}
            onChange={handleInputChange}
            onKeyUp={handlePressEnter}
          />
          <Button onClick={addTodo}>추가</Button>
          <Button onClick={resetTodo}>초기화</Button>
        </RowBox>
        <List>
          {todos.map(({ id, name }) => {
            const isEdit: boolean = editId === id;

            const deletTodo = () => {
              setTodos((prevState) => prevState.filter((v) => v.id !== id));
            };

            const toggleEditTodo = () => {
              setEditName(name);
              setEditId(isEdit ? undefined : id);
            };

            const editTodo = () => {
              setTodos((prevState) =>
                prevState.map((todo) =>
                  todo.id === id ? { ...todo, name: editName } : todo
                )
              );
              toggleEditTodo();
            };

            return (
              <Todo key={id}>
                {isEdit ? (
                  <input defaultValue={editName} onChange={handlerEditName} />
                ) : (
                  name
                )}
                <B2 onClick={deletTodo}>삭제</B2>

                <B2 onClick={toggleEditTodo}>{isEdit ? "취소" : "수정"}</B2>
                {isEdit && <Button onClick={editTodo}>저장</Button>}
              </Todo>
            );
          })}
        </List>
      </Container>
    </>
  );
}

export default App;
