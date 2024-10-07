document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Get input values
    const name = document.getElementById('expense-name').value.trim();
    const amount = parseFloat(document.getElementById('expense-amount').value.trim());
    const category = document.getElementById('expense-category').value; // New category input
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');
    const expenseCount = document.getElementById('expense-count'); // New element to show the number of expenses

    // Input validation
    if (!name || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid expense name and amount greater than zero.');
        return; // Stop further execution
    }

    // Create a new list item
    const li = document.createElement('li');
    li.textContent = `${name} (${category}): $${amount.toFixed(2)}`;

    // Create a delete button for the expense
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-expense-btn');
    deleteButton.addEventListener('click', function() {
        // Remove the expense from the list and update total
        expenseList.removeChild(li);
        updateTotalAndCount(-amount);
    });

    // Append the delete button to the list item
    li.appendChild(deleteButton);
    expenseList.appendChild(li);

    // Update total and expense count
    updateTotalAndCount(amount);

    // Clear input fields
    document.getElementById('expense-name').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-category').value = ''; // Clear category input
});

// Function to update the total amount and expense count
function updateTotalAndCount(amount) {
    let currentTotal = parseFloat(totalAmount.textContent);
    currentTotal += amount; // Update total with the new amount
    totalAmount.textContent = currentTotal.toFixed(2);

    // Update expense count
    let currentCount = parseInt(expenseCount.textContent);
    if (amount > 0) {
        currentCount += 1; // Increment count when adding a new expense
    } else {
        currentCount -= 1; // Decrement count when deleting an expense
    }
    expenseCount.textContent = currentCount;
}

// Example initialization of total amount and expense count
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('total-amount').textContent = '0.00'; // Initialize total amount
    document.getElementById('expense-count').textContent = '0'; // Initialize expense count
});
