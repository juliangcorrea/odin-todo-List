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

export default createTODO