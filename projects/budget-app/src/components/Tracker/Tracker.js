import './Tracker.css'
import React, {Component} from 'react';
import fire from '../../config/Fire';
import Transaction from './Transaction/Transaction';

class Tracker extends Component {

    state = {
        transactions: [],
        money: 0,
        transactionName: '',
        transactionType: '',
        price: '',
        currentUID: fire.auth().currentUser.uid,
        userName: ''
    }

    componentDidMount(){
        console.log(fire.auth().currentUser)
        this.setState({
            userName: fire.auth().currentUser.displayName
        })
    }


    logout = () => {
        fire.auth().signOut();
    }

    handleChange = input => e => {
        this.setState({
            [input]: e.target.value !=="0" ? e.target.value : ""
        });
    }

    deleteTransaction = (id) => () => {
        fire.database().ref('Transactions/' + this.state.currentUID + '/' + id).set(null).
        then(() => {
            const foundTransaction = this.state.transactions.find(
                transaction => transaction.id === id
              );
              const newBalance =
                foundTransaction.type === "deposit"
                  ? this.state.money - parseFloat(foundTransaction.price)
                  : this.state.money + parseFloat(foundTransaction.price);
              this.setState({
                transactions: this.state.transactions.filter(
                  transaction => transaction.id !== id
                ),
                money: newBalance
              });
            console.log('delete successful')
        })
    }


    addNewTransaction = () => {
        const {
            transactionName,
            transactionType,
            price,
            currentUID,
            money
        } = this.state;

        //validation
        if(transactionName && transactionType && price){
            const BackUpState = this.state.transactions;
            BackUpState.push({
                id: BackUpState.length + 1,
                name: transactionName,
                type: transactionType,
                price: price,
                user_id: currentUID
            })
            fire.database().ref('Transactions/' + currentUID).push({
                id: BackUpState.length,
                name: transactionName,
                type: transactionType,
                price: price,
                user_id: currentUID
            }).then((data) => {
                //successful callback
                console.log('success callback');
                this.setState({
                    transactions: BackUpState,
                    money: transactionType === 'deposit' ? money + parseFloat(price) : money - parseFloat(price),
                    transactionName: '',
                    transactionType: '',
                    price: '',
                })
            }).catch((error) =>{
                //error callback
                console.log('error', error)
            })
        }
    } 

    componentWillMount(){
        const {currentUID, money} = this.state;
        let totalMoney = money;
        const BackUpState = this.state.transactions;
        fire.database().ref('Transactions/' + currentUID).once('value', (snapshot) => {
           // console.log(snapshot)
           snapshot.forEach((childSnapshot) => {
            console.log(childSnapshot.ref.key)
                totalMoney = 
                childSnapshot.val().type === 'deposit' ?
                parseFloat(childSnapshot.val().price) + totalMoney
                : totalMoney - parseFloat(childSnapshot.val().price)

                BackUpState.push({
                    id: childSnapshot.ref.key,
                    name: childSnapshot.val().name,
                    type: childSnapshot.val().type,
                    price: childSnapshot.val().price,
                    user_id: childSnapshot.val().user_id
                })
           });

           this.setState({
               transactions: BackUpState,
               money: totalMoney
           })
        })
    }
     

    render(){
        
        return(
            <div className="trackerBlock">
                <div className="welcome">
                    <span>Hi, {this.state.userName}!</span>
                    <button className="exit" onClick={this.logout}>Logout</button>
                </div>
                <div className="totalMoney">${this.state.money}</div>

                <div className="newTransactionBlock">
                    <div className="newTransaction">
                        <form>
                            <input
                                placeholder="Transaction Name"
                                type="text"
                                name="transactionName"
                                value = {this.state.transactionName}
                                onChange= {this.handleChange('transactionName')}
                            />
                            <div className="inputGroup">
                                <select name="type"
                                    value = {this.state.transactionType}
                                    onChange= {this.handleChange('transactionType')}>
                                    <option value="0">Type</option>
                                    <option value="expense">Expense</option>
                                    <option value="deposit">Deposit</option>
                                </select>
                                <input
                                placeholder="Price"
                                type="text"
                                name="price"
                                value = {this.state.price}
                                onChange= {this.handleChange('price')}
                            />
                            </div>
                        </form>
                        <button className="addTransaction"
                            onClick={() => this.addNewTransaction()}>
                                + Add Transaction
                        </button>
                    </div>
                </div>
                <div className="latestTransactions">
                    <p>Latest Transactions</p>
                    <ul>
                        {

                            this.state.transactions.map((transaction) => (
                                <Transaction  key={transaction.id}
                                    id={transaction.id}
                                    type={transaction.type}
                                    name={transaction.name}
                                    price={transaction.price}
                                    deleteTransaction={this.deleteTransaction}
                                />
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Tracker;