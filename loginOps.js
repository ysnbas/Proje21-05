const sql = require('mssql');

var webconfig = {
  user: 'Depo  ',
  password: 'ysnbas',
  server: '10.201.175.169',
  database: 'Proje'
};

module.exports.userGuncelle = function (req, res) {
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query('', function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      console.log(verisonucu.recordsets);
      sql.close();
      res.render('home', { veri: verisonucu.recordsets });
    });
  });
};

module.exports.Guncelle = function (req, res) {
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    // req bodyleri düzenle !
    request1.query( // ETKİNLİK GÜNCELLE
      `
        UPDATE tbl_EtkinlikOlustur set 
        EtkinlikAdi = '${req.body.yeni_etkinlikAdi}',
        Lokasyon = '${req.body.yeni_Lokasyon}',
        BaslangıcTarih = '${req.body.yeni_baslangicTarihi}',
        BaslangicSaati = '${req.body.yeni_baslangicSaati}',
        BitisSaati = '${req.body.yeni_bitisSaati}',
        BitisTarihi = '${req.body.yeni_bitisTarihi}',
        WebSiteUrl = '${req.body.yeni_webSiteUrl}',
        AciklamaBir = '${req.body.yeni_aciklama}',
        ResimYukle = '${req.body.yeni_resimYukle}',
        OrganizatörAdi = '${req.body.yeni_organizatorAdi}',
        FacebookLink = '${req.body.yeni_facebookLink}',
        TwitterLink = '${req.body.yeni_twitterLink}',
        İnstagramLink = '${req.body.yeni_instagramLink}',
        BiletUcret = '${req.body.yeni_biletUcreti}',
        BiletAdet = '${req.body.yeni_biletAdeti}',
        EkBilgi = '${req.body.yeni_biletAdeti}',
        EtkinlikTipi = '${req.body.yeni_etkinlikTipi}',
        EtkinlikKonusu = '${req.body.yeni_etkinlikKonusu}',
        PublicOrRepublic = '${req.body.yeni_Public}'
        WHERE id = '${req.body.guncellenecekEtkinlikId}'
        `,
      function (err, dataresult) {
        if (err) {
          console.log(err);
        } else {
          res.send("güncelleme başarılı");
        }
        sql.close();
      }
    );
  });
}
module.exports.userGozAt = function (req, res) {
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("select * from tbl_EtkinlikOlustur", function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      console.log(verisonucu.recordset);
      sql.close();
      res.render('etkinlikleregozat', { veri: verisonucu.recordset });
    });
  });
};

// ETKİNLİK OLUŞTUR
module.exports.userLogin = function (req, res) {
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("INSERT INTO tbl_EtkinlikOlustur(EtkinlikAdi,Lokasyon,BaslangıcTarih,BitisTarihi,BaslangicSaati,BitisSaati,WebSiteUrl,AciklamaBir,ResimYukle,OrganizatörAdi,Aciklamaİki,FacebookLink,TwitterLink,İnstagramLink,BiletAdi,BiletUcret,BiletAdet,EkBilgi,EtkinlikTipi,EtkinlikKonusu,EtkinlikId) VALUES('" + req.body.EtkinlikAdi + "','" + req.body.location + "','" + req.body.start_date + "','" + req.body.end_date + "','" + req.body.start_time + "','" + req.body.end_time + "','" + req.body.eventurl + "','" + req.body.AciklamaBir + "','" + req.body.İmageUpload + "','" + req.body.OrganizatorName + "','" + req.body.Aciklamaİki + "','" + req.body.Facebook + "','" + req.body.twitter + "','" + req.body.İnstagram + "','" + req.body.biletadi + "','" + req.body.ucret + "','" + req.body.adetsayisi + "','" + req.body.gender + "','" + req.body.Tip + "','" + req.body.Konu + "','" + req.body.uyeid + "')", function (err, data) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('etkinlikolustur');
    });
  });
};


