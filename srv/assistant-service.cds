service AssistantService @(requires: 'any') {

    action ask(question : String) returns {
        answer : String;
        sources : LargeString;
    };

}