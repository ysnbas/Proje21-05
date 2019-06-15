const sql = require('mssql');

var webconfig = {
  user: 'Depo  ',
  password: 'ysnbas',
  server: '192.168.0.26',
  database: 'Proje'
};
/*
var webconfig = {
  user: 'papatyagul',
  password: 'papatya123',
  server: 'ETKINLIK.mssql.somee.com',
  database: 'ETKINLIK',
  port: 1433
};*/
module.exports.userGuncelle = function (req, res) {
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("", function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      console.log(verisonucu.recordset);
      sql.close();
      res.render('etkinlikguncelle', {
        userid: req.params.id

      });
    });
  });
};

module.exports.Guncelle = function (req, res) {
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();

    request1.query( // ETKİNLİK GÜNCELLE
      `
        UPDATE tbl_EtkinlikOlustur set 
        EtkinlikAdi = '${req.body.yeni_etkinlikAdi}',
        Lokasyon = '${req.body.yeni_Lokasyon}',
        BaslangıcTarih = '${req.body.yeni_baslangicTarihi}',
        BaslangicSaati = '${req.body.yeni_baslangicSaati}',
        BitisSaati = '${req.body.yeni_bitisSaati}',
        BitisTarihi = '${req.body.yeni_bitisTarihi}',
        WebSiteUrl = '${req.body.eventurl}',
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
        EtkinlikKonusu = '${req.body.yeni_etkinlikKonusu}'
        WHERE id = '${req.body.guncellenecekEtkinlikId}'
        `,
      function (err, dataresult) {
        if (err) {
          console.log(err);

        } else {
          res.send('EtkinlikYonet e geri gitmesi gerekiyor!!!!!!!!!!!!!');
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
    request1.query(
      "INSERT INTO tbl_EtkinlikOlustur(EtkinlikAdi,Lokasyon,BaslangıcTarih,BitisTarihi,BaslangicSaati,BitisSaati,WebSiteUrl,AciklamaBir,ResimYukle,OrganizatörAdi,Aciklamaİki,FacebookLink,TwitterLink,İnstagramLink,BiletAdi,BiletUcret,BiletAdet,EkBilgi,EtkinlikTipi,EtkinlikKonusu,EtkinlikId) VALUES('" +
      req.body.EtkinlikAdi +
      "','" +
      req.body.location +
      "','" +
      req.body.start_date +
      "','" +
      req.body.end_date +
      "','" +
      req.body.start_time +
      "','" +
      req.body.end_time +
      "','" +
      req.body.eventurl +
      "','" +
      req.body.AciklamaBir +
      "',CAST( '" +
      req.file.buffer.toString('base64') +
      "'  AS VARBINARY(MAX)) ,'" +
      req.body.OrganizatorName +
      "','" +
      req.body.Aciklamaİki +
      "','" +
      req.body.Facebook +
      "','" +
      req.body.twitter +
      "','" +
      req.body.İnstagram +
      "','" +
      req.body.biletadi +
      "','" +
      req.body.ucret +
      "','" +
      req.body.adetsayisi +
      "','" +
      req.body.gender +
      "','" +
      req.body.Tip +
      "','" +
      req.body.Konu +
      "',(select Id from tbl_Uye where KullanıcıAdi='" + req.session.ad + "'))",
      function (err, data) {
        if (err) {
          console.log(err);
        }
        sql.close();
        res.render('etkinlikolustur');
      }
    );
  });
};
// OTURUM AÇ
module.exports.UyeOl = function (req, res) {
  res.render('oturumac', { hata: '' });
}
module.exports.Giris = function (req, res) {

  res.render('Login', { hata: '' });

}

module.exports.userOturumAc = function (req, res) {
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("select  dbo.fn_kullanicikontrol('" + req.body.kullanici_Adi + "') as varmi", function (err, control) {
      if (err) {
        console.log(err);
      }
      control.recordset.forEach(function (kullanici) {
        if (kullanici.varmi == "Evet") {
          res.render('oturumac', { hata: 'Kullanıcı adı bulunmaktadır ' });
          sql.close();
        }
        else {
          request1.query("INSERT INTO tbl_Uye(KullanıcıAdi,Adi,Soyadi,Email,Sifre)  VALUES('" + req.body.kullanici_Adi + "','" + req.body.uye_Adi + "','" + req.body.uye_Soyadi + "','" + req.body.uye_EMail + "','" + req.body.uye_Sifre + "')", function (err, data) {
            if (err) {
              console.log(err);
            }
            res.render('Login', { hata: '' });
            sql.close();
          });
        }
      })

    })
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
        if (kullanici.Sonuc == "Evet") {


          request1.query("select * from tbl_Uye where KullanıcıAdi='" + req.body.ad + "'", function (err, data) {
            req.session.ad = req.body.ad;
            if (err) {
              console.log(err);
            }

            sql.close();
            res.render('KullaniciGiris', { veri: data.recordset });

          });

        }
        else {
          res.render('Login', { hata: 'Kullanıcı adı veya sifre hatalı' });
          sql.close();
        }
      });
    });
  });
}

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


