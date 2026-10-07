const { createUser } = require('./user');
const { formatMsg } = require('./formatter');

console.log('--- Processing Alice ---');
const userAlice = createUser('Alice', 100, 20);
console.log('Alice created:', userAlice);
const messageAlice = formatMsg(userAlice.name, userAlice.score);
console.log('Message for Alice:', messageAlice);

console.log('\n--- Processing Bob ---');
const userBob = createUser('Bob', 80, 15);
console.log('Bob created:', userBob);
const messageBob = formatMsg(userBob.name, userBob.score);
console.log('Message for Bob:', messageBob);

console.log('\n--- Finished ---');
