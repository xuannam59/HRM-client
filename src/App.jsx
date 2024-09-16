import store from "./redux/store";
import Router from "./routers/Router"
import { Provider } from 'react-redux';

function App() {

  return (
    <>
      <Provider store={store}>
        <Router />
      </Provider>
    </>
  )
}

export default App
