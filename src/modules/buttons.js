import { renderByFilter, renderAll } from './renderNote'

/* Main Functions */

function searchByProject(mainArray, projectList){
    const btnProject = document.querySelector('.btnProject')
    const selectedItems = document.querySelector('#searchProject')
    btnProject.addEventListener('click', (e) => {
        e.preventDefault()
        const projectFilter = selectedItems.options[selectedItems.selectedIndex].value
        if(projectFilter){
            renderByFilter('project', `${projectFilter}`, mainArray)
        }
    })
}

function searchByPriority(mainArray){
    const btnPriority = document.querySelector('.priorities')
    const overlay = document.getElementById('overlay')
    btnPriority.addEventListener('click', () => {
        const priority = document.getElementById('priority-dialog')
        overlay.style.display = 'block';
        priority.showModal()
        const btnSearchPriority = priority.querySelector('#prioritySearch')
        btnSearchPriority.addEventListener('click', () => {
            const selectedRadio = priority.querySelector('input[name="choice"]:checked')
            if(selectedRadio){
                const searchFilter = selectedRadio.value
                renderByFilter('priority', `${searchFilter}`, mainArray)
                overlay.style.display = 'none'
                priority.close()
            }
        })
    })
    
}

function searchByDate(mainArray){
    const btnsDate = document.querySelectorAll('.date')
    btnsDate.forEach(element => {
        if(element.dataset.date == 'today'){
            const dueDate = getDate()
            element.addEventListener('click', () => {
                renderByFilter('dueDate', dueDate, mainArray)
            })
        } else {
            element.addEventListener('click', () =>{
                const tempData = mainArray.filter(item => isDateThisWeek(item.dueDate) == true)
                renderAll(tempData)
            })
        }
    });
}

function searchAll(mainArray){
    const btnAllNotes = document.querySelector('.allNotes')
    btnAllNotes.addEventListener('click', () => {
        renderAll(mainArray)
    })
}

function btnSearch(mainArray, projectList){
    renderAll(mainArray)
    searchByProject(mainArray, projectList)
    searchByPriority(mainArray)
    searchByDate(mainArray)
    searchAll(mainArray)
}


/* Auxiliary Functions */

function getDate(){
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
}

function isDateThisWeek(dateString) {
    const [day, month, year] = dateString.split('/').map(num => parseInt(num, 10))
    const givenDate = new Date(year, month - 1, day)
    givenDate.setHours(0, 0, 0, 0)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const currentDay = today.getDay()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - currentDay + 1)
    startOfWeek.setHours(0, 0, 0, 0)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)
    return givenDate >= startOfWeek && givenDate <= endOfWeek
}


export default btnSearch