const { promises } = require('fs');
const { readFile, writeFile } = promises;

async function addClient(client){
    try {
        const json = await readFile(global.fileClient);
        const data = JSON.parse(json);

        let newClient = {
            id: data.nextId,
            name: client.name,
            email: client.email,
            cpf: client.cpf
        }

        data.nextId += 1;
        data.clientList.push(newClient);

        await writeFile(global.fileClient, JSON.stringify(data, null, 2));
        return 1;
    } catch (error) {
        console.log(error);
    }
}

async function findClient(clientS){
    try {
        const json = await readFile(global.fileClient);
        const data = JSON.parse(json);
        const clientSearched = data.clientList.filter( client => client.name === clientS.name && client.cpf === clientS.cpf);
        return clientSearched;
    } catch (error) {
        console.log(error);
    }
}

async function listAllClients(){
    try {
        const json = await readFile(global.fileClient);
        const data = JSON.parse(json);
        return data.clientList;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addClient,
    findClient,
    readFile, 
    writeFile,
    listAllClients
}