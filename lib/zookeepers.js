const fs = require("fs");
const path = require("path");

function filterByQuery(query, zookeepers) {
	let filteredResults = zookeepers;
	if (query.age) {
		filteredResults = filteredResults.filter(
			(zookeeper) => zookeeper.age === Number(query.age)
		);
	}
	if (query.favouriteAnimal) {
		filteredResults = filteredResults.filter(
			(zookeeper) => zookeeper.favouriteAnimal === query.favouriteAnimal
		);
	}
	if (query.name) {
		filteredResults = filteredResults.filter(
			(zookeeper) => zookeeper.name === query.name
		);
	}
	return filteredResults;
}

function findById(id, zookeepers) {
	const result = zookeepers.filter((zookeeper) => {
		return zookeeper.id === id;
	})[0];
	return result;
}

function createNewZookeeper(body, zookeepers) {
	const zookeeper = body;
	zookeepers.push(zookeeper);
	fs.writeFileSync(
		path.join(__dirname, "../data/zookeepers.json"),
		JSON.stringify({ zookeepers }, null, 2)
	);
	return zookeeper;
}

function validateZookeeper(zookeeper) {
	if (!zookeeper.name || typeof zookeeper.name !== "string") {
		return false;
	}
	if (!zookeeper.age || typeof zookeeper.age !== "number") {
		return false;
	}
	if (
		!zookeeper.favouriteAnimal ||
		typeof zookeeper.favouriteAnimal !== "string"
	) {
		return false;
	}
	return true;
}

module.exports = {
	filterByQuery,
	findById,
	createNewZookeeper,
	validateZookeeper,
};
