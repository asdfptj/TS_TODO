import styled from "styled-components";

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const RowBox = styled.div`
  align-items: center;
`;

export const Input = styled.input`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  width: 500px;
  height: 30px;
`;
export const Button = styled.button`
  font-weight: bold;
  right: 100px;
  text-align: center;
  background-color: #fff;
  border-color: rgb(61, 61, 61);
  border-style: solid;
  border-radius: 0px;
  height: 36px;
  cursor: pointer;
`;
export const B2 = styled.button`
  border: 1px solid black;
  background-color: #fff;
  float: right;
  cursor: pointer;
`;
export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 605px;
  align-items: center;
`;
export const Title = styled.h1``;
export const Todo = styled.li`
  margin-bottom: 10px;
  border: 1px solid #ccc;
  background: #eee;
  padding: 5px 10px;
`;
