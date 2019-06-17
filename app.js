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
app.get('/etkinlikleregozat/:Id', login.userGozAt);
app.post('/etkinlikleregozat/:Id', login.UserKatıl);

app.get('/EtkinlikBilgileri/:id', login.userEtkinlikBilgileri);

app.get('/etkinlikleregozat', login.userGozAt2)
app.get('/Login', login.Giris);
app.post('/Login', login.userGiris);
app.get('/oturumac', login.UyeOl);
app.get('/etkinlikleregozat/katil/:id', login.katil);

app.post('/oturumac', login.userOturumAc);


app.get('/EtkinlikYonet/:Id', login.userYonet);
app.get('/EtkinlikYonet', login.userYonet2);
app.get('/unutmaoncesi', login.SifreOncesi);
app.post('/unutmaoncesi', login.userSifreOncesi);

app.post('/sifremiunuttum', login.usersifreunutmak);

app.get('/profil/:Id', login.userprofil);
app.get('/konusmacibilgileri/:id', login.userKonusmaciBilgileri);
app.get('/kategori', function (req, res) {
    res.render('kategori')
})
app.get('/etkinlikguncelle/:id', login.userGuncelle);
app.post('/etkinlikguncelle', login.Guncelle);
app.post('/EtkinlikYonet/:id', login.sil);

app.get('/muzik/:Id', login.muzik);
app.get('/sinema/:Id', login.sinema);
app.get('/meeting/:Id', login.meeting);
app.get('/fuar/:Id', login.fuar);
app.get('/spor/:Id', login.spor);
app.get('/fotografcilik/:Id', login.fotografcilik);




app.get('/adminpanel/adminpanel', login.userPanel);

app.get('/adminpanellogin', function (req, res) {
    res.render('adminpanellogin')
})
app.post('/adminpanellogin', login.userGirisPanel);
app.get('/istatistikler', login.istatistik);

app.get('/adminpanel/etkinliklistele', login.etkinlikPanel);
app.post('/adminpanel/etkinliklistele/:id', login.etkinlikSil);

app.post('/adminpanel/:Id', login.SİL);


app.get('/Etkinliklerim/:Id', login.UserEtkinliklerim);

app.listen(port, () => console.log(`Port Çalışıyor :  ${port}!`));
