function saveExpenses(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpenses() {
    const expenses = localStorage.getItem('expenses');
    return expenses ? JSON.parse(expenses) : [];
}

function clearExpenses() {
    localStorage.removeItem('expenses');
}
