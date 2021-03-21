import './App.css';
import { Column } from './Column';
import { AppContainer } from './styles';
import { useAppState } from './AppStateContext';

function App() {
  const { state } = useAppState();

  return (
    <AppContainer>
      {state.lists.map((list, i) => (
        <Column id={list.id} text={list.text} key={list.id} index={i} />
      ))}
    </AppContainer>
  );
}

export default App;
