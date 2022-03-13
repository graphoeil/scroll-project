// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
// offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');
// Click navToggle
navToggle.addEventListener('click', (e) => {
	e.currentTarget.classList.toggle('nav-open');
	// Calculate the height of linksContainer
	/* Nous calculons sur ul.links car linksContainer height = 0 */
	const containerHeight = linksContainer.getBoundingClientRect().height;
	const linksHeight = links.getBoundingClientRect().height;
	if (containerHeight === 0){
		linksContainer.style.height = linksHeight + 'px';
	} else {
		linksContainer.style.height = '0px';
	}
});
/* !!!! Pour les écrans plus grands, il faut penser à refixer la
hauteur du linksContainer sur auto :
.links-container {
	height: auto !important;
} !!!!!
Dès lors nous n'avons plus a supprimer la balise style
en écoutant l'event resize ,-) */

// ********** fixed navbar ************
const navbar = document.getElementById('nav');
// Bouton pour remonter tout en haut
const topLink = document.querySelector('.top-link');
window.addEventListener('scroll', () => {
	const scrollHeight = window.pageYOffset;
	const navHeight = navbar.getBoundingClientRect().height;
	// Navbar fixed
	if (scrollHeight > navHeight){
		navbar.classList.add('fixed-nav');
	} else {
		navbar.classList.remove('fixed-nav');
	}
	// Show top link btn
	if (scrollHeight > 500){
		topLink.classList.add('show-link');
	} else {
		topLink.classList.remove('show-link');
	}
});
// Equivalent trigger('scroll');
window.dispatchEvent(new Event('scroll'));

// ********** smooth scroll ************
/* Dans le css au début :
html{
	scroll-behavior: smooth;
} */
// select links
const scrollLinks = document.querySelectorAll('.scroll-link');
scrollLinks.forEach((link) => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		const id = e.currentTarget.getAttribute('href').slice(1);
		// Section cible du lien
		const element = document.getElementById(id);
		// height of the navbar and linksContainer
		const navHeight = navbar.getBoundingClientRect().height;
		const containerHeight = linksContainer.getBoundingClientRect().height;
		// Navbar fixe ? si oui elle n'est plus incluse dans la hauteur globale du document ,-)
		const fixedNav = navbar.classList.contains('fixed-nav');
		// Destination scroll
		let destination = element.offsetTop - navHeight;
		if (!fixedNav){
			// Navbar static position
			/* Au moment du scroll la navbar va passer en position fixed
			et ne sera donc plus prise en compte dans la hauteur globale, 
			il faut donc la soustraire de nouveau.
			!!!! Le header aurait du être en position fixed à l'init,
			plutôt que de la rajouter après ... voir les pingouins :
			http://www.graphoeilmultimedia.com/etudesDeSites/voyage/ */
			destination = destination - navHeight;
		}
		// Version mobile il faut recalculer ... commentaire idem
		// si le header avait été en fixe dès le début !!!!
		if (navHeight > 82){
			// le menu mobile est ouvert, nous ajoutons la hauteur
			// des liens à la destination
			destination = destination + containerHeight;
		}
		// Scroll
		window.scrollTo({
			left:0,
			top:destination
		});
		// Close menu mobile
		navToggle.classList.remove('nav-open');
		linksContainer.style.height = '0px';
	});
});