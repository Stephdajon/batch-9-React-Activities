import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('display filter by year', () => {
  render(<App />);
  const filter = screen.getByText(/filter by year/i);
  expect(filter).toBeInTheDocument();
});

test('display phone insurance', () => {
  render(<App />);
  const itemName = screen.getByText(/Phone Insurance/i);
  expect(itemName).toBeInTheDocument();
});

test('render add expense button link', () => {
  render(<App />);
  const addExpenseBtn = screen.getByText(/Add New Expense/i);
  userEvent.click(addExpenseBtn)
  expect(addExpenseBtn).toHaveTextContent(/Add New Expense/i);
});

test('display cancel button once Add New Expense Click', () => {
  render(<App />);
  const addExpenseBtn = screen.getByText(/Add New Expense/i);
  userEvent.click(addExpenseBtn)
  const cancelBtn = screen.getByText(/Cancel/)
  expect(cancelBtn).toHaveTextContent(/Cancel/i);
});

test('display chart', () => {
  render(<App />);
  const chart = screen.getByText(/Sept/i);
  expect(chart).toBeInTheDocument();
});

test('display date', () => {
  render(<App />);
  const date = screen.getByText(/September/i);
  expect(date).toBeInTheDocument();
});

test('display $1000', () => {
  render(<App />);
  const money = screen.getByText(/1000/i);
  expect(money).toBeInTheDocument();
});

test('display Amount in form', () => {
  render(<App />);
  const addExpenseBtn = screen.getByText(/Add New Expense/i);
  userEvent.click(addExpenseBtn)
  const amount = screen.getByText(/Amount/i);
  expect(amount).toBeInTheDocument();
});
