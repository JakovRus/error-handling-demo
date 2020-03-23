import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {withLoader} from "./hocs/with-loader";
import {withService} from "./hocs/with-service";
import {GITHUB_SERVICE_NAME} from "./services/github";

function DemoComponentBase(props) {
  const [data, setData] = useState(null);
  const {service} = props;

  useEffect(() => {
    service.getRepository()
      .then(res => setData(res))
  }, []);

  return (
    <div>
      {
        data ? data[0].repo.name : 'Loading ...'
      }
    </div>
  )
}

const DemoComponent = withService(DemoComponentBase, {
  serviceName: GITHUB_SERVICE_NAME,
  errors: [{code: 404, message: 'Not found'}]
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
