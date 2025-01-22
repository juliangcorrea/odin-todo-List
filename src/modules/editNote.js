import { updateProjectList } from "./createNote"
import { renderAll } from "./renderNote"

function changePriorityColor(){
    const allCards = document.querySelectorAll('.todo-card')
    allCards.forEach(element => {
        const cardPriority = element.querySelector('h3').textContent
        element.classList.forEach(sub_element => {
            if(sub_element.includes('priority')){
                element.classList.remove(sub_element)
            }
        })
        if(cardPriority == 'Low'){
            element.classList.add('priorityLow')
        } else if(cardPriority == 'Medium'){
            element.classList.add('priorityMedium')
        } else {
            element.classList.add('priorityHigh')
        }
    })
}

function addSlider(htmltag){
    const btnExtend = htmltag.querySelector('.extendCard')
    const wrapper = htmltag.querySelector('.wrapper')
    btnExtend.addEventListener('click', () => {
        wrapper.classList.toggle('is-open')
    })
}

function deleteCard(mainArray){
    const deleteCards = document.querySelectorAll('.todo-card .removeCard')
    deleteCards.forEach(element => {
        element.addEventListener('click', () => {
            if(confirm('Are you sure you want to delete this TODO?')){
                const elementToDelete = mainArray.filter(item => item.id == element.dataset.id )
                const indexOfElementToDelete = mainArray.indexOf(elementToDelete)
                mainArray.splice(indexOfElementToDelete, 1)
                const cardToRemove = element.closest('.todo-card')
                cardToRemove.remove()
            }
        })
    })
}


function editCardInit(){
    const editDialog = document.querySelector('#editNote-dialog')
    const checklistTable = editDialog.querySelector('.checklist-choice-part2')
    const tableItems = checklistTable.querySelector('tbody')
    const btnAddItem = editDialog.querySelector('#addChecklistItem')
    const btnDeleteItem = editDialog.querySelector('#deleteChecklistItem')
    btnAddItem.addEventListener('click', (e) => {
        e.preventDefault()
        let userInput = editDialog.querySelector('#newChecklistItem')
        if(userInput.value){
            const newRow = document.createElement('tr')
            const newData = document.createElement('td')
            newData.textContent = userInput.value
            newRow.appendChild(newData)
            tableItems.appendChild(newRow)
        }
        userInput.value = ""
        userInput.textContent = ""
    })
    btnDeleteItem.addEventListener('click', (e) => {
        e.preventDefault();
        const allRows = tableItems.querySelectorAll('tr');
        if (allRows.length !== 0) {
          allRows[allRows.length - 1].remove();
        }
    })
}

function editCard(mainArray, projectList){
    const editCards = document.querySelectorAll('.todo-card .editCard')
    const editDialog = document.querySelector('#editNote-dialog')
    editCards.forEach(element => {
        element.addEventListener('click', () => {
            const elementToEdit = mainArray.filter(item => item.id == element.dataset.id )[0]
            editCardInfo(elementToEdit, mainArray, projectList)
            editDialog.showModal()
        })
    })
}

function editCardInfo(object, mainArray, projectList, id){
    const editNoteDialog = document.querySelector('#editNote-dialog')
    const btnSend = editNoteDialog.querySelector('#sendEditData')
    const checklistTable = editNoteDialog.querySelector('.checklist-choice-part2')
    const tableItems = checklistTable.querySelector('tbody')
    const editProject = editNoteDialog.querySelector('#project-of-TODO')
    updateProjectList(editProject, projectList)
    const chosenProject = editProject.querySelector(`option[value="${object.project}"]`)
    chosenProject.selected = true
    const editTitle = editNoteDialog.querySelector('.name-choice input')
    editTitle.value = object.title
    const editDesc = editNoteDialog.querySelector('.description-choice input')
    editDesc.value = object.description
    const editPriority = editNoteDialog.querySelector(`.priority-choice select option[value="${object.priority}"]`)
    editPriority.selected = true
    const editDueDate = editNoteDialog.querySelector('.dueDate-choice input')
    editDueDate.value = object.dueDate
    const editNote = editNoteDialog.querySelector('textarea')
    editNote.value = object.notes
    tableItems.innerHTML = ''
    object.checklist.checklist.forEach(element => {
        const editRow = document.createElement('tr')
        const editData = document.createElement('td')
        editData.textContent = element
        editRow.appendChild(editData)
        tableItems.appendChild(editRow)
    });
    btnSend.addEventListener('click', () => {
        const todoTitle = editNoteDialog.querySelector('.name-choice input').value
        const todoDesc = editNoteDialog.querySelector('.description-choice input').value
        const todoPriority = editNoteDialog.querySelector('.priority-choice select').value
        const todoDueDate = editNoteDialog.querySelector('.dueDate-choice input').value
        const todoProject = editNoteDialog.querySelector('.project-choice select').value
        const todoNote = editNoteDialog.querySelector('textarea').value
        const rowData = tableItems.querySelectorAll('td')
        const rowDataCurated = []
        rowData.forEach(element => {
            rowDataCurated.push(element.textContent)
        });
        const checklistData = {checklist: rowDataCurated}
        if(!todoTitle || !todoDesc || !todoDueDate){
            alert('Missing data')
        } else { 
            const id = object.id
            const objectIndex = mainArray.findIndex(item => item.id == id)
            mainArray[objectIndex] = {...mainArray[objectIndex], title: todoTitle, description:todoDesc, priority:todoPriority, dueDate:todoDueDate, project:todoProject,  notes:todoNote, checklist:checklistData}
            renderAll(mainArray, projectList)
            editNoteDialog.close()
        }
    })
}

export  { changePriorityColor, addSlider, deleteCard, editCard, editCardInit }