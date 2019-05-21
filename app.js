
const express = require('express');
//const ejs = require('ejs');
const bp = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
const login = require('./loginOps');

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/javascript', express.static(path.join(__dirname, 'javascript')));

app.set('view engine', 'ejs');
app.use(bp.urlencoded({ extended: false }));
app.get('/', (req, res) => res.send('Hello World!'));
app.get('/etkinlikolustur', login.userLogin);
app.get('/guncelle', login.userGuncelle);

app.post('/guncelle', login.Guncelle);

app.post('/etkinlikolustur', login.userLogin);
app.get('/gozat', login.userGozAt);
app.get('/etkinlikleregozat', login.userGozAt);

app.get('/etkinlikbilgileri', login.userEtkinlikBilgileri);

app.get('/Login', login.Giris);
app.post('/Login', login.userGiris);
app.get('/oturumac', login.UyeOl);
app.post('/oturumac', login.userOturumAc);


app.get('/Anasayfa', function (req, res) {
    res.render('Anasayfa');
});
app.get('/EtkinlikYonet', login.userYonet);

app.get('/unutmaoncesi', login.SifreOncesi);
app.post('/unutmaoncesi', login.userSifreOncesi);

app.post('/sifremiunuttum', login.usersifreunutmak);

app.get('/profil', login.userprofil);

app.get('/KullaniciGiris', login.userAnasayfaLogin)

app.listen(port, () => console.log(`Port Çalışıyor :  ${port}!`));
