const fs = require("fs");
const cheerio = require("cheerio");
const axios = require("axios");

const getData = async () => {
	try {
		const data = fs.readFileSync("convertcsv.json", "utf8");
		const parsed = JSON.parse(data);
		// Promise.all(parsed.map((item) => {
		//     axios.get(`https://ijazah.kemdikbud.go.id/assets/js/prodi.php?kodept=${item.id}`).then((response) => {
		//         let $ = cheerio.load(response.data);
		//         $('select').find('option').each((i, e) => {
		//             fs.appendFileSync('hasil.txt', $(e).text()+'\n');
		//         })
		//     })
		//     console.log(item.id)
		// }))
		let add = ``;
		let option = ``;
		for (let index = 0; index < parsed.length; index++) {
			let univ = parsed[index];
			add = `('${univ.id}', '${univ.name}'), `;
			fs.appendFileSync("hasilUniv.txt", add + "\n");
			console.log({ univ });
			let hasil = await axios.get(
				`https://ijazah.kemdikbud.go.id/assets/js/prodi.php?kodept=${univ.id}`
			);
			// console.log({ hasil });
			let $ = cheerio.load(hasil.data);

			$("select")
				.find("option")
				.each((i, e) => {
					const xkey = $(e).val();
					const xval = $(e).text();
					if (xkey !== "") option = `('${univ.id}', '${xkey}', '${xval}'),`;
					fs.appendFileSync("hasil.txt", option + "\n");
				});
		}
		// console.log({ add });
		// console.log({ option });
		console.log("--DONE--");
	} catch (error) {
		console.log(error);
	}
};

getData();
