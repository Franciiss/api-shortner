let express = require("express");
let router = express.Router();

const urlServices = require("../services/url.services");
const lzwCompression = require("../lzwCompression"); 

const getDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9
    const NS_TO_MS = 1e6
    const diff = process.hrtime(start)

    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

router.put('/api-shortner', async (req, res) => {

    console.log(`${req.method} ${req.originalUrl} [STARTED]`)
    const start = process.hrtime()

    res.on('finish', () => {            
        const durationInMilliseconds = getDurationInMilliseconds (start)
        console.log(`${req.method} ${req.originalUrl} [FINISHED] ${durationInMilliseconds .toLocaleString()} ms`)
    })

    res.on('close', () => {
        const durationInMilliseconds = getDurationInMilliseconds (start)
        console.log(`${req.method} ${req.originalUrl} [CLOSED] ${durationInMilliseconds .toLocaleString()} ms`)
    })

    next()

    var obj = {
        url: req.query.url,
        CUSTOM_ALIAS: req.query.CUSTOM_ALIAS,
        statistics: {
            time_taken: res.elapsedTime
        }
    }

    var fullUrl = getFullUrl(req);

    if(!obj.CUSTOM_ALIAS){
        const aliasEncoded = await lzwCompression.encode(obj.url);

        const docVerificado = await urlServices.verificarCustomAlias(aliasEncoded);

        if (docVerificado) {
            return res.status(409).send({ alias: docVerificado.custom_alias, ERR_CODE: "001", Description: "ALIAS ALREADY EXISTS" });
        }

        objUrlComAliasEnconded = fullUrl + "/" + aliasEncoded;

        urlServices.adicionarUrl(objUrlComAliasEnconded, aliasEncoded);

        return res.status(201).send({ alias: aliasEncoded, url: objUrlComAliasEnconded, statistics: "" });
    } else {
        const docVerificado = await urlServices.verificarCustomAlias(obj.CUSTOM_ALIAS);

        if (docVerificado) {
            return res.status(409).send({ alias: docVerificado.custom_alias, ERR_CODE: "001", Description: "CUSTOM ALIAS ALREADY EXISTS" });
        }

        objUrlComAlias = fullUrl + obj.CUSTOM_ALIAS;
        urlServices.adicionarUrl(objUrlComAlias, obj.CUSTOM_ALIAS);
        return res.status(202).send({ alias: obj.CUSTOM_ALIAS, url: objUrlComAlias, statistics: "" });
    
    }
});

router.get('/api-shortner/:alias', async (req, res) => {
    const alias = req.params.alias;
    const docVerificado = await urlServices.verificarCustomAlias(alias);

    if(docVerificado){
        urlServices.atualizarDoc(Object.keys(docVerificado)[0], Object.values(docVerificado)[0].acessos)
        return res.status(200).send(docVerificado);
    }
    
    return res.status(404).send({ ERR_CODE: "002", Description: "SHORTENED URL NOT FOUND" });
});

router.get('/ver/top10', async (req, res) => {
    var top10 = await urlServices.getTop10();

    return res.status(200).send(top10);    
});


getFullUrl = (req) => {
    return req.protocol + '://' + req.get('host') + req.path;
}


module.exports = router;