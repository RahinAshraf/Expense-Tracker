function filterExpenses(expenses, criteria) {
    return expenses.filter(expense => {
        // Check for category filtering
        if (criteria.category && criteria.category !== '') {
            if (expense.category !== criteria.category) return false;
        }

        // Check for amount range filtering
        if (criteria.minAmount !== undefined && criteria.maxAmount !== undefined) {
            if (expense.amount < criteria.minAmount || expense.amount > criteria.maxAmount) {
                return false;
            }
        }

        // Check for date filtering
        if (criteria.startDate && criteria.endDate) {
            const expenseDate = new Date(expense.date);
            if (expenseDate < new Date(criteria.startDate) || expenseDate > new Date(criteria.endDate)) {
                return false;
            }
        }

        return true; // If all criteria passed, keep the expense
    });
}

document.getElementById('filter-button').addEventListener('click', () => {
    const criteria = {
        category: document.getElementById('filter-category').value,
        minAmount: parseFloat(document.getElementById('filter-min-amount').value) || undefined,
        maxAmount: parseFloat(document.getElementById('filter-max-amount').value) || undefined,
        startDate: document.getElementById('filter-start-date').value || undefined,
        endDate: document.getElementById('filter-end-date').value || undefined
    };

    const expenses = loadExpenses(); // Load all expenses
    const filteredExpenses = filterExpenses(expenses, criteria); // Apply the filter
    displayExpenses(filteredExpenses); // Display the filtered expenses
});

// Function to reset filters
document.getElementById('reset-filter-button').addEventListener('click', () => {
    document.getElementById('filter-category').value = '';
    document.getElementById('filter-min-amount').value = '';
    document.getElementById('filter-max-amount').value = '';
    document.getElementById('filter-start-date').value = '';
    document.getElementById('filter-end-date').value = '';

    // Optionally, reload and display all expenses
    const expenses = loadExpenses();
    displayExpenses(expenses);
});

// Function to load expenses from localStorage
function loadExpenses() {
    const expenses = localStorage.getItem('expenses');
    return expenses ? JSON.parse(expenses) : [];
}

// Function to display expenses on the UI
function displayExpenses(expenses) {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = ''; // Clear the current list

    if (expenses.length === 0) {
        const noExpenseMessage = document.createElement('p');
        noExpenseMessage.textContent = 'No expenses found for the selected filters.';
        expenseList.appendChild(noExpenseMessage);
        return;
    }

    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.name} (${expense.category}): $${expense.amount.toFixed(2)} on ${new Date(expense.date).toLocaleDateString()}`;
        expenseList.appendChild(li);
    });
}

// Example initialization of filter inputs
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('filter-min-amount').value = '';
    document.getElementById('filter-max-amount').value = '';
    document.getElementById('filter-start-date').value = '';
    document.getElementById('filter-end-date').value = '';
});
