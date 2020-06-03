const fs = require("fs");
const cheerio = require("cheerio");
const axios = require("axios");

// const pt = fs.readFileSync('pt.json');
// console.log(JSON.parse(pt))

// fs.readFile('data_pt.json', 'utf8', (err, content) => {
//     if(err) {
//         console.error(err)
//     } else {
//         console.log(typeof(JSON.parse(content)))
//     }
// })

// const data = [
//   {
//     "id": "071013",
//     "name": "Universitas Yos Sudarso - 071013"
//   },
//   {
//     "id": "071069",
//     "name": "Universitas Yudharta Pasuruan - 071069"
//   }
// ]

// const parsed = JSON.parse(data)
// console.log(typeof(parsed))
// const stringParsed = JSON.stringify(data)
// const parsed = JSON.parse(stringParsed)

async function getData() {
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

		for (let index = 0; index < parsed.length; index++) {
			let univ = parsed[index];
			console.log(univ.name);
			let hasil = await axios.get(
				`https://ijazah.kemdikbud.go.id/assets/js/prodi.php?kodept=${univ.id}`
			);
			console.log({ hasil });
			// let $ = cheerio.load(response.data);
			// $("select")
			// 	.find("option")
			// 	.each((i, e) => {
			//         // fs.appendFileSync("hasil.txt", $(e).text() + "\n");

			// 	});
		}
	} catch (error) {
		console.log(error);
	}
}

getData();
