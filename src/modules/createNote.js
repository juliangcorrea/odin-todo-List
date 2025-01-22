import { renderAll } from "./renderNote"

function createTODO(title, description, priority, dueDate, project,  notes, checklist, mainArray) {
    const newTODO = {
        title,
        description,
        dueDate,
        priority,
        project,
        notes,
        checklist
    }
    mainArray.push(newTODO)
    return newTODO
}

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function createNote(mainArray) {
    const btnCreateNote = document.querySelector('.createNote')
    const createNoteDialog = document.querySelector('#createNote-dialog')
    const btnSend = createNoteDialog.querySelector('#sendNoteData')
    const btnAddItem = createNoteDialog.querySelector('#addChecklistItem')
    const btnDeleteItem = createNoteDialog.querySelector('#deleteChecklistItem')
    const checklistTable = createNoteDialog.querySelector('.checklist-choice-part2')
    const tableItems = checklistTable.querySelector('tbody')
    btnCreateNote.addEventListener('click', () => {
        createNoteDialog.showModal()
    })
    btnAddItem.addEventListener('click', (e) => {
        e.preventDefault()
        let userInput = createNoteDialog.querySelector('#newChecklistItem')
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
        e.preventDefault()
        const allRows = tableItems.querySelectorAll('tr')
        if(allRows.length != 0){
            allRows[allRows.length -1].remove()
        }
    })
    btnSend.addEventListener('click', () => {
        const todoTitle = createNoteDialog.querySelector('.name-choice input').value
        const todoDesc = createNoteDialog.querySelector('.description-choice input').value
        const todoPriority = createNoteDialog.querySelector('.priority-choice select').value
        const tempDueDate = createNoteDialog.querySelector('.dueDate-choice input').value
        const todoDueDate = formatDate(tempDueDate)
        const todoProject = createNoteDialog.querySelector('.project-choice select').value
        const todoNote = createNoteDialog.querySelector('textarea').value
        const rowData = tableItems.querySelectorAll('td')
        const rowDataCurated = []
        rowData.forEach(element => {
            rowDataCurated.push(element.textContent)
        });
        const checklistData = {checklist: rowDataCurated}
        if(!todoTitle || !todoDesc || !todoDueDate){
            alert('Missing data')
        } else {
            const allData = [todoTitle, todoDesc, todoPriority, todoDueDate, todoProject, todoNote, checklistData]
            createTODO(...allData, mainArray)
            renderAll(mainArray)
            createNoteDialog.querySelector('form').reset()
            createNoteDialog.querySelector('tbody').innerHTML = ""
            createNoteDialog.close()
        }
        helper()
    })
}

function helper(){
    const testbtn = document.querySelector('#extendCard')
    const testtag = document.querySelector('.todo-card .wrapper')
    testbtn.addEventListener('click', () => {
        testtag.classList.toggle('is-open')
    })
}


export default createNote