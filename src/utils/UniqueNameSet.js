
class UniqueNameSet extends Set {
    constructor(values) {
        super(values);

        const names = [];
        // @ts-ignore
        for (let value of this) {
            if (names.includes(value.title)) {
                this.delete(value);
            } else {
                names.push(value.title);
            }
        }
    }
}

export default UniqueNameSet;