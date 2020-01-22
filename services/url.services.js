var firebase = require('../database/firebase');

const adicionarUrl = async (url, CUSTOM_ALIAS) => {
    try {
        firebase.urlRef.push().set({
            custom_alias: CUSTOM_ALIAS,
            url: url,
            acessos: 0
        });
    } catch (e) {
        throw Error(e);
    }
}

const verificarCustomAlias = async(alias) => {
    try {
       const eventoRef = firebase.urlRef.orderByChild("custom_alias").equalTo(alias);
       const snapshot = await eventoRef.once("value");
       if(snapshot.exists()){
           return snapshot.val();
       }
       return false;
    } catch (e) {
        throw Error(e);
    }
}

const atualizarDoc = async (doc, acessos) => {
    try {
        var urlRef = firebase.db.ref('url/' + doc);

        urlRef.update({acessos : acessos + 1})
        .then(() => {
            //console.log("Atualizado com sucesso")
        })
        .catch(e => {
            throw Error(e);
        });    
    } catch (e) {
        throw Error(e);
    }
}

const getTop10 = async () => {
    var top10 = [];
    try {
        firebase.urlRef.on("value", function(snapshot) {
            top10.push(snapshot.val());
        }, function (errorObject) {
            console.log("Falha na leitura: " + errorObject.code);
        });

        return top10.sort((a, b) => b - a).slice(0,10);
    } catch (e) {
        throw Error(e);
    }
}

exports.adicionarUrl = adicionarUrl;
exports.verificarCustomAlias = verificarCustomAlias;
exports.atualizarDoc = atualizarDoc;
exports.getTop10 = getTop10;