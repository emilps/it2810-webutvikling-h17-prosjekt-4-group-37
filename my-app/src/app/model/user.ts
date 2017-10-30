export class User {

    constructor(
        public name : String,
        public password: String,

    ){}

    static CreateDefault(): User {
        return new User( '', '');
    }
}
