export const getDataAttributesFromCheckbox = (groupsUser:string[]) =>{
    const dataAttributesGroups:string[] = []
    groupsUser.forEach(item =>{
        const value = document.querySelector(`[data-value="${item}"]`);
        if(value) dataAttributesGroups.push(value.getAttribute("data-value") as string);
    })
    return dataAttributesGroups;
}