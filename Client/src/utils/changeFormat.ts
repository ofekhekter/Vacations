

export const changeStringFormat = (value: string) => {
    const [year, month, day] = value.split('').map(word => word === '-' ? '.' : word).join('').split('.');
    return `${day}.${month}.${year}`;
}