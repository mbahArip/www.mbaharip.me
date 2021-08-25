var DEBUG = true;
if (!DEBUG) {
	if (!window.console) window.console = {};
	var methods = ["log", "debug", "warn", "info"];
	for (var i = 0; i < methods.length; i++) {
		console[methods[i]] = function () {};
	}
}

class googleFirebase {
	constructor() {
		this.rtdb;
		this.db;
	}

	init() {
		const config = {
			apiKey: "AIzaSyCfexH7d6elfFToEc7t9Ue2iXJKgNRcjlY",
			authDomain: "mbah-arip.firebaseapp.com",
			databaseURL: "https://mbah-arip-default-rtdb.asia-southeast1.firebasedatabase.app",
			projectId: "mbah-arip",
			storageBucket: "mbah-arip.appspot.com",
			messagingSenderId: "871318298866",
			appId: "1:871318298866:web:0430a508e009de7146b06b",
			measurementId: "G-X3HPKCV1Q0"
		}
		firebase.initializeApp(config);

		const appCheck = firebase.appCheck();
		appCheck.activate('6Lc4SyobAAAAAHy5OhiKBS37vbWN-ES4rAM5gDgp', true)

		this.rtdb = firebase.database();
	}

	getWorks() {
		firebase.database().ref('portofolio')
			.orderByChild('id')
			.limitToLast(10)
			.get()
			.then(snapshot => {
				let items = Object.values(snapshot.val());
				let sort = items.sort((a, b) => {
					return b.id - a.id;
				})
				for (let i = 0; i < sort.length; i++) {
					this.addWorks(sort[i]);
					// console.log(sort[i]);
				}
			})
	}
	addWorks(itemsList) {
		let category;
		switch (itemsList['category']) {
			case '3d':
				category = '3D Works'
				break;
			case 'livery':
				category = 'Livery Design'
				break;
			case '2d':
				category = '2D Graphics'
				break;
			case 'web':
				category = 'Website'
				break;
		}

		let date;
		const monthNames = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];
		let unix = new Date(itemsList['date'] * 1000);
		let dDate = unix.getDate();
		let dMonth = monthNames[unix.getMonth()];
		let dYear = unix.getFullYear();
		date = `${dDate} ${dMonth} ${dYear}`;

		let post = document.createElement('a');
		post.href = `/works/details?id=${itemsList['id']}`;
		post.className = 'posts';
		// post.innerHTML =
		// 	`
		// 	<img src="https://files.mbaharip.me/0:/posts/[${itemsList[`id`]}] ${itemsList['title']}/${itemsList['thumb']}" alt="" class="thumb" onerror="_main.imageLoadError(this)">
		// 	<div class="info">
		// 		<span class="title">${itemsList['title']}</span>
		// 		<span class="desc">${itemsList['description']}</span>
		// 		<div class="details">
		// 			<span class="category">${category}</span>
		// 			<span class="date">${date}</span>
		// 		</div>
		// 	</div>
		// 	`
		post.innerHTML =
			`
			<img src="https://files.mbaharip.me/0:/posts/[${itemsList[`id`]}] ${itemsList['title']}/${itemsList['thumb']}" alt="${itemsList['title']}" class="thumb">
			<div class="top">
				<span class="title">
					${itemsList['title']}
				</span>
				<span class="description">
					${itemsList['description']}
				</span>
			</div>
			<div class="bottom">
				<span class="category">${category}</span>
				<span class="date">${date}</span>
			</div>
			`

