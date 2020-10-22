const express = require('express');
const { readFile, writeFile } = require('./db');
const { 
    pageIndex,
    pageRegister,
    pageClientList,
    saveClient,
    searchClient
 } = require('./pages');
const server = express();

global.fileClient = 'clientsFile.json'

// configura nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

server
.use(express.urlencoded({extended: true}))
.use(express.static("public"))
.get('/', pageIndex)
.get('/register', pageRegister)
.get('/clientList', pageClientList)
.post('/saveClient', saveClient)
.get('/searchClient', searchClient)
.listen(8080, async () =>{
    try {
        await readFile(global.fileClient);
        console.log('Server Up!')
    } catch (error) {
        console.log(error);
    }
});
