import React from 'react';
import { getData } from 'utils/getData.mjs';
import Header from './Header';
import ApiKey from './ApiKey';
import TextBlock from './TextBlock';
import GetAndClear from './GetAndClear';
import PopUp from './PopUp';
import Footer from './Footer';

import appData from 'static/data/appData.json';

import S from './module.css';

const fields = ['initialAddress', 'responseAddress', 'lat', 'lon'];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      in: '',
      out: '',
      errors: '',
      key: '',
      abort: '',
      outpath: '',
      popup: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.appendToTextArea = this.appendToTextArea.bind(this);
    this.cleanAll = this.cleanAll.bind(this);
    this.togglePopUp = this.togglePopUp.bind(this);
    this.cleanOutput = this.cleanOutput.bind(this);
    this.handleGetRef = this.handleGetRef.bind(this);
  }

  handleGetRef(id, ref) {
    this.setState({
      [id]: ref,
    });
  }

  togglePopUp() {
    if (this.state.popup != '') {
      this.state.popup.classList.toggle('show');
    }
  }

  cleanOutput() {
    this.setState({
      out: '',
    });
  }

  runGetData(toggle, clean) {
    clean();
    toggle();
    getData(
      this.state.in,
      this.state.key,
      fields,
      this.state.outpath,
      null,
      this.appendToTextArea,
      this.state.abort
    );
  }

  itemsLength(elem) {
    return elem.split(/\r?\n/).filter(x => x !== '').length;
  }

  handleChange(event) {
    const id = event.target.getAttribute('type');
    this.setState({ [id]: event.target.value });
  }

  appendToTextArea(path, item) {
    path.value += item;
    this.setState({ [path.getAttribute('type')]: path.value });
  }

  cleanAll() {
    this.setState({
      in: '',
      out: '',
      errors: '',
      key: '',
    });
  }

  render() {
    const size = this.itemsLength(this.state.in);
    const counter = this.itemsLength(this.state.out);
    const errors = this.itemsLength(this.state.errors);

    return (
      <div className={S.app}>
        <PopUp
          data={appData.popUp}
          counter={counter}
          size={size}
          errors={errors}
          toggleFunc={this.togglePopUp}
          cleanOut={this.cleanOutput}
          passRefUp={this.handleGetRef}
        />
        <Header data={appData.header} />
        <ApiKey
          data={appData.apiKey}
          val={this.state.key}
          change={this.handleChange}
        />
        <div className={S.container}>
          {appData.textBlock.map((x, i) => (
            <TextBlock
              key={`TextBlock_${i}`}
              data={x}
              input={this.state.in}
              output={this.state.out}
              change={this.handleChange}
              outPath={this.state.outpath}
              passRefUp={this.handleGetRef}
            />
          ))}
          <GetAndClear
            data={appData.getAndClear}
            getFunc={() =>
              size > 0
                ? this.runGetData(this.togglePopUp, this.cleanOutput)
                : null
            }
            clearFunc={this.cleanAll}
          />
        </div>
        <Footer data={appData.footer} />
      </div>
    );
  }
}