		document.querySelector('section#gallery div.container').appendChild(post);
	}

	getGallery(query) {
		firebase.database().ref('resource')
			.orderByChild('id')
			.limitToLast(5)
			.get()
			.then(async snapshot => {
				let items = Object.values(snapshot.val());
				let sort = items.sort((a, b) => {
					return b.id - a.id;
				});
				let filter;
				if (query != undefined) {
					filter = sort.filter((item) => {
						return item.category == query;
					})
				} else {
					filter = sort;
				}
				if (filter.length == 0) {
					document.querySelector('div.container div.loading').classList = 'loading hide';
					await _utility.sleep(500);
					document.querySelector('div.container div.loading').style.display = 'none';
					document.querySelector('div.container div.no_content').style.display = 'flex';
					await _utility.sleep(10);
					document.querySelector('div.container div.no_content').classList = 'no_content';
				} else {
					document.querySelector('div.container div.loading').classList = 'loading hide';
					await _utility.sleep(500);
					document.querySelector('div.container div.loading').style.display = 'none';
					await _utility.sleep(10);
					for (let i = 0; i < filter.length; i++) {
						this.addGallery(filter[i]);
					}
				}
			})
	}
	async addGallery(itemsList) {
		let category;
		switch (itemsList['category']) {
			case '3d':
				category = '3D Works'
				break;
			case 'livery':
				category = 'Livery Design'
				break;
			case '2d':
				category = '2D Graphics'
				break;
			case 'web':
				category = 'Website'
				break;
		}

		let date;
		const monthNames = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];
		let unix = new Date(itemsList['date'] * 1000);
		let dDate = unix.getDate();
		let dMonth = monthNames[unix.getMonth()];
		let dYear = unix.getFullYear();
		date = `${dDate} ${dMonth} ${dYear}`;

		let post = document.createElement('a');
		post.href = `/works/details?id=${itemsList['id']}`;
		post.className = 'posts hide';
		post.innerHTML =
			`
			<img src="https://files.mbaharip.me/0:/posts/[${itemsList[`id`]}] ${itemsList['title']}/${itemsList['thumb']}" alt="${itemsList['title']}" class="thumb">
			<div class="top">
				<span class="title">
					${itemsList['titleRomaji']}
				</span>
				<span class="description">
					${itemsList['description']}
				</span>
			</div>
			<div class="bottom">
				<span class="category">${category}</span>
				<span class="date">${date}</span>
			</div>
			`

		document.querySelector('section#worksGallery div.container div.content').appendChild(post);
		await _utility.sleep(10);
		post.className = 'posts';
	}
	async pagination(query) {
		function postData(itemsList, category, date) {
			let post =
				`
				<img src="https://files.mbaharip.me/0:/posts/[${itemsList[`id`]}] ${itemsList['title']}/${itemsList['thumb']}" alt="${itemsList['title']}" class="thumb">
				<div class="top">
					<span class="title">
						${itemsList['title']}
					</span>
					<span class="description">
						${itemsList['description']}
					</span>
				</div>
				<div class="bottom">
					<span class="category">${category}</span>
					<span class="date">${date}</span>
				</div>
				`;
			return post;
		}
		let itemsPerPage = 5;
		let currentPage;

		let data = new Promise((resolve, reject) => {
			try {
				firebase.database().ref('portofolio')
					.orderByChild('id')
					.get()
					.then(snapshot => {
						let items = Object.values(snapshot.val());
						resolve(items);
					})
			} catch (error) {
				reject(error);
			}
		})

		//Element
		const contentWrapper = document.querySelector('section#worksGallery div.container div.content')
		const paginationWrapper = document.querySelector('section#worksGallery div.container div.pagination')

		//Get data
		let items = await data;
		let sortedItems = items.sort((a, b) => {
			return b.id - a.id;
		})
		let filteredItems;
		if (query != undefined) {
			filteredItems = sortedItems.filter((item) => {
				return item.category == query;
			});
		} else {
			filteredItems = sortedItems;
		}

		//Page query
		if (_utility.getParameter('page') == undefined || _utility.getParameter('page') == '') {
			currentPage = 1;
		} else {
			currentPage = _utility.getParameter('page');
		}

		function displayItems(items, wrapper, itemsPerPage, page) {
			wrapper.innerHTML = '';
			page--;

			let start = itemsPerPage * page;
			let end = start + itemsPerPage;
			let paginatedItems = items.slice(start, end);

			for (let i = 0; i < paginatedItems.length; i++) {
				let item = paginatedItems[i];

				let category;
				switch (item['category']) {
					case '3d':
						category = '3D Works'
						break;
					case 'livery':
						category = 'Livery Design'
						break;
					case '2d':
						category = '2D Graphics'
						break;
					case 'web':
						category = 'Website'
						break;
				}
				let date;
				const monthNames = ["January", "February", "March", "April", "May", "June",
					"July", "August", "September", "October", "November", "December"
				];
				let unix = new Date(item['date'] * 1000);
				let dDate = unix.getDate();
				let dMonth = monthNames[unix.getMonth()];
				let dYear = unix.getFullYear();
				date = `${dDate} ${dMonth} ${dYear}`;

				let itemElement = document.createElement('a');
				itemElement.href = `/works/details?id=${item['id']}`;
				itemElement.className = 'posts';
				itemElement.innerHTML = postData(item, category, date);

				wrapper.appendChild(itemElement);
			}
		}

		function paginationSetup(items, wrapper, itemsPerPage) {
			wrapper.innerHTML = '';

			let pageCount = Math.ceil(items.length / itemsPerPage);
			for (let i = 1; i < pageCount + 1; i++) {
				let btn = paginationBtn(i);
				wrapper.appendChild(btn);
			}
		}

		function paginationBtn(page) {
			let button = document.createElement('span');
			button.innerText = page;
			button.className = 'page';

			if (currentPage == page) button.className = 'page active';

			button.addEventListener('click', async () => {
				currentPage = page;
				document.querySelector('div.container div.content').className = 'content hide';
				await _utility.sleep(500);
				displayItems(filteredItems, contentWrapper, itemsPerPage, currentPage);
				paginationChangeURL(currentPage);
				document.querySelector('div.container div.content').className = 'content';


				let currentBtn = document.querySelector('span.page.active');
				currentBtn.className = 'page';

				button.className = 'page active';
			})

			return button;
		}

		function paginationChangeURL(page) {
			let newURL = new URL(window.location.href);
			let searchParameter = newURL.searchParams;
			searchParameter.set(`page`, page);

			newURL = newURL.toString();
			let newTitle = `${document.title} - Page ${page}`;
			let newState = {
				additionalInformation: `Page ${page}`
			};

			window.history.replaceState(newState, newTitle, newURL);
		}

		if (filteredItems.length == 0) {
			document.querySelector('div.container div.loading').classList = 'loading hide';
			await _utility.sleep(500);
			document.querySelector('div.container div.loading').style.display = 'none';
			document.querySelector('div.container div.no_content').style.display = 'flex';
			await _utility.sleep(10);
			document.querySelector('div.container div.no_content').classList = 'no_content';
		} else {
			document.querySelector('div.container div.loading').classList = 'loading hide';
			await _utility.sleep(500);
			document.querySelector('div.container div.loading').style.display = 'none';
			document.querySelector('div.container div.pagination').style.display = 'flex';
			await _utility.sleep(10);
			displayItems(filteredItems, contentWrapper, itemsPerPage, currentPage);
			paginationSetup(filteredItems, paginationWrapper, itemsPerPage);
			document.querySelector('div.container div.content').className = 'content';
			document.querySelector('div.container div.pagination').className = 'pagination';
		}
	}
}

