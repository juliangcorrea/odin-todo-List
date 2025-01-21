import './styles.css'
import createTODO from './modules/createNote'
import btnSearch from './modules/buttons'


const noteList = []

const createProject = document.querySelector('.createProkject')




const btnDateToday = document.querySelector('.dateToday')
const btnDateWeek = document.querySelector('.dateWeek')














const test = ['tempTitle', 'tempDesc', 'Medium', '19/12/1994', 'default', 'testing...', {checklist: ['option1', 'option2']}]
const test2 = ['tempTitle', 'tempDesc', 'Low', '19/12/1994', 'Project1', 'testing...', {checklist: ['option1', 'option2']}]

createTODO(...test, noteList)
createTODO(...test2, noteList)
btnSearch(noteList)





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