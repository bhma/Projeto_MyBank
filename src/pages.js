const { addClient, findClient, listAllClients } = require('./db');

function pageIndex(req, res){
    return res.render('index.html');
}

function pageRegister(req, res){
    return res.render('register.html');
}

async function pageClientList(req, res){
    const clientList = await listAllClients();
    return res.render('client-list.html', { clientList });
}

async function saveClient(req, res){
    let flag, newClient;
    newClient = {
        name: req.body.name,
        email: req.body.email,
        cpf: req.body.cpf
    }
    flag = await addClient(newClient);
    if(flag !== -1){
        console.log('Cliente salvo com sucesso!');
    }else{
        console.log('Algum erro acorreu');
    }
    return res.render('client-list.html');
}

async function searchClient(req, res){
    const clientSearched = {
        name: req.query.name,
        cpf: req.query.cpf
    }

    const clientList = await findClient(clientSearched);
    
    res.render('client-list.html', { clientList });
}

module.exports = { 
    pageIndex,
    pageRegister,
    pageClientList,
    saveClient,
    searchClient
 }