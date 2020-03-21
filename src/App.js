import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {withLoader} from "./hocs/with-loader";
import {withDataSource} from "./hocs/with-data-source";

function DemoComponentBase(props) {
  const {data} = props;

  return (
    <div>
      {
        data ? data[0].repo.name : 'Loading ...'
      }
    </div>
  )
}

const DemoComponent = withDataSource(DemoComponentBase, {
  url: 'users/JakovRus/events1',
  contentType: 'json',
  errors: [{code: 404, message: 'Not found1'}]
});

function AppBase() {
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        {
          visible && <DemoComponent/>
        }
        <button onClick={show}>mount demo component</button>
        <button onClick={hide}>unmount demo component</button>
      </header>
    </div>
  );
}

const App = withLoader(AppBase);
export default App;
