const express = require('express');
//const ejs = require('ejs');
const bp = require('body-parser');
const path = require('path');
const app = express();
const session = require('express-session');
var multer = require('multer');
var storage = multer.memoryStorage(); // resim yüklemek için eklendi.
var upload = multer({ storage: storage }); // resim yüklemek için eklendi.

const port = 3000;
const login = require('./loginOps');
app.use(session({
    secret: 'Özel-Anahtar',
    resave: false,
    saveUninitialized: true
}));


app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/javascript', express.static(path.join(__dirname, 'javascript')));

app.set('view engine', 'ejs');
app.use(bp.urlencoded({ extended: false }));
app.get('/', (req, res) => res.render('Anasayfa'));

app.get('/Anasayfa', (req, res) => res.render('Anasayfa'));



app.get('/etkinlikolustur/:Id', function (req, res) {
    res.render('etkinlikolustur');
});

app.post('/etkinlikolustur/:Id', upload.single('İmageUpload'), login.userLogin); // upload single resim için.
app.get('/gozat', login.userGozAt);
app.get('/etkinlikleregozat', login.userGozAt);

app.get('/etkinlikbilgileri/:id', login.userEtkinlikBilgileri);


app.get('/Login', login.Giris);
app.post('/Login', login.userGiris);
app.get('/oturumac', login.UyeOl);
app.post('/oturumac', login.userOturumAc);


app.get('/EtkinlikYonet/:Id', login.userYonet);
app.get('/EtkinlikYonet', login.userYonet2);
app.get('/unutmaoncesi', login.SifreOncesi);
app.post('/unutmaoncesi', login.userSifreOncesi);

app.post('/sifremiunuttum', login.usersifreunutmak);

app.get('/profil', login.userprofil);
app.get('/konusmacibilgileri/:id', login.userKonusmaciBilgileri);
app.get('/kategori', function (req, res) {
    res.render('kategori')
})
app.get('/etkinlikguncelle/:id', login.userGuncelle);
app.post('/etkinlikguncelle', login.Guncelle);
app.post('/EtkinlikYonet/:id', login.sil);

app.get('/kitap', login.kitap);
app.get('/muzik', login.muzik);
app.get('/sinema', login.sinema);
app.get('/sanat', login.sanat);
app.get('/meeting', login.meeting);
app.get('/fuar', login.fuar);
app.get('/spor', login.spor);

app.get('/adminpanel', login.userPanel);

app.get('/adminpanellogin', function (req, res) {
    res.render('adminpanellogin')
})
app.post('/adminpanellogin', login.userGirisPanel);

app.listen(port, () => console.log(`Port Çalışıyor :  ${port}!`));
