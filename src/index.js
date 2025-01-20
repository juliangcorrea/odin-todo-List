import './styles.css'

const tempStoring = []
const projects = ['default']

function createTODO(title, description, priority, dueDate, project,  notes, checklist) {
    const newTODO = {
        title,
        description,
        dueDate,
        priority,
        project,
        notes,
        checklist
    }
    tempStoring.push(newTODO)
    return newTODO
}

const noteContainer = document.querySelector('.notes-container')

const tempData = ['tempTitle', 'tempDesc', 'High', '19/12/1994', 'default', 'test', {checklist: ['option-1', 'option-2']}]

function createCard(object){
    const cardTemplate = document.getElementById('card').content
    const fragment = document.createDocumentFragment()
    cardTemplate.querySelector('.todo-card h1').textContent = object.title
    cardTemplate.querySelector('.todo-card h2').textContent = object.description
    cardTemplate.querySelector('.todo-card h3').textContent = object.priority
    cardTemplate.querySelector('.todo-card h4').textContent = object.dueDate
    cardTemplate.querySelector('.todo-card h5').textContent = object.project
    if(object.notes){
        cardTemplate.querySelector('.todo-card p').lastChild.textContent = object.notes
    } else {
        const deleteNote = cardTemplate.querySelector('.todo-card p')
        deleteNote.remove()
    }
    const cloneNode = cardTemplate.cloneNode(true)
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
    const cardColor = cloneNode.querySelector('.todo-card')
    if(object.priority == 'Low') {
        cardColor.classList.add('priorityLow')
    } else if(object.priority == 'Medium'){
        cardColor.classList.add('priorityMedium')
    } else {
        cardColor.classList.add('priorityHigh')
    }
    fragment.appendChild(cloneNode)
    noteContainer.appendChild(fragment)
}

const testObject = createTODO(...tempData)

const tempData2 = ['tempTitle2', 'tempDesc2', 'Medium', '19/12/1994', 'newProject', '', {checklist: []}]

const testObject2 = createTODO(...tempData2)

createCard(testObject)

createCard(testObject2)




const testing = `<div class="todo-card">
                    <h1>Title of TODO</h1>
                    <h2>Description of TODO</h2>
                    <h3>Date of TODO</h3>
                    <h4>Priority of TODO</h4>
                    <h5>Medium</h5>
                    <p><Span><strong>Notes: </strong></Span> notes of the TODO</p>
                    <form action="" class="checklist-TODO">
                        <fieldset>
                            <legend>Checklist</legend>
                            <label class="checkbox"><input type="checkbox" name="" class="option-1">option-1</input></label>
                            <label class="checkbox"><input type="checkbox" name="" class="option-2">option-2</input></label>
                            <label class="checkbox"><input type="checkbox" name="" class="option-3">option-3</input></label>
                        </fieldset>
                    </form>
                </div>`
const testBtn = document.querySelector('.createNote')

testBtn.addEventListener('click', () => {
    noteContainer.innerHTML += testing
})