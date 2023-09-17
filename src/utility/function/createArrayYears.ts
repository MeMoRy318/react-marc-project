const createArrayYears = ():number[] => {
    const arrayYears = [];

    for (let i = 1990; i <= new Date().getFullYear(); i++) {
        arrayYears.push(i);
    }
    return arrayYears;
};

export { createArrayYears };
