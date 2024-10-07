// Save expenses to localStorage
function saveExpenses(expenses) {
    try {
        localStorage.setItem('expenses', JSON.stringify(expenses));
        console.log('Expenses saved successfully.');
    } catch (error) {
        console.error('Error saving expenses:', error);
    }
}

// Load expenses from localStorage
function loadExpenses() {
    try {
        const expenses = localStorage.getItem('expenses');
        return expenses ? JSON.parse(expenses) : [];
    } catch (error) {
        console.error('Error loading expenses:', error);
        return [];
    }
}

// Clear all expenses from localStorage
function clearExpenses() {
    try {
        localStorage.removeItem('expenses');
        console.log('Expenses cleared successfully.');
    } catch (error) {
        console.error('Error clearing expenses:', error);
    }
}

// Add a new expense
function addExpense(expenses, newExpense) {
    expenses.push(newExpense);
    saveExpenses(expenses);
    console.log('New expense added:', newExpense);
}

// Edit an existing expense
function editExpense(expenses, id, updatedExpense) {
    const index = expenses.findIndex(expense => expense.id === id);
    if (index !== -1) {
        expenses[index] = updatedExpense;
        saveExpenses(expenses);
        console.log('Expense updated:', updatedExpense);
    } else {
        console.error('Expense not found:', id);
    }
}

// Delete an expense by ID
function deleteExpense(expenses, id) {
    const newExpenses = expenses.filter(expense => expense.id !== id);
    saveExpenses(newExpenses);
    console.log('Expense deleted with ID:', id);
}

// Filter expenses based on criteria
function filterExpenses(expenses, criteria) {
    return expenses.filter(expense => {
        let matches = true;
        if (criteria.category && expense.category !== criteria.category) {
            matches = false;
        }
        if (criteria.minAmount !== undefined && expense.amount < criteria.minAmount) {
            matches = false;
        }
        if (criteria.maxAmount !== undefined && expense.amount > criteria.maxAmount) {
            matches = false;
        }
        if (criteria.startDate && new Date(expense.date) < new Date(criteria.startDate)) {
            matches = false;
        }
        if (criteria.endDate && new Date(expense.date) > new Date(criteria.endDate)) {
            matches = false;
        }
        return matches;
    });
}

// Example expense structure
function createExpense(name, amount, category, date) {
    return {
        id: Date.now(),
        name,
        amount,
        category,
        date: date || new Date().toISOString()
    };
}

// Example usage
const expenses = loadExpenses();

// Adding a new expense
const newExpense = createExpense('Coffee', 4.5, 'Food');
addExpense(expenses, newExpense);

// Editing an existing expense
editExpense(expenses, newExpense.id, createExpense('Coffee', 5, 'Food'));

// Deleting an expense
deleteExpense(expenses, newExpense.id);

// Filtering expenses
const criteria = {
    category: 'Food',
    minAmount: 3,
    maxAmount: 10,
    startDate: '2023-01-01',
    endDate: '2023-12-31'
};
const filteredExpenses = filterExpenses(expenses, criteria);
console.log('Filtered expenses:', filteredExpenses);

// Clear all expenses
clearExpenses();
