const { readdirSync } = require('fs');
const ascii = require('ascii-table');
const client = require('..');
let table = new ascii("Events");
table.setHeading('Events', 'Load');

module.exports = (client) => {
    readdirSync('./events/').forEach((file) => {
        const events = readdirSync('./events/').filter((file) =>
        file.endsWith('.js')
        );
        for (let file of events) {
            let pull = require(`../events/${file}`);
            if(pull.name) {
                client.events.set(pull.name, pull);
            }
        }
        table.addRow(file, 'OK')
    });
    console.log(table.toString());
}
