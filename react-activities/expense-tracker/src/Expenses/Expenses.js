import { useState } from "react";
import "./Expenses.css";
import Card from "../UI/Card";
import ExpensesList from "./ExpensesList";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesChart from "./ExpensesChart";

const Expenses = (props) => {
    const [filteredYear, setSelectedYear] = useState("2022")
    const filterChangeHandler = (selectedValue) => {
        setSelectedYear(selectedValue);
    };

    const filteredExpenses = props.expenses.filter((expenses) => {
        return expenses.date.getFullYear().toString() === filteredYear;
    })
    return (
        <div>
            <Card className="expenses">
                <ExpensesFilter 
                    onChangeFilter={filterChangeHandler} 
                    selected={filteredYear}
                />
                <ExpensesChart expenses={filteredExpenses}/>
                <ExpensesList items={filteredExpenses}/>
            </Card>
        </div>
    )
}

export default Expenses;