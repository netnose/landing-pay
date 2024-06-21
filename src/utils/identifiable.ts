type Identifiable<T> = {
    id: T
};

function findFirst<T>(collection: readonly Identifiable<T>[], value: Identifiable<T>): number {
    for (let i = 0; i < collection.length; i++) {
        if (collection[i].id === value.id) {
            return i;
        }
    }
    return -1;
}

export function unique<T>(collection: readonly Identifiable<T>[]): any[] {
    return collection.filter((value, index) => findFirst(collection, value) === index);
}