module.exports.userEtkinlikBilgileri = function (req, res) {
  // sql.close(); // ETKİNLİK BİLGİLERİ
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query('select * from tbl_EtkinlikOlustur where id = ' + req.params.id, function (err, data) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('EtkinlikBilgileri', { veri: data.recordset });
    });
  });
};
module.exports.userprofil = function (req, res) {
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query('select * from tbl_EtkinlikOlustur,tbl_Uye where tbl_EtkinlikOlustur.EtkinlikId=tbl_Uye.Id', function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('profil', { veri: verisonucu.recordset });
    })
  });
};
module.exports.userKonusmaciBilgileri = function (req, res) {
  // sql.close(); // KONUŞMACI BİLGİLERİ
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query('select * from tbl_EtkinlikOlustur where id = ' + req.params.id, function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('konusmacibilgileri', { veri: verisonucu.recordset });
    });
  });
};

module.exports.sil = function (req, res) {
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    // console.log(req.body);
    console.log(req.body.delete);
    request1.query("delete from tbl_EtkinlikOlustur where id= " + req.body.delete, function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.redirect('/EtkinlikYonet');
    });
  });
}

module.exports.userYonet = function (req, res) {
  // sql.close();
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query('select * from tbl_EtkinlikOlustur where EtkinlikId =' + req.params.Id, function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('EtkinlikYonet', { data: verisonucu.recordset });
    });
  });
};
module.exports.userYonet2 = function (req, res) {
  // sql.close();
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query('select * from tbl_EtkinlikOlustur ', function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('EtkinlikYonet', { data: verisonucu.recordset });
    });
  });
};

module.exports.kitap = function (req, res) {
  // Sanat kategorisi
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("select * from tbl_EtkinlikOlustur where EtkinlikTipi = 'Kitap' ", function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('kitap', { veri: verisonucu.recordset });
    });
  });
};

module.exports.muzik = function (req, res) {
  // Müzik kategorisi
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("select * from tbl_EtkinlikOlustur where EtkinlikTipi = 'Müzik' ", function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('muzik', { veri: verisonucu.recordset });
    });
  });
};

module.exports.sinema = function (req, res) {
  // Sinema kategorisi
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("select * from tbl_EtkinlikOlustur where EtkinlikTipi = 'Sinema' ", function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('sinema', { veri: verisonucu.recordset });
    });
  });
};

module.exports.sanat = function (req, res) {
  // Sanat kategorisi
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("select * from tbl_EtkinlikOlustur where EtkinlikTipi = 'Sanat' ", function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('sanat', { veri: verisonucu.recordset });
    });
  });
};

