function drawChart(expenses) {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    const labels = expenses.map(expense => expense.name);
    const data = expenses.map(expense => expense.amount);
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Expenses',
                data: data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

document.getElementById('add-expense').addEventListener('click', () => {
    const expenses = loadExpenses();
    drawChart(expenses);
});
