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

export default changePriorityColor