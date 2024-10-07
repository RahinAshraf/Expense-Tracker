function filterExpenses(expenses, criteria) {
    return expenses.filter(expense => {
        if (criteria.category) {
            return expense.category === criteria.category;
        }
        return true;
    });
}

document.getElementById('filter-button').addEventListener('click', () => {
    const criteria = { category: document.getElementById('filter-category').value };
    const expenses = loadExpenses();
    const filteredExpenses = filterExpenses(expenses, criteria);
    displayExpenses(filteredExpenses);
});
