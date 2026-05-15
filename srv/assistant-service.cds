using { cuid } from '@sap/cds/common';

@(requires: 'User')

service Assistant {

    action ask(question : String) returns String;

}