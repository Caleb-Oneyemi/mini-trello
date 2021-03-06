import { AddNewItem } from './AddNewItem';
import { Card } from './Card';
import { ColumnContainer, ColumnTitle } from './styles';
import { useAppState } from './AppStateContext';

interface ColumnProps {
    text: string
    index: number
    id: string
}

export const Column = ({ text, index, id }: ColumnProps) => {
    const { state, dispatch } = useAppState();

    return (
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
            {state.lists[index].tasks.map((task: any, i: any) => (
                <Card text={task.text} key={task.id} index={i} group={state.lists[index].text}/>
            ))}
            <AddNewItem
                toggleButtonText='+ Add another task'
                onAdd={text => dispatch({ type: 'ADD_TASK', payload: { text, taskId: id } })}
                dark
            />
        </ColumnContainer>
    )
}