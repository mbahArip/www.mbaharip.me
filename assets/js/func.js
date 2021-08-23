//New

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
		date = `${dDate}-${dMonth}-${dYear}`;

		let post = document.createElement('a');
		post.href = `/works/details?id=${itemsList['id']}`;
		post.className = 'gallery__items';
		post.target = "_blank";
		post.rel = "noopener noreferrer";
		post.innerHTML =
			`
			<img src="https://files.mbaharip.me/0:/posts/[${itemsList[`id`]}] ${itemsList['title']}/${itemsList['thumb']}" alt="" class="thumb" onerror="_main.imageLoadError(this)">
			<div class="info">
				<span class="title">${itemsList['title']}</span>
				<span class="desc">${itemsList['description']}</span>
				<div class="details">
					<span class="category">${category}</span>
					<span class="date">${date}</span>
				</div>
			</div>
			`

		document.querySelector('section#gallery div.container').appendChild(post);
	}
}

class main {
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
					img[i].src = 'assets/images/img-failed.png'
				}
			})
		}
	}

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
	autoChangeImage(parent) {
		let index = 0;
		setInterval(() => {
			if (index == 3) {
				index = 0;
			}
			this.changeImage(parent, index);
			index++;
		}, 7500)
	}

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
	async showImageModal(element) {
		document.querySelector('div.modal_image img').src = element.src.split('.jpg')[0] + '-hi.jpg';
		document.querySelector('div.modal_image').style.display = 'flex';
		await this.showModal();
	}
}

class Util {
	footer() {
		let currentYear = new Date().getFullYear();
		document.querySelector('.footer').innerText = `${currentYear} - mbahArip`;
	}

	sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}