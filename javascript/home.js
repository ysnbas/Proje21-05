

// const sehirler = document.getElementById("sehirler");
// const ilceler = document.getElementById("ilceler");

// function ilceleriListele(param) {
//   var httpistegi = new XMLHttpRequest();
//   var adres = "https://raw.githubusercontent.com/enisbt/turkey-cities/master/cities.json";
//   var myArr; // Store array here so that it is accessible in both functions
//   var list1 = document.querySelector("#sehirler");
//   var list2 = document.querySelector("#ilceler");

//   list1.onchange = function () {
//     // Empty second list first
//     list2.innerHTML = '';
//     myArr[this.value].counties.forEach(function (model) {
//       list2.innerHTML += '<option value="' + model + '">' + model + '</option>';
//     });
//   }

//   httpistegi.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       myArr = JSON.parse(this.responseText);
//       myArr.forEach(function (params, index) {
//         list1.innerHTML += '<option value="' + index + '">' + params.name + '</option>';
//       });
//       list1.onchange(); // Trigger once to populate list at first.
//     }
//   };
//   httpistegi.open("GET", adres, true);
//   httpistegi.send();
// }

// ilceleriListele();

