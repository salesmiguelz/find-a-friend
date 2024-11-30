export class NoPetsMatchFilters extends Error {
    constructor() {
        super("No pets match the filters!");
    }
}
