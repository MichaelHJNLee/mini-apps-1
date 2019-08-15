class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: 0,
            info: {}
        }
        this.showForm1 = this.showForm1.bind(this);
        this.showForm2 = this.showForm2.bind(this);
        this.showForm3 = this.showForm3.bind(this);
        this.showForm4 = this.showForm4.bind(this);
        this.returnHome = this.returnHome.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
        this.purchase = this.purchase.bind(this);
    }

    showForm1() {
        this.setState({
            page: 1
        })
    }
    showForm2() {
        this.setState({
            page: 2
        })
    }
    showForm3() {
        this.setState({
            page: 3
        })
    }
    showForm4() {
        this.setState({
            page: 4
        })
    }
    returnHome() {
        this.setState({
            page: 0
        })
    }

    updateInfo(propertyObj) {
        var currentInfo = this.state.info;
        for (var key in propertyObj) {
            currentInfo[key] = propertyObj[key];
        }
        this.setState({
            info: currentInfo
        })
        console.log(this.state.info)
    }

    purchase() {
        console.log(this.state.info)
        fetch('http://localhost:3000', {method: "POST", body: JSON.stringify(this.state.info), headers: {'Content-Type': 'application/json'}})
            .then((response) => {
                return response.text();
            })
            .then((text) => {
                console.log(text)
            })
    }

    render() {
        return (
            <div>
                {this.state.page === 0 && <Home next={this.showForm1} />}
                {this.state.page === 1 && <Form1 prev={this.returnHome} next={this.showForm2} submit={this.updateInfo}/>}
                {this.state.page === 2 && <Form2 prev={this.showForm1} next={this.showForm3} submit={this.updateInfo}/>}
                {this.state.page === 3 && <Form3 prev={this.showForm2} next={this.showForm4} submit={this.updateInfo}/>}
                {this.state.page === 4 && <Confirm prev={this.showForm3} next={this.returnHome} purchase={this.purchase} info={this.state.info}/>}
            </div>
        )
    }
}

const Home = (props) => {
    return (
        <button id="checkout" onClick={props.next}>Checkout</button>
    )
}

class Form1 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            property: {
                name: '',
                email: '',
                password: ''
            }
        }
    }

    userInput(e) {
        var currentState = this.state.property;
        currentState[e.target.id] = e.target.value;
        this.setState({
            property: currentState
        })
    }

    render() {
        return (
            <div>
            <div>
                <h1>Create Account</h1>
            </div>
            <div>
                <form id="form1">
                    Name: <input type="text" id="name" value={this.state.property.name} onChange={(e) => this.userInput(e)}></input><br/>
                    E-mail: <input type="text" id="email" onChange={(e) => this.userInput(e)}></input><br/>
                    Password: <input type="text" id="password" onChange={(e) => this.userInput(e)}></input><br/>
                </form>
            </div>
            <br/>
            <div>
                <button id="previous" onClick={this.props.prev}>Go Back</button>
                <button id="Next" onClick={() => {this.props.submit(this.state.property); this.props.next()}}>Next</button>
            </div>
            </div>
        )
    }
}

class Form2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            property: {
                line1: '',
                line2: '',
                city: '',
                state: '',
                zipCode: '',
                phone: ''
            }
        }
    }

    userInput(e) {
        var currentState = this.state.property;
        currentState[e.target.id] = e.target.value;
        this.setState({
            property: currentState
        })
    }

    render() {
        return (
            <div>
            <div>
                <h1>Shipping Info</h1>
            </div>
            <div>
                <form id="form1">
                    Shipping Address: <br/>
                    Line 1: <input type="text" id="line1" onChange={(e) => this.userInput(e)}></input><br/>
                    Line 2: <input type="text" id="line2" onChange={(e) => this.userInput(e)}></input><br/>
                    City: <input type="text" id="city" onChange={(e) => this.userInput(e)}></input> State: <input type="text" id="state" onChange={(e) => this.userInput(e)}></input> Zip Code: <input type="text" id="zipCode" onChange={(e) => this.userInput(e)}></input><br/>
                    Phone Number: <input type="text" id="phone" onChange={(e) => this.userInput(e)}></input>
                </form>
            <br/>
            </div>
            <div>
                <button id="previous" onClick={this.props.prev}>Go Back</button>
                <button id="Next" onClick={() => {this.props.submit(this.state.property); this.props.next()}}>Next</button>
            </div>
            </div>
        )
    }
}

class Form3 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            property: {
                creditCard: '',
                exp: '',
                cvv: '',
                bzipCode: ''
            }
        }
    }

    userInput(e) {
        var currentState = this.state.property;
        currentState[e.target.id] = e.target.value;
        this.setState({
            property: currentState
        })
    }

    render() {
        return (
            <div>
            <div>
                <h1>Payment</h1>
            </div>
            <div>
                <form id="form1">
                    Credit Card #: <input type="text" id="creditCard" onChange={(e) => this.userInput(e)}></input><br/>
                    Expiration: <input type="text" id="exp" onChange={(e) => this.userInput(e)}></input>
                    CVV: <input type="text" id="cvv" onChange={(e) => this.userInput(e)}></input><br/>
                    Billing Zip Code: <input type="text" id="bzipCode" onChange={(e) => this.userInput(e)}></input>
                </form>
            </div>
            <div>
                <button id="previous" onClick={this.props.prev}>Go Back</button>
                <button id="Next" onClick={() => {this.props.submit(this.state.property); this.props.next()}}>Next</button>
            </div>
            </div>
        )
    }
}

const Confirm = (props) => {
    return (
        <div>
        <div>
            <h1>Confirm Information</h1>
        </div>
        <div>
            Name: <div value={props.info.name}></div>
            E-mail: <div value={props.info.email}></div>
            Password: <div value={props.info.password}></div>
            Address: <div value={props.info.line1}></div>
            <div value={props.info.line2}></div>
            City: <div value={props.info.city}></div>
            State: <div value={props.info.state}></div>
            Zip Code: <div value={props.info.zipCode}></div>
            Credit Card #: <div value={props.info.creditCard}></div>
            Expiration: <div value={props.info.exp}></div>
            CVV: <div value={props.info.cvv}></div>
            Billing Zip Code: <div value={props.info.bzipCode}></div>
            <button id="purchase" onClick={() => {props.purchase(); props.next()}}>Purchase</button>
        </div>
        </div>
    )
}

const app = document.getElementById('app');
ReactDOM.render(<App />, app)
