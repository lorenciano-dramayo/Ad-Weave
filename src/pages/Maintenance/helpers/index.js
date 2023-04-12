
const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }

    if (b[orderBy] > a[orderBy]) {
        return 1;
    }

    return 0;
}

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }

        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const filterSearch = (list, filter) => list.filter((obj) => Object.values(obj).flat().some(v => `${v}`.toLowerCase().includes(`${filter}`.toLowerCase())));

const optionProperty = (title, selectedLength) => {
    switch (title) {
        case 'Edit':
            return (selectedLength <= 0 ||
                selectedLength > 1)
        case 'Add':
            return selectedLength > 0
        case 'Archive':
            return selectedLength <= 0
        default:
            return false;
    }
}

export { descendingComparator, getComparator, stableSort, filterSearch, optionProperty }