// OTURUM AÇ
module.exports.UyeOl = function (req, res) {
  res.render('oturumac');
}
module.exports.Giris = function (req, res) {

  res.render('Login', { hata: '' });
}

module.exports.userOturumAc = function (req, res) {
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("INSERT INTO tbl_Uye(KullanıcıAdi,Adi,Soyadi,Email,Sifre)  VALUES('" + req.body.kullanici_Adi + "','" + req.body.uye_Adi + "','" + req.body.uye_Soyadi + "','" + req.body.uye_EMail + "','" + req.body.uye_Sifre + "')", function (err, data) {
      if (err) {
        console.log(err);
      }

      sql.close();


    });
  });
};

module.exports.userGiris = function (req, res) {
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("select dbo.fn_UyeVarmi('" + req.body.ad + "','" + req.body.sifre + "') as Sonuc", function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      verisonucu.recordset.forEach(function (kullanici) {
        request1.query("select * from tbl_Uye where Id = (select Id from tbl_Uye where KullanıcıAdi = 'Depo')", function (err, data) {
          if (kullanici.Sonuc == "Evet") {
            res.render('KullaniciGiris', { veri: data.recordset });
          }


          else {
            res.render('Login', { hata: 'Kullanıcı adı veya sifre hatalı' });

          }
          sql.close();
        })
      });
    });


  });
};
/*module.exports.userGiris = function (req, res) {
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("select dbo.fn_UyeVarmi('" + req.body.ad + "','" + req.body.sifre + "') as Sonuc", function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      verisonucu.recordset.forEach(function (kullanici) {
        if (kullanici.Sonuc == "Evet") {

        }
        else {
          res.render('Login', { hata: 'Kullanıcı adı veya sifre hatalı' });

        }
        sql.close();

      });
    });
  });
}*/
module.exports.SifreOncesi = function (req, res) {
  res.render('unutmaoncesi', { varmı: '' });
}
module.exports.userSifreOncesi = function (req, res) {
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("select dbo.fn_SifreOncesi('" + req.body.emailcontrol + "','" + req.body.kullaniciname + "') as varmı", function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      verisonucu.recordset.forEach(function (kullanici) {
        if (kullanici.varmı == "Evet") {
          res.render('sifremiunuttum', { Email: req.body.emailcontrol, KullanıcıAdi: req.body.kullaniciname });
        }
        else {
          res.render('unutmaoncesi', { varmı: 'Kullanıcı adı veya email hatalı' });

        }
        sql.close();

      });
    });
  });
}

module.exports.usersifreunutmak = function (req, res) {
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("update tbl_Uye set Sifre='" + req.body.sifre_forget + "' where Email='" + req.body.eemailadi + "' and KullanıcıAdi='" + req.body.kkullaniciadi + "'", function (err, data) {
      if (err) {
        console.log(err);
      }
      res.render('KullaniciGiris');
      sql.close();
    });
  });
};


module.exports.userYonet = function (req, res) {
  // sql.close();
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("select * from tbl_EtkinlikOlustur", function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      console.log(verisonucu.recordset);
      sql.close();
      res.render('EtkinlikYonet', { data: verisonucu.recordset });
    });
  });
};
module.exports.userEtkinlikBilgileri = function (req, res) {
  // sql.close(); // ETKİNLİK BİLGİLERİ
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query('select * from tbl_EtkinlikOlustur,tbl_Uye WHERE tbl_EtkinlikOlustur.EtkinlikId=tbl_Uye.Id ', function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('etkinlikbilgileri', { veri: verisonucu.recordset });
    });
  });
};
module.exports.userprofil = function (req, res) {
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query('select * from tbl_EtkinlikOlustur', function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('profil', { veri: verisonucu.recordset });
    })
  });
};
module.exports.userAnasayfaLogin = function (req, res) {
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("select * from tbl_Uye where Id = (select Id from tbl_Uye where KullanıcıAdi = 'Depo')", function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('KullaniciGiris', { veri: verisonucu.recordset });

    })
  });
};