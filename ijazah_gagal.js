const fs = require("fs");
const cheerio = require("cheerio");
const axios = require("axios");

async function getData() {
	try {
		let hasil = await axios.get(`https://ijazah.kemdikbud.go.id`, {
			kode_pt: "Universitas Dian Nuswantoro - 061031",
			kodept: "061031",
			kode_prodi: "55201",
			no_ijazah: "019041",
			angka: "4",
		});
		// console.log({ hasil });
		let $ = cheerio.load(hasil.data);
		// let bodyBefore = $("body").html();
		// console.log($("form").html());
		let angka = $("#angka").attr("placeholder");
		// // console.log({ angka });

		angka = angka.replace("Angka Pengaman :", "");
		angka = angka.replace("=", "");
		let arr = angka.split("+");
		let total = arr.reduce((total, num) => parseInt(total) + parseInt(num));
		// console.log({ angka, total });
		// $("#kode_pt").val("Universitas Dian Nuswantoro - 061031");
		// $("#kodept").val("061031");
		// // $("#kode_prodi").val(55201);
		// $("#no_ijazah").val("019041");
		// $("#angka").val(total);
		// $("#kode_prodi")
		// 	.find("option")
		// 	.attr("selected", "selected")
		// 	.attr("value", "55201");

		// // let bodyAfter = $("body").html();
		// console.log($("form").html());

		console.log($("body").html());
		let hasil2 = await axios({
			method: "POST",
			headers: hasil.headers,
			url: `https://ijazah.kemdikbud.go.id`,
			responseType: "blob",
			data: {
				kode_pt: "Universitas Dian Nuswantoro - 061031",
				kodept: "061031",
				kode_prodi: "55201",
				no_ijazah: "019041",
				angka: total,
			},
		});
		console.log({ hasil2 });
		// let $2 = cheerio.load(hasil.data);
	} catch (error) {
		console.log(error);
	}
}

getData();
