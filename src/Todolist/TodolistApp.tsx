import React, { useCallback, useEffect } from 'react';
import {v1} from 'uuid';
import {Todolist} from "./Todolist";
import {InputForm} from "./InputForm";
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../store";
import axios from 'axios';

export type TaskType = {
    idTask: string;
    taskTitle: string;
    isDone: boolean;
};

export type StateType = {
    idList: string;
    listTitle: string;
    filter: string;
    tasks: TaskType[];
};

export const TodolistApp = () => {

  // useEffect(() => {
  //   const responce = axios.get("http://localhost:4444/todolists/");
  // })

    const todostate = useSelector((store:StoreType)=>store.todolists)
    const action = useDispatch();
    const addTodolist = useCallback(
      (trimmedValue: string) => {
        action({ type: "ADD-TODO", listTitle: trimmedValue, idList: v1() });
      },
      [action]
    );
    return (
        <Wrapper>
            <InputForm addFromInput={addTodolist} defaultInput={'New list'}/>
            <Lists>
            {todostate.map((item) => <Todolist
                key={item.idList}
                idList={item.idList}
                listTitle={item.listTitle}
                filter={item.filter}
                tasks={item.tasks}
                action={action}
            />)}
            </Lists>
        </Wrapper>
    )
}




const Wrapper = styled.div`

`

const Lists = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`