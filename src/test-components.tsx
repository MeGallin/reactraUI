import { useState } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from './theme';
import Checkbox from './components/Checkbox';
import Radio from './components/Radio';
import Switch from './components/Switch';
import Button from './components/Button';

const TestApp = () => {
  const [checkboxState, setCheckboxState] = useState(false);
  const [radioState, setRadioState] = useState('option1');
  const [switchState, setSwitchState] = useState(false);

  return (
    <ThemeProvider>
      <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
        <h1>Component Test</h1>

        <h2>Checkbox Test</h2>
        <div>
          <Checkbox
            label={`Checkbox is ${checkboxState ? 'checked' : 'unchecked'}`}
            checked={checkboxState}
            onToggle={setCheckboxState}
          />
          <div>
            <Button onClick={() => setCheckboxState(!checkboxState)}>
              Toggle Checkbox State
            </Button>
          </div>
        </div>

        <h2>Radio Test</h2>
        <div>
          <div>Selected: {radioState}</div>
          <Radio
            label="Option 1"
            checked={radioState === 'option1'}
            onToggle={() => setRadioState('option1')}
            name="test-radio"
            value="option1"
          />
          <Radio
            label="Option 2"
            checked={radioState === 'option2'}
            onToggle={() => setRadioState('option2')}
            name="test-radio"
            value="option2"
          />
          <Radio
            label="Option 3"
            checked={radioState === 'option3'}
            onToggle={() => setRadioState('option3')}
            name="test-radio"
            value="option3"
          />
        </div>

        <h2>Switch Test</h2>
        <div>
          <Switch
            label={`Switch is ${switchState ? 'on' : 'off'}`}
            checked={switchState}
            onToggle={setSwitchState}
          />
          <div>
            <Button onClick={() => setSwitchState(!switchState)}>
              Toggle Switch State
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

// Render the test app when this file is loaded directly
if (typeof document !== 'undefined') {
  const root = document.getElementById('root');
  if (root) {
    ReactDOM.render(<TestApp />, root);
  }
}

export default TestApp;
