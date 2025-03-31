export const getInitialLettersFromName = (fullname:string)=>{
    const firstSecondName = fullname.split(' ').slice(0,2);
    const initials = firstSecondName.map((name)=>{
        return name.charAt(0).toUpperCase();
    })
    return initials.join('');
}