module.exports.meeting = function (req, res) {
  // Meeting kategorisi
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("select * from tbl_EtkinlikOlustur where EtkinlikTipi = 'Meeting' ", function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('Meeting', { veri: verisonucu.recordset });
    });
  });
};
module.exports.fuar = function (req, res) {
  // Fuar kategorisi
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("select * from tbl_EtkinlikOlustur where EtkinlikTipi = 'Fuar' ", function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('fuar', { veri: verisonucu.recordset });
    });
  });
};

module.exports.spor = function (req, res) {
  // Spor kategorisi
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("select * from tbl_EtkinlikOlustur where EtkinlikTipi = 'Spor' ", function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('spor', { veri: verisonucu.recordset });
    });
  });
};

module.exports.fuar = function (req, res) {
  // Fotoğrafçılık kategorisi
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("select * from tbl_EtkinlikOlustur where EtkinlikTipi = 'Fotoğrafçılık' ", function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('fotografcilik', { veri: verisonucu.recordset });
    });
  });
};
module.exports.fuar = function (req, res) {
  // Müze kategorisi
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("select * from tbl_EtkinlikOlustur where EtkinlikTipi = 'Müze' ", function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('muze', { veri: verisonucu.recordset });
    });
  });
};
module.exports.Onizleme = function (req, res) {
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query('select * from tbl_EtkinlikOlustur', function (err, verisonucu) {
      if (err) {
        console.log(err)
      }
      sql.close();
      res.render('onizleme', { data: verisonucu.recordset })
    });
  });
}
module.exports.userGirisPanel = function (req, res) {
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query("select dbo.fn_AdminVarmi('" + req.body.userid + "','" + req.body.pswrd + "') as Sonuc", function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      verisonucu.recordset.forEach(function (kullanici) {
        if (kullanici.Sonuc == "Evet") {

          request1.query("select * from tbl_admin where kullaniciadi='" + req.body.userid + "'", function (err, data) {
            if (err) {
              console.log(err);
            }

            sql.close();
            res.render('adminpanel', { data: data.recordset });

          });

        }
        else {
          res.render('adminpanellogin', { hata: 'Kullanıcı adı veya sifre hatalı' });
          sql.close();
        }
      });
    });
  });
}
module.exports.userPanel = function (req, res) {
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.query('select * from tbl_Uye', function (err, verisonucu) {
      if (err) {
        console.log(err)
      }
      sql.close();
      res.render('adminpanel', { veri: verisonucu.recordset })
    });
  });
}



module.exports.istatistik = function (req, res) {
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    // console.log(req.body);

    request1.query('select COUNT(DISTINCT id) as ToplamEtkinlik,COUNT(DISTINCT Id) as ToplamUye from tbl_Uye,tbl_EtkinlikOlustur;', function (
      err,
      verisonucu
    ) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('istatistikler', { veri: verisonucu.recordset });
    });
  });
};
module.exports.etkinlikPanel = function (req, res) {
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    console.log(req.body.delete);
    request1.query('select * from tbl_EtkinlikOlustur', function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.render('etkinliklistele', { veri: verisonucu.recordset });
    });
  });
};
module.exports.etkinlikSil = function (req, res) {
  // Etkinlik Silme Admin Paneli
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    // console.log(req.body);
    console.log(req.body.delete);
    request1.query('delete from  tbl_EtkinlikOlustur where id= ' + req.body.delete, function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.redirect('/adminpanel/etkinliklistele');
    });
  });
};
module.exports.SİL = function (req, res) {
  // Üye Silme Admin Paneli
  sql.connect(webconfig, function (err) {
    if (err) console.log(err);
    var request1 = new sql.Request();
    // console.log(req.body);
    console.log(req.body.delete);
    request1.query('delete from  tbl_Uye where Id= ' + req.body.delete, function (err, verisonucu) {
      if (err) {
        console.log(err);
      }
      sql.close();
      res.redirect('adminpanel');
    });
  });
};