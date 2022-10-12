const AWS = require('aws-sdk');
const fs = require('fs')
const s3 = new AWS.S3({
    accessKeyId:"",
    secretAccessKey: ""
}); //Iam USERS, security, access key ID


//LISTAR BUCKETS
s3.listBuckets({}, (err,data) => {
    if (err) throw err;
    console.log(data);
})

//MOSTAR OBJETOS DENTRO DE BUCKETS
var parametros = {
    Bucket: '' //BUCKET NOMBRE
}
s3.listObjectsV2({Bucket}, (err,data) => {
    if (err) throw err;
    console.log(data);

})

//Traer archivo desde S3
var parametrosGetObject = {
    Bucket : '', //NOMBRE BUCKET
    Key: '' //PATH HACIA EL OBJETO Ej: imagenes/archivo.png
}
s3.getObject({parametrosGetObject},(err,data)=>{
    if (err) throw err;
    console.log(data);
    fs.writeFile("imagen.png", data.Body,'binary', (err)=> {
        if (err) throw err;
        console.log("Objeto grabado")
    })
})

//SUBIR ARCHIVO A S3
fs.readFile("info.txt", (err,data)=>{
    if (err) throw err;
    var parametrosPutObject = {
        Bucket: '',
        Key: "",
        Body: data
    } 
    s3.putObject(parametrosPutObject, (err,data) =>{
        if (err) throw err;
        console.log(data)
    })
})