class index {
	async changeImage(parent, index) {
		let big = document.querySelector(`#${parent} div.img__sample img.big`);
		let element = document.querySelectorAll(`#${parent} div.img__sample div.img_small img`);
		if (element[index].classList.contains('active')) {
			return;
		}

		for (let i = 0; i < element.length; i++) {
			element[i].className = 'small';
		}
		big.style.opacity = 0;
		element[index].classList.add('active');
		await _utility.sleep(250);
		big.style.opacity = 1
		big.src = element[index].src;
	}

	async showImageModal(element) {
		document.querySelector('div.modal_image img').src = element.src.split('.jpg')[0] + '-hi.jpg';
		document.querySelector('div.modal_image').style.display = 'flex';
		await _modal.showModal();
	}
}

class modal {
	async showModal() {
		let modalContainer = document.querySelector('section#modal');
		modalContainer.style.display = 'flex';
		await _utility.sleep(10);
		modalContainer.style.opacity = 1;
	}
	async closeModal() {
		let modalContainer = document.querySelector('section#modal');
		modalContainer.style.opacity = 0;
		await _utility.sleep(500);
		modalContainer.style.display = 'none';
	}
}

class Util {
	imageLoad() {
		let img = document.querySelectorAll('img');

		for (let i = 0; i < img.length; i++) {
			img[i].addEventListener('error', () => {
				let src = img[i].src;
				let url = new URL(src);
				if (!img[i].hasOwnProperty('retryCount')) img[i].retryCount = 0;

				if (img[i].retryCount < 5) {
					setTimeout(() => {
						url.searchParams.set('retry', img[i].retryCount + 1);
						img[i].src = url.toString;
						img[i].retryCount += 1;
					}, 1000);
				} else {
					img[i].src = '../assets/images/img-failed.png'
				}
			})
		}
	}

	footer() {
		let currentYear = new Date().getFullYear();
		document.querySelector('.footer').innerText = `${currentYear} - mbahArip`;
	}

	sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	getParameter(parameter) {
		let baseURL = window.location.origin;
		let parameterURL = window.location.search;
		let url = new URL(parameterURL, baseURL);

		let parameterValue = url.searchParams.get(parameter);
		return parameterValue;
	}
}