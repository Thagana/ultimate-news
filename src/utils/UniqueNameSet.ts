
class UniqueNameSet extends Set {
    constructor(values: any) {
        super(values);

        const names: any = [];
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