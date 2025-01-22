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

function addSlider(){
    const allNotes = document.querySelectorAll('.todo-card')
    allNotes.forEach(element => {
        const btnExtend = element.querySelector('.extendCard')
        const wrapper = element.querySelector('.wrapper')
        btnExtend.addEventListener('click', () => {
            wrapper.classList.toggle('is-open')
        })
    });
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

export  { changePriorityColor, addSlider, deleteCard }