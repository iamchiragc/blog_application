const nav = document.getElementById("nav");
const navHeader = document.getElementById("heading");
const url = 'https://newsdata.io/api/1/news?apikey=pub_124521cf6b5ef974097cf399bfedca944300d&q=technology&country=in&language=en&category=technology';

let lists = document.getElementsByClassName("lists");

function showMenu() {
	if (nav.style.display == "none") {
		nav.style.display = "flex";
		navHeader.style.display = "none";
	} else {
		nav.style.display = "none";
		navHeader.style.display = "block";
	}
}

function logout(){
	console.log("hlloooooiamlogout,...")
	localStorage.removeItem("loginData");
	window.location.reload();
}

if (localStorage.getItem("loginData")) {
	let login = document.getElementById("loginLink");
	let register = document.getElementById("registerLink");
	login.innerHTML = `<a onclick="logout()" href="/">LOGOUT</a>`;
	register.style.display = "none";
} else {
	let login = document.getElementById("loginLink");
	let register = document.getElementById("registerLink");
	login.innerHTML = `<a href="./pages/login/login.html">LOGIN</a>`;
	register.innerHTML = `<a href="./pages/register/register.html">REGISTER</a>`;
}

try {
	let req = new Request(url);
	fetch(req)
		.then(function (response) {
			let data = response.json();
			data.then(
				getData => {
					let results = getData.results;
					let blogs = document.getElementById('blog');
					results.forEach(element => {
						if (element.image_url != null && element.link != null && element.title != null && element.description != null && element.pubDate != null) {
							blogs.innerHTML += `<div class="blogs">
													<div class="img">
														<img src=${element.image_url} alt="Image Not Available..">
													</div>
													<h3 id="title" class="titles"><a target="_blank" href=${element.link}>${element.title}</a></h3>
													<p id="discription" class="discs">${element.description}</p>
													<p id="date" class="dates">Published on : ${element.pubDate.split(' ')[0]}</p>
												</div>`;
						}
					});
				}
			);
		})
} catch (error) {
	document.getElementById("blog").innerHTML = "Blogs are not available."
}
