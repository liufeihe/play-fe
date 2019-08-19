let count = 0;

const getDateStr = () => {
    return new Date().toLocaleDateString()
}

const getCountData = () => {
    return count;
}
const incrCountData = ()=>{
    count += 1;
}

export {
    getDateStr,
    getCountData,
    incrCountData
}