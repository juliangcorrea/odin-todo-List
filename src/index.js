import './styles.css'
import createTODO from './modules/createNote'
import btnSearch from './modules/buttons'


const noteList = []

const btnCreateNote = document.querySelector('.createNote')
const createNoteDialog = document.querySelector('#createNote-dialog')

function createNote() {
    btnCreateNote.addEventListener('click', () => {
        createNoteDialog.showModal()
        const btnSend = createNoteDialog.querySelector('#sendNoteData')
        const btnAddItem = createNoteDialog.querySelector('#addChecklistItem')
        const btnDeleteItem = createNoteDialog.querySelector('#deleteChecklistItem')
        const checklistTable = createNoteDialog.querySelector('.checklist-choice-part2')
        const tableItems = checklistTable.querySelector('tbody')
        btnAddItem.addEventListener('click', (e) => {
            e.preventDefault()
            const userInput = createNoteDialog.querySelector('#newChecklistItem').value
            if(userInput){
                const newRow = document.createElement('tr')
                const newData = document.createElement('td')
                newData.textContent = userInput
                newRow.appendChild(newData)
                tableItems.appendChild(newRow)
            }
        })
        btnDeleteItem.addEventListener('click', (e) => {
            e.preventDefault()
            const allRows = tableItems.querySelectorAll('tr')
            if(allRows.length != 0){
                allRows[allRows.length -1].remove()
            }
        })
        btnSend.addEventListener('click', () => {
            
            createNoteDialog.close()
        })
    })
}




const btnDateToday = document.querySelector('.dateToday')
const btnDateWeek = document.querySelector('.dateWeek')














const test = ['tempTitle', 'tempDesc', 'Medium', '19/12/1994', 'default', 'testing...', {checklist: ['option1', 'option2']}]
const test2 = ['tempTitle', 'tempDesc', 'Low', '19/12/1994', 'Project1', 'testing...', {checklist: ['option1', 'option2']}]

createTODO(...test, noteList)
createTODO(...test2, noteList)
btnSearch(noteList)
createNote()





// const testing = `<div class="todo-card">
//                     <h1>Title of TODO</h1>
//                     <h2>Description of TODO</h2>
//                     <h3>Date of TODO</h3>
//                     <h4>Priority of TODO</h4>
//                     <h5>Medium</h5>
//                     <p><Span><strong>Notes: </strong></Span> notes of the TODO</p>
//                     <form action="" class="checklist-TODO">
//                         <fieldset>
//                             <legend>Checklist</legend>
//                             <label class="checkbox"><input type="checkbox" name="" class="option-1">option-1</input></label>
//                             <label class="checkbox"><input type="checkbox" name="" class="option-2">option-2</input></label>
//                             <label class="checkbox"><input type="checkbox" name="" class="option-3">option-3</input></label>
//                         </fieldset>
//                     </form>
//                 </div>`
// const testBtn = document.querySelector('.createNote')

// testBtn.addEventListener('click', () => {
//     noteContainer.innerHTML += testing
// })