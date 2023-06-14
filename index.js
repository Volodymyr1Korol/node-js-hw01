const contacts = require('./contacts');


const { Command } = require("commander");
const program = new Command();
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            contacts.listContacts();
            break;

        case "get":
            contacts.getContactById(id);
            break;

        case "add":
            await contacts.addContact(name, email, phone);
            break;

        case "remove":
            contacts.removeContact(id);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);
// List all contacts
//contacts.listContacts();

// Get a contact by ID
//contacts.getContactById('05olLMgyVQdWRwgKfg5J6'); // replace 1 with any valid ID
//
// // Remove a contact
// contacts.removeContact('qdggE76Jtbfd9eWJHrssH'); // replace 1 with any valid ID
//
// // Add a contact
//contacts.addContact('John Doe', 'johndoe@example.com', '123-456-7890');
