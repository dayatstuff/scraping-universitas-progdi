const puppeteer = require("puppeteer");

const getData = async () => {
	const browser = await puppeteer.launch();
	try {
		const page = await browser.newPage();
		await page.goto(`https://ijazah.kemdikbud.go.id`);

		let angka = await page.$eval("input#angka", (el) =>
			el.getAttribute("placeholder")
		);
		angka = angka.replace("Angka Pengaman :", "");
		angka = angka.replace(" ", "");
		angka = angka.replace(" =", "");
		let arr = angka.split(" + ");
		let total = arr.reduce((total, num) => parseInt(total) + parseInt(num));
		console.log({ angka, total });

		await page.type(
			"input[name='kode_pt']",
			"Universitas Dian Nuswantoro - 061031"
		);
		await page.$eval("form", (el) => (el.value = "061031"));
		await page.waitFor(4000);

		await page.select("select#kode_prodi", "55201");
		await page.type("input#no_ijazah", "019041");
		await page.type("input#angka", `${total}`);

		let pilihan = {};
		pilihan.prodi = await page.$eval(
			"select#kode_prodi",
			(el) => el.options[el.selectedIndex].value
		);
		pilihan.kodept = await page.$eval("input#kodept", (el) => el.value);
		pilihan.kode_pt = await page.$eval(
			"input[name='kode_pt']",
			(el) => el.value
		);
		pilihan.ijazah = await page.$eval("input#no_ijazah", (el) => el.value);
		pilihan.angka = await page.$eval("input#angka", (el) => el.value);

		console.log({ pilihan });
		await page.click(".submit-btn");
		await page.waitForSelector("#bidForm");
		let tanda = await page.$eval(".color-green", (el) => el.innerHTML);
		// const teks = tanda.substr(0, 14);
		console.log({ tanda });
		let hasil = await page.$$eval("input[name='no_ijazah']", (el) =>
			el.map((e) => e.value)
		);

		console.log({ hasil });
		return;
	} catch (error) {
		console.log(`Tidak ketemu datanya/ tidak berhasil verifikasi`);
	} finally {
		await browser.close();
	}
};
getData();
