const resetRouter = require('express').Router()
const bcrypt = require('bcrypt')
const fs = require('fs')

const CommentsModel = require('../models/commentsModel')
const UsersModel = require('../models/usersModel')
const NewsModel = require('../models/newsModel')
const AdsModel = require('../models/adsModel')

const Comments = new CommentsModel()
const Users = new UsersModel()
const News = new NewsModel()
const Ads = new AdsModel()

const auth = require('../middlewares/authMiddleware')

resetRouter.post('/', auth, async (request, response) => {

	const ads = [
		{
			picture: '/assets/img/photo4.jpg',
			href: 'http://www.google.com'
		},
		{
			picture: '/assets/img/photo5.jpg',
			href: 'http://www.bing.com'
		},
		{
			picture: '/assets/img/photo10.jpg',
			href: 'http://www.duckduckgo.com'
		}
	]

	const news = [
		{
			category: 1,
			likes: 128,
			headline: 'Summer Comes Early to Helsinki',
			content: '{"type":"picture", "picture":"/assets/img/photo1.jpg", "caption":"Lorem Ipsum Captionismus Maximus. Illustration from unsplash.com"}\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
		},
		{
			category: 2,
			likes: 256,
			headline: 'Hamburger Eating Championships',
			content: '{"type":"picture", "picture":"/assets/img/photo3.jpg", "caption":"Lorem Ipsum Captionismus Maximus. Illustration from unsplash.com"}\n\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'
		},
		{
			category: 2,
			likes: 384,
			headline: 'Travel Restrictions Tighten',
			content: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
		},
		{
			category: 2,
			likes: 512,
			headline: 'Interview With Loremius Ipsumius',
			content: `Nullam interdum mi et est rutrum, non vulputate orci convallis. Sed augue nisl, commodo nec fringilla sed, auctor sit amet justo. Suspendisse vel consectetur quam. Sed sem massa, pulvinar at eros et, pretium tempus odio. Mauris dapibus fringilla nunc id finibus. Vivamus eget volutpat eros, vel iaculis ex. Duis vel pulvinar leo. Nulla cursus tellus a tempor blandit. Aenean eget tincidunt lorem. Donec blandit massa ipsum, quis tristique risus aliquam accumsan. In hac habitasse platea dictumst. Nam ac libero nisi. Sed luctus congue risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec a nisl ut ligula ultricies malesuada.\n\n{"type":"quote","quote":"Nullam interdum mi et est rutrum, non vulputate orci convallis. Sed augue nisl, commodo nec fringilla sed, auctor sit amet justo.","author":"Loremus Ipsumius"}\n\nMauris eu purus tincidunt tortor cursus feugiat at eget ex. Vivamus pellentesque quam eget ultrices lacinia. Cras in dictum enim. Nam tellus orci, faucibus id molestie non, tempor eu elit. In magna nunc, feugiat et accumsan non, semper ac ex. Praesent accumsan tempor placerat. Pellentesque convallis condimentum massa ac aliquam. Duis ut fermentum dui. Cras fermentum urna diam, in dictum diam posuere in. Donec dictum, quam ac aliquet fermentum, ligula mi aliquam sapien, eget tincidunt neque purus in tortor. Donec pharetra egestas arcu, non dignissim sem iaculis quis. Sed elementum metus ac augue gravida ultricies. Cras pretium turpis ut dapibus iaculis. Donec ac augue quis nisi blandit tempus. Aenean lobortis lacus in mattis aliquet. Sed mattis vel neque ac ullamcorper.\n\nSed feugiat dapibus tempor. Maecenas id magna ornare, euismod risus non, imperdiet justo. Nam id varius tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent quis augue et erat ornare pretium nec ut sem. Duis tristique mauris orci, et imperdiet ipsum pretium ac. Nulla ut interdum risus, eget laoreet lacus. Donec et consequat enim. Morbi tempus eu velit nec pellentesque. Nulla eu sodales mi. In fermentum facilisis finibus.`
		},
		{
			category: 1,
			likes: 640,
			headline: 'Alcohol Consumption in Decline',
			content: '{"type":"picture", "picture":"/assets/img/photo2.jpg", "caption":"Lorem Ipsum Captionismus Maximus. Illustration from unsplash.com"}\n\nInteger tincidunt vitae sem vitae efficitur. Aliquam erat volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris dapibus lectus est, vulputate blandit justo elementum cursus. Maecenas ligula sem, malesuada nec gravida nec, dictum id risus. Integer eros massa, hendrerit sed luctus eget, sagittis sagittis leo. Phasellus aliquam tellus sit amet dui gravida ultricies et non ex. Quisque varius at mi sit amet rutrum. Fusce ultricies erat augue, eu lobortis odio viverra sit amet. Mauris maximus pulvinar lorem eu ullamcorper.\n\nMaecenas consequat lectus viverra, ullamcorper ligula vel, placerat leo. Duis at tempor tellus. Pellentesque euismod orci vitae lectus porttitor mattis. Pellentesque vel sem non nisl iaculis mollis. Curabitur dapibus dolor purus, at placerat lectus lacinia et. Morbi eget feugiat ex, quis blandit risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque non efficitur massa. Donec faucibus pharetra enim, at rutrum nisl rutrum non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
		},
		{
			category: 3,
			likes: 768,
			headline: 'Cryptocurrencies Skyrocket',
			content: '{"type":"picture", "picture":"/assets/img/photo6.jpg", "caption":"Lorem Ipsum Captionismus Maximus. Illustration from unsplash.com"}\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fermentum nisi at blandit auctor. Mauris vehicula nunc nibh, vel pretium quam efficitur sed. Praesent metus ante, congue vel dapibus vel, varius congue justo. Vestibulum dolor eros, luctus non maximus nec, egestas nec quam. Vestibulum quis posuere orci. Fusce convallis lacus eget tincidunt pretium. Cras blandit porta suscipit. Nulla eget varius enim. Nulla ullamcorper vestibulum magna. Integer facilisis ante a magna gravida lacinia. Vivamus in justo at augue mollis consequat. Nunc in eros lorem. Aenean ornare viverra ipsum, et auctor dolor interdum convallis.\n\nFusce consectetur dolor nec libero viverra, vitae pellentesque ex dictum. Fusce tincidunt aliquam leo, eu lacinia erat faucibus sit amet. Maecenas at euismod nulla. Nullam quis egestas dolor. Donec sed hendrerit felis, ut rutrum sem. Vivamus non nisi id sapien tincidunt consectetur. Pellentesque eros mi, sollicitudin in enim in, pretium mattis lorem. Cras rhoncus elementum condimentum. Aenean et urna non massa molestie lobortis sit amet at diam. In sed commodo erat, eu mattis erat. Aliquam nec augue elit.\n\nDuis a ex eget orci sagittis egestas. Aenean varius dictum pretium. Vestibulum ac dui placerat, tincidunt augue quis, auctor libero. Praesent non laoreet libero, id euismod erat. Suspendisse dapibus, elit suscipit molestie commodo, metus purus lobortis tellus, at semper velit dui feugiat tortor. Nullam suscipit elit in dignissim commodo. Etiam nunc odio, iaculis id est vitae, finibus gravida nisl. Pellentesque quis tellus libero. Aliquam rhoncus semper neque at congue.'
		},
		{
			category: 2,
			likes: 896,
			headline: 'Youtube Rewind 2019',
			content: '{"type":"picture", "picture":"/assets/img/photo9.jpg", "caption":"Lorem Ipsum Captionismus Maximus. Illustration from unsplash.com"}\n\nAliquam venenatis erat a aliquam viverra. Maecenas ipsum lorem, elementum id auctor nec, porta quis lorem. Nulla eu consectetur orci, eu placerat velit. Quisque mi tortor, mattis eget bibendum ac, elementum eget leo. Aliquam nec porttitor metus. Aenean malesuada vitae est vel tristique. Proin sed lacus quis erat tincidunt dignissim. Cras at dignissim ante.\n\nQuisque placerat dui quis lectus vulputate, ac hendrerit mi efficitur. Nam ultricies a augue non ullamcorper. Curabitur vel massa nec lorem congue commodo. Mauris aliquet bibendum nibh ut semper. Praesent nec luctus tortor. Phasellus tincidunt magna nibh, id blandit tellus volutpat sit amet. Integer eget arcu sed elit dictum euismod. Quisque urna justo, vestibulum pulvinar lorem sit amet, fringilla gravida tortor. Aliquam libero metus, congue et nibh a, bibendum vulputate orci. Praesent a lorem vel sapien maximus sollicitudin ac ac massa. Vivamus ultrices hendrerit velit, vel consectetur enim euismod at. Cras blandit, ligula eget congue suscipit, nisi mauris tincidunt leo, eu ultrices massa ante faucibus metus. Maecenas tempor suscipit quam, ut blandit nulla rhoncus eu. Mauris scelerisque tincidunt lectus.\n\n{"type":"video", "id":"2lAe1cqCOXo", "caption":"Youtube Rewind 2019"}\n\nMorbi est tellus, imperdiet ac congue sed, bibendum vitae mauris. Aliquam sed dictum elit. Proin quis lectus id mauris fringilla feugiat. Donec ac nibh ut magna sagittis dapibus. Nunc eget elit sed est scelerisque venenatis. Morbi dignissim dolor non aliquam placerat. Cras feugiat, magna a tincidunt malesuada, augue ligula vestibulum enim, at molestie risus turpis sed erat. Mauris hendrerit nunc dapibus tristique dictum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut condimentum, neque sit amet vulputate interdum, tortor ante ultrices ligula, a vulputate metus nulla eget odio. Nam eget lobortis nisi.'
		}
	]

	const adminUser = {
		email: 'admin@localhost.com',
		username: 'administrator',
		avatar: '/assets/avatar/default.jpg',
		password: await bcrypt.hash(process.env.BACKEND_PASSWORD, 10),
		type: 'admin'
	}

	if (request.auth.type === 'admin') {
		try {
			await Comments.deleteAll()
			await News.deleteAll()
			await Users.deleteAll()
			const admin = await Users.addUser(adminUser)
			await Promise.all(
				news.map((item) =>
					News.addStory({ ...item, userId: admin.id })
				)
			)

			await Ads.deleteAll()
			await Promise.all(
				ads.map((item) =>
					Ads.addAd(item)
				)
			)

			const files = fs.readdirSync('public/assets/img')
			files
				.filter((item) => !RegExp('[a-zA-Z0-9].jpg').test(item))
				.map((item) => fs.unlinkSync(`public/assets/img/${item}`))

			response.status(204).end()
		} catch (error) {
			console.log(error)
			response.status(500).send('Internal server error.')
		}
	} else {
		response.status(401).send('Unauthorized.')
	}

})

module.exports = resetRouter
