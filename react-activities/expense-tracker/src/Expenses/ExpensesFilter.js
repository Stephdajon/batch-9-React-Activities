    import "./ExpensesFilter.css";

const ExpensesFilter = (props) => {
    
    const dropDownHandler = (event) => {
        props.onChangeFilter(event.target.value);
    };
    
    return (
        <div className="expenses-filter">
            <div className="expenses-filter__control">
                <label className="expenses-filter__label">Filter by year</label>
                <select
                onChange={dropDownHandler} 
                value={props.selected} className="expenses-filter__select">
                    <option>2017</option>
                    <option>2018</option>
                    <option>2019</option>
                    <option>2022</option>
                    <option>2021</option>
                </select>
            </div>
        </div>
    )
}

export default ExpensesFilter;