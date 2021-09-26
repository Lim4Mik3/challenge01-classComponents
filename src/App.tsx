import { BrowserRouter as Router } from 'react-router-dom';
import { FoodsContextProvider } from './hooks/useFoods';
import { ModalContextProvider } from './hooks/useModal';

import Routes from './routes';

import GlobalStyle from './styles/global';

const App = () => (
  <FoodsContextProvider>
    <ModalContextProvider>
      <GlobalStyle />
      <Router>
        <Routes />
      </Router>
    </ModalContextProvider>
  </FoodsContextProvider>
);

export default App;
