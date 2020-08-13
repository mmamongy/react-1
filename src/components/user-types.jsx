import React, { Component } from 'react'
import './user-types.css';
export default class UserTypes extends Component {
    state = { search: '', changingList: [], hideList: false };
    constructor(props) {
        super(props);
        this.escFunction = this.escFunction.bind(this);
    }
    componentDidMount() {
        this.setState({ changingList: Object.assign([], this.props.list) });
        document.addEventListener("keydown", this.escFunction, false);
    }
    escFunction(event){
        if(event.keyCode === 27) {
            this.setState({hideList: true });
        }
      }
    
    isLetter(str) {
        return str.length === 1 && str.match(/[a-z]/i);
    }
    handleChange(event) {
        if (!this.isLetter) { return; }
        const value = event.target.value
        this.setState({ search: value, hideList: false });
        let changingList = Object.assign({}, this.state.changingList);
        changingList = this.props.list.filter(x => x.search(value) !== -1)
        this.setState({ changingList });
    }
    search() {

    }
    handleKeyDown(event, item) {
        const searchValue = event.keyCode === 13 ? item : undefined;
        if (event.keyCode === 13 || event.keyCode === 27) {
            this.setState({ search: searchValue, hideList: true });
        }
    }
    renderListItem(text, heighlight) {
        const parts = text.split(new RegExp(`(${heighlight})`));
        return <span> {parts.map((part, i) =>
            <span key={i} style={(heighlight && part === heighlight) ? { fontWeight: 'bold' } : {}}>
                {part}
            </span>)
        } </span>;
    }
    render() {
        return (
            <div >
                <h1>Hello World</h1>
                <h2>{this.props.list[1]}</h2>
                <div className="select-container">
                    <input value={this.state.search}
                        onChange={e => this.handleChange(e)} />
                    <div className="input-values" hidden={this.state.hideList}>
                        {this.state.changingList.map((name, index) => {
                            return <a className="value-item" href="#" key={index}
                                onKeyDown={e => this.handleKeyDown(e, name)} >
                                {this.renderListItem(name, this.state.search)}
                            </a>;
                            
                        })}

                    </div>
                </div>
            </div>

        )
    }
}
