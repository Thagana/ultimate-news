export default (name) => {
    const arrayLast = name.split('.');
    const type = arrayLast[-1];
    switch(type){
        case 'png':
            return 'png';
        case 'jpg':
            return 'jpg';
        case 'jpeg':
            return 'jpeg';
        default:
            return 'jpg';
    }
}