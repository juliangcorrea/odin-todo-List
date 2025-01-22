import { renderAll } from "./renderNote"

/* Main Functions */

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

function createNote(mainArray, projectList) {
    const btnCreateNote = document.querySelector('.createNote')
    const createNoteDialog = document.querySelector('#createNote-dialog')
    const btnSend = createNoteDialog.querySelector('#sendNoteData')
    const btnAddItem = createNoteDialog.querySelector('#addChecklistItem')
    const btnDeleteItem = createNoteDialog.querySelector('#deleteChecklistItem')
    const checklistTable = createNoteDialog.querySelector('.checklist-choice-part2')
    const tableItems = checklistTable.querySelector('tbody')
    btnCreateNote.addEventListener('click', () => {
        const projectOptions = createNoteDialog.querySelector('#project-of-TODO')
        updateProjectList(projectOptions, projectList)
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
    })
}

function createProject(projectList){
    const btnCreateProject = document.querySelector('.createProject')
    const createProjectDialog = document.querySelector('#createProject-dialog')
    const btnSend = createProjectDialog.querySelector('#createNewProject')
    const selectProject = document.querySelector('#searchProject')
    btnCreateProject.addEventListener('click', () => {
        createProjectDialog.showModal()
    })
    btnSend.addEventListener('click', () => {   
        const newProject = createProjectDialog.querySelector('input').value
        if(newProject){
            projectList.push(newProject.toLowerCase())
            updateProjectList(selectProject, projectList)
            createProjectDialog.close()
        }
    })
}


/* Auxiliary functions */

function formatDate(inputDate) {
    const [year, month, day] = inputDate.split('-');
    return `${day}/${month}/${year}`;
}

function updateProjectList(htmltag, projectList){
    htmltag.innerHTML = `<option value='' disabled selected>--Select a project--</option>`
    projectList.forEach(element => {
        const newProject = document.createElement('option')
        newProject.value = element
        newProject.textContent = element
        htmltag.appendChild(newProject)
    })
}


/* Export Function*/

function sideButtons(mainArray, projectList){
    createNote(mainArray, projectList)
    createProject(projectList)
}


export { sideButtons, updateProjectList }