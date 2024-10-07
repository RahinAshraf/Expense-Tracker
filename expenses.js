document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');

    // Create a new list item
    const li = document.createElement('li');
    li.textContent = `${name}: $${amount.toFixed(2)}`;
    expenseList.appendChild(li);

    // Update total
    let currentTotal = parseFloat(totalAmount.textContent);
    currentTotal += amount;
    totalAmount.textContent = currentTotal.toFixed(2);

    // Clear input fields
    document.getElementById('expense-name').value = '';
    document.getElementById('expense-amount').value = '';
});
