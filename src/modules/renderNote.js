import { changePriorityColor, addSlider, deleteCard, editCard } from "./editNote"

/* Main Functions */

function createCard(object, mainArray, projectList){
    console.log('used createCard')
    const noteContainer = document.querySelector('.notes-container')
    const cardTemplate = document.getElementById('card').content
    const fragment = document.createDocumentFragment()
    cardTemplate.querySelector('.todo-card h1').textContent = object.title
    cardTemplate.querySelector('.todo-card h2').textContent = object.description
    cardTemplate.querySelector('.todo-card h3').textContent = object.priority
    cardTemplate.querySelector('.todo-card h4').textContent = formatDate(object.dueDate)
    cardTemplate.querySelector('.todo-card h5').textContent = object.project
    const cloneNode = cardTemplate.cloneNode(true)
    const btnDelete = cloneNode.querySelector('.removeCard')
    const btnEdit = cloneNode.querySelector('.editCard')
    addSlider(cloneNode)
    btnDelete.dataset.id = object.id
    btnEdit.dataset.id = object.id
    if(object.notes){
       cloneNode.querySelector('.todo-card .body p').lastChild.textContent = object.notes
    } else {
        const deleteNote = cloneNode.querySelector('.todo-card .body p')
        deleteNote.remove()
    }
    if(object.checklist.checklist.length != 0){
        const templateForm = cloneNode.querySelector('.checklist-TODO fieldset')
        object.checklist.checklist.forEach(sub_element => {
            const optionLabel = document.createElement('label')
            const optionCheckbox = document.createElement('input')
            optionLabel.classList.add('checkbox')
            optionCheckbox.type = 'checkbox'
            optionCheckbox.name = 'checklist'
            optionCheckbox.value = sub_element
            optionLabel.textContent = sub_element
            optionLabel.insertBefore(optionCheckbox, optionLabel.firstChild)
            templateForm.appendChild(optionLabel)
        });
    } else {
        const deleteForm = cloneNode.querySelector('.checklist-TODO')
        deleteForm.remove()
    }
    fragment.appendChild(cloneNode)
    noteContainer.appendChild(fragment)
    changePriorityColor()
    deleteCard(mainArray)
    editCard(mainArray, projectList)
}

function renderByFilter(filterCategory, filterName, mainArray, projectList){
    const noteContainer = document.querySelector('.notes-container')
    noteContainer.innerHTML = ''
    const listBy = mainArray.filter(item => item[filterCategory] == filterName)
    renderAll(listBy, projectList)
}

function renderAll(mainArray, projectList){
    console.log('used renderAll')
    const noteContainer = document.querySelector('.notes-container')
    noteContainer.innerHTML = ''
    mainArray.forEach(element => {
        createCard(element, mainArray, projectList)
    });
}


/* Auxiliary Functions */

function formatDate(inputDate) {
    const [year, month, day] = inputDate.split('-');
    return `${day}/${month}/${year}`;
}

export {renderByFilter, renderAll, createCard}