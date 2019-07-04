import React from 'react';
import ReactDOM from 'react-dom';

const LanguageContext = React.createContext('eng');			//context variable declared
const ColourContext = React.createContext();

class Field extends React.Component{
	static contextType = LanguageContext;					//context assigned to component
	
	render(){
		const text = this.context === 'dch' ? 'Naam: ' : 'Name: ';
		return (<div className="ui field">
			<label>{text}</label>
			<input />
		</div>);
	}
}
class Button extends React.Component{
	render(){		//context consumer using terneray expression in an arrow function
		return (
		<ColourContext.Consumer>
			{(color) =>
				<button className={`ui button ${color}`}>
					<LanguageContext.Consumer>
						{(value) => value === 'dch' ? 'Voorleggen' : 'Submit'}	
					</LanguageContext.Consumer>
				</button>
			}
		</ColourContext.Consumer>);
	}
}

const User = () => {
	return (<div className="ui form">
			<Field />
			<Button />
	</div>);
};

class App extends React.Component {
	state = {language: 'eng'};
	
	language = (ln) => {
		this.setState({language: ln});
	};

	render() {
		return (
		<div className="ui container">
			Select a language:
			<i className="gb uk flag" onClick={() => this.language('eng')}></i>
			<i className="nl flag" onClick={() => this.language('dch')}></i>
			<ColourContext.Provider value={'green'}>
				<LanguageContext.Provider value={this.state.language}><User /></LanguageContext.Provider>
			</ColourContext.Provider>
		</div>);
	}
}

export default App;