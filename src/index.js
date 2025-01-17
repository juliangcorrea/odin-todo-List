import './styles.css'

// const protoNote = {
//     title,
//     description,
//     dueDate,
//     priority,
//     notes,
//     checklist
// }

const testing = `<div class="todo-card">
                    <h1>Title of TODO</h1>
                    <h2>Description of TODO</h2>
                    <h3>Date of TODO</h3>
                    <h4>Priority of TODO</h4>
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
    const testing2 = document.querySelector('.notes-container')
    testing2.innerHTML += testing
})