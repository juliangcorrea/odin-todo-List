import { renderByFilter, renderAll } from './renderNote'

function searchByProject(mainArray){
    const btnProject = document.querySelector('.btnProject')
    btnProject.addEventListener('click', (e) => {
        e.preventDefault()
        const selectedItems = document.getElementById('searchProject')
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

function searchAll(mainArray){
    const btnAllNotes = document.querySelector('.allNotes')
    btnAllNotes.addEventListener('click', () => {
        renderAll(mainArray)
    })
    
}

function btnSearch(mainArray){
    renderAll(mainArray)
    searchByProject(mainArray)
    searchByPriority(mainArray)
    searchAll(mainArray)
}

export default btnSearch