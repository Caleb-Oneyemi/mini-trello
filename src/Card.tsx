/* eslint-disable no-restricted-globals */
import { CardContainer } from './styles';

interface CardProps {
    text: string
    index: number
    id?: any
    columnId?: any
    onDoubleClick?: any
    group?: any
}

const moveCard = (group: any, index: any) => {
    if (group === 'To Do') {
        let todoItems: any = localStorage.getItem('todo');
        let progressItems: any = localStorage.getItem('progress');
        let movedItem = JSON.parse(todoItems)[index];

        console.log('todoItems', todoItems)
        console.log('progressItems', progressItems)
        console.log('movedItem', movedItem)

        todoItems = JSON.parse(todoItems);
        todoItems.splice(index, 1);
        localStorage.setItem('todo', JSON.stringify(todoItems));
        progressItems = JSON.parse(progressItems);
        progressItems.push(movedItem);
        localStorage.setItem('progress', JSON.stringify(progressItems));
        location.reload();
    } else if (group === 'In Progress') {
        let progressItems: any = localStorage.getItem('progress');
        let doneItems: any = localStorage.getItem('done');
        let movedItem = JSON.parse(progressItems)[index];

        progressItems = JSON.parse(progressItems);
        progressItems.splice(index, 1);
        localStorage.setItem('progress', JSON.stringify(progressItems));
        doneItems = JSON.parse(doneItems);
        doneItems.push(movedItem);
        localStorage.setItem('done', JSON.stringify(doneItems));
        location.reload();
    } else {
        let doneItems: any = localStorage.getItem('done');
        doneItems = JSON.parse(doneItems);
        doneItems.splice(index, 1);
        localStorage.setItem('done', JSON.stringify(doneItems));
        location.reload();
    }
}

export const Card = ({ text, group, index }: CardProps) => {
    return <CardContainer onDoubleClick={() => moveCard(group, index) }>{text}</CardContainer>
}