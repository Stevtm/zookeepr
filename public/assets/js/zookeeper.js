const $displayArea = document.querySelector("#display-area");
const $zookeeperForm = document.querySelector("#zookeeper-form");

const printResults = (resultArr) => {
	console.log(resultArr);

	const animalHTML = resultArr.map(({ id, name, age, favouriteAnimal }) => {
		return `
  <div class="col-12 col-md-5 mb-3">
    <div class="card p-3" data-id=${id}>
      <h4 class="text-primary">${name}</h4>
      <p>Age: ${age}<br/>
      Favorite Animal: ${
				favouriteAnimal.substring(0, 1).toUpperCase() +
				favouriteAnimal.substring(1)
			}<br/>
      </p>
    </div>
  </div>
    `;
	});

	$displayArea.innerHTML = animalHTML.join("");
};

const getZookeepers = (formData = {}) => {
	let queryUrl = "/api/zookeepers?";

	Object.entries(formData).forEach(([key, value]) => {
		queryUrl += `${key}=${value}&`;
	});

	fetch(queryUrl)
		.then((response) => {
			if (!response.ok) {
				return alert("Error: " + response.statusText);
			}
			return response.json();
		})
		.then((zookeeperArr) => {
			console.log(zookeeperArr);
			printResults(zookeeperArr);
		});
};

const handleGetZookeeperSubmit = (event) => {
	event.preventDefault();
	const nameHTML = $zookeeperForm.querySelector("[name='name']");
	const name = nameHTML.value;

	const ageHTML = $zookeeperForm.querySelector("[name='age']");
	const age = ageHTML.value;

	const zookeeperObj = { name, age };

	getZookeepers(zookeeperObj);
};

$zookeeperForm.addEventListener("submit", handleGetZookeeperSubmit);
getZookeepers();
