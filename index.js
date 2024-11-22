let myinput = document.getElementById('fname');
let listItem = document.getElementById('taskList');
let addButton = document.getElementById('nour');
let updateButton = document.getElementById('updateButton');
let data = [];
let updateIndex = -1;

// Load data from localStorage if available
if (localStorage.getItem('title') !== null) {
    data = JSON.parse(localStorage.getItem('title'));
    display(data);
}

// Add new element to the list
addButton.addEventListener('click', function() {
    addElement();
});

// Update the element in the list
updateButton.addEventListener('click', function() {
    updateElement();
});


function addElement() {
    if (myinput.value.trim() !== "") {
        data.push({ text: myinput.value.trim(), completed: false }); // Store text and completion status
        myinput.value = "";
        localStorage.setItem('title', JSON.stringify(data));
        display(data);
    }
}

function display(myarray) {
    let cartona = ``;
    for (let i = 0; i < myarray.length; i++) {
        cartona += `
            <li class="d-flex justify-content-between align-items-center" id="taskItems">
                <div class="d-flex align-items-center">
                    <input type="checkbox" class="me-3" ${myarray[i].completed ? 'checked' : ''} onclick="mark(${i})">
                    <p class="${myarray[i].completed ? 'text-decoration-line-through text-muted' : ''}">${myarray[i].text}</p>
                </div>
                <div>
                    <i class="fa-solid fa-pen-to-square fa-2xl" onclick="setForm(${i})"></i>
                    <i class="fa-solid fa-trash-can alert alert-danger" onclick="deleteElement(${i})"></i>
                </div>
            </li>
        `;
    }
    listItem.innerHTML = cartona;
}

function deleteElement(index) {
    data.splice(index, 1);
    localStorage.setItem('title', JSON.stringify(data));
    display(data);
}

function setForm(index) {
    myinput.value = data[index].text;
    updateIndex = index;
    addButton.classList.add('d-none');
    updateButton.classList.remove('d-none');
}

function updateElement() {
    if (updateIndex >= 0 && myinput.value.trim() !== "") {
        data[updateIndex].text = myinput.value.trim();
        localStorage.setItem('title', JSON.stringify(data));
        display(data);
        resetForm();
    }
}

function resetForm() {
    myinput.value = "";
    addButton.classList.remove('d-none');
    updateButton.classList.add('d-none');
    updateIndex = -1;
}

// New function to mark a task as completed
function mark(index) {
    data[index].completed = !data[index].completed; // Toggle the completed status
    localStorage.setItem('title', JSON.stringify(data)); // Update localStorage
    display(data); // Re-render the list
}

