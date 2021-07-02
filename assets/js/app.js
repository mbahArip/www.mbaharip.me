//Index

//  Scroll
function navbarOnScroll() {
	let num = 500;

	const nav = document.querySelector('.navigation__menu');
	const menu = document.getElementsByClassName('menu__items');
	if (document.body.scrollTop > num || document.documentElement.scrollTop > num) {
		nav.classList.add('navigation__menuActive');
		menu[0].classList.remove('opacity__0');
		menu[0].style.visibility = 'visible';
	} else {
		nav.classList.remove('navigation__menuActive');
		menu[0].classList.add('opacity__0');
		menu[0].style.visibility = 'hidden';
	}
}
window.onscroll = function () {
	navbarOnScroll();
};

//Util
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// Firebase
const firebaseConfig = {
	apiKey: 'AIzaSyCfexH7d6elfFToEc7t9Ue2iXJKgNRcjlY',
	authDomain: 'mbah-arip.firebaseapp.com',
	databaseURL: 'https://mbah-arip-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: 'mbah-arip',
	storageBucket: 'mbah-arip.appspot.com',
	messagingSenderId: '871318298866',
	appId: '1:871318298866:web:0430a508e009de7146b06b',
	measurementId: 'G-X3HPKCV1Q0',
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const appCheck = firebase.appCheck();
appCheck.activate('6Lc4SyobAAAAAHy5OhiKBS37vbWN-ES4rAM5gDgp');

const rtdb = firebase.database();
function rtdb__readData(limit) {
	rtdb.ref('gallery')
		.limitToLast(limit)
		.get()
		.then(query => {
			if (query.exists()) {
				let postID = Object.keys(query.val());

				for (let i = 0; i < postID.length; i++) {
					let postData = query.val()[postID[i]];

					let post__grid = document.querySelector('div.post__grid');

					let grid__post = document.createElement('a');
					grid__post.href = `posts?id=${postID[i]}`;
					grid__post.classList.add('grid__post');

					//Post Thumb
					let post__thumb = document.createElement('div');
					post__thumb.classList.add('post__thumb');

					let thumb__image = document.createElement('img');
					thumb__image.src = postData['images']['thumb'];
					thumb__image.classList.add('thumb__image');

					let post__category = document.createElement('div');
					post__category.classList.add('post__category');

					let category__title = document.createElement('div');
					category__title.innerText = postData['category'];
					category__title.classList.add('category__title');

					//Post Details
					let post__details = document.createElement('div');
					post__details.classList.add('post__details');

					let details__title = document.createElement('span');
					details__title.classList.add('details__title');
					details__title.classList.add('style__w900');
					details__title.classList.add('font__shippori');
					details__title.innerText = postData['title'];

					let details__description = document.createElement('span');
					details__description.classList.add('details__description');
					details__description.innerText = postData['description'];

					let details__extra = document.createElement('div');
					details__extra.classList.add('details__extra');

					let extra__status = document.createElement('span');
					extra__status.classList.add('extra__status');

					let fa = document.createElement('i');
					fa.classList.add('fas');
					switch (postData['status']) {
						case 'pay':
							fa.classList.add('fa-dollar-sign');
							break;

						case 'download':
							fa.classList.add('fa-download');
							break;
					}
					fa.classList.add('color__whiteInactive');

					let extra__date = document.createElement('span');
					extra__date.classList.add('extra__date');
					extra__date.innerText = postData['date'];

					//Append element
					post__grid.appendChild(grid__post);
					grid__post.appendChild(post__thumb);
					grid__post.appendChild(post__details);
					post__thumb.appendChild(thumb__image);
					post__thumb.appendChild(post__category);
					post__category.appendChild(category__title);
					post__details.appendChild(details__title);
					post__details.appendChild(details__description);
					post__details.appendChild(details__extra);
					details__extra.appendChild(extra__status);
					details__extra.appendChild(extra__date);
					extra__status.appendChild(fa);
				}
			} else {
				console.warn('No data found');
			}
		})
		.catch(error => {
			console.error(error);
		});
}
