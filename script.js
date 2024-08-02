let expenses=[];
let grandTotal=0;
function  add(){
    const description = document.getElementById('descrip').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('option').value;
    const date = document.getElementById('date').value;
    if(description && amount && category && date){
        const expense = {description, amount, category, date};
        expenses.push(expense);
        upTable();
        upTotal();
        clear();
    }
    else{
        alert('Enter details to all fields');
    }
}
function upTable(filtexp = expenses){
    const tbody=document.getElementById('table').getElementsByTagName('tbody')[0];
    tbody.innerHTML='';

    filtexp.forEach((expense, index) => {
        const newRow = tbody.insertRow();

        const descriptionCell = newRow.insertCell(0);
        const amountCell = newRow.insertCell(1);
        const categoryCell = newRow.insertCell(2);
        const dateCell = newRow.insertCell(3);
        const actionsCell = newRow.insertCell(4);

        descriptionCell.textContent = expense.description;
        amountCell.textContent = `Rs.${expense.amount.toFixed(2)}`;
        categoryCell.textContent = expense.category;
        dateCell.textContent = expense.date;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editExpense(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteExpense(index);

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
    });
}
function upTotal() {
    grandTotal = expenses.reduce((total, expense) => total + expense.amount, 0);
    document.getElementById('total').textContent = grandTotal.toFixed(2);
}

function filtexp() {
    const filterCategory = document.getElementById('filteroption').value;
    const filteredExpenses = filterCategory === 'All' ? expenses : expenses.filter(expense => expense.category === filterCategory);
    updateTable(filteredExpenses);
}

function editExpense(index) {
    const expense = expenses[index];
    document.getElementById('descrip').value = expense.description;
    document.getElementById('amount').value = expense.amount;
    document.getElementById('category').value = expense.category;
    document.getElementById('date').value = expense.date;

    deleteExpense(index); 
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    upTable();
    upTotal();
}

function clear() {
    document.getElementById('descrip').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('option').value = 'Food';
    document.getElementById('date').value = '';
}