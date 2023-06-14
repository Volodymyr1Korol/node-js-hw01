const fs = require('fs');
const path = require('path');
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const { nanoid } =  import('nanoid');

function listContacts() {
    fs.readFile(contactsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        const contacts = JSON.parse(data);
        contacts.forEach((contact, index) => {
            console.log(`Contact ${index + 1}:`, contact);
        });
    });
}

function getContactById(contactId) {
    fs.readFile(contactsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        const contacts = JSON.parse(data);
        const contact = contacts.find(c => c.id === contactId);
        if (contact) {
            console.log('Contact:', contact);
        } else {
            console.log(`No contact found with ID: ${contactId}`);
        }
    });
}

function removeContact(contactId) {
    fs.readFile(contactsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        let contacts = JSON.parse(data);
        const initialLength = contacts.length;
        contacts = contacts.filter(contact => contact.id !== contactId);

        if (contacts.length === initialLength) {
            console.log(`No contact found with ID: ${contactId}`);
            return;
        }

        fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log(`Removed contact with ID: ${contactId}`);
            }
        });
    });
}


async function addContact(name, email, phone) {
    const nanoid = await import('nanoid');

    fs.readFile(contactsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        const contacts = JSON.parse(data);

        // Check if a contact with the same name, email, or phone already exists
        const duplicateContact = contacts.find(contact =>
            contact.name === name || contact.email === email || contact.phone === phone
        );
        if (duplicateContact) {
            console.error('A contact with the same name, email, or phone already exists');
            return;
        }

        const newContact = {
            id: nanoid.default(),
            name,
            email,
            phone
        };
        contacts.push(newContact);
        fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
            } else {
                console.log(`Added new contact:`, newContact);
            }
        });
    });
}





module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact

};
