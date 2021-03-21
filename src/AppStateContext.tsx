import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { uuid } from 'uuidv4';
import { findItemIndexById } from './utils/findItemIndexById';


interface AppStateContextProps {
    state: AppState
    dispatch: any
}

interface List {
    id: string
    text: string
    tasks: any
}

export interface AppState {
    lists: List[]
}

type Action = {
    type: 'ADD_TASK'
    payload: { text: string, taskId: string }
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

const appData: AppState = {
    lists: [
        {
            id: '0',
            text: 'To Do',
            tasks: []
        },
        {
            id: '1',
            text: 'In Progress',
            tasks: []
        },
        {
            id: '2',
            text: 'Done',
            tasks: []
        }
    ]
}

const todo: any = localStorage.getItem('todo');
const progress: any = localStorage.getItem('progress');
const done: any = localStorage.getItem('done');

const todoData = localStorage.getItem('todo') ? JSON.parse(todo) : [];
const progressData = localStorage.getItem('progress') ? JSON.parse(progress) : [];
const doneData = localStorage.getItem('done') ? JSON.parse(done) : [];

appData.lists[0].tasks = todoData;
appData.lists[1].tasks = progressData;
appData.lists[2].tasks = doneData;

const appStateReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'ADD_TASK': {
            const id = uuid();

            const targetLaneIndex = findItemIndexById(
                state.lists,
                action.payload.taskId
            )

            state.lists[targetLaneIndex].tasks.push({
                id,
                text: action.payload.text
            })

            return {
                ...state
            }
        }
            
        default: {
            return state
        }
    }
}

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(appStateReducer, appData);
    const todoData: any = state.lists[0].tasks;
    const progressData: any = state.lists[1].tasks;
    const doneData: any = state.lists[2].tasks;

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(todoData));
        localStorage.setItem('progress', JSON.stringify(progressData));
        localStorage.setItem('done', JSON.stringify(doneData))
    })

    return (
        <AppStateContext.Provider value={{ state, dispatch }}>
            {children}
        </AppStateContext.Provider>
    )
}

export const useAppState = () => {
    return useContext(AppStateContext);
}