function rainbow(time, val, sat) {
	let r = 0;
	let g = 0;
	let b = 0;
	let t = time % 1;
	let s = Math.floor(time) % 6;
	switch (s) {
		case 0:
			r = 1;
			g = t;
			break;
		case 1:
			r = 1 - t;
			g = 1;
			break;
		case 2:
			g = 1;
			b = t;
			break;
		case 3:
			g = 1 - t;
			b = 1;
			break;
		case 4:
			b = 1;
			r = t;
			break;
		case 5:
			b = 1 - t;
			r = 1;
			break;
		default:
			throw new Error(`Wtf!! Why is there an invalid number?  [ ${s} ]`);
	}
	r = 1 - ((1 - r) * sat);
	g = 1 - ((1 - g) * sat);
	b = 1 - ((1 - b) * sat);
	r = r * val * 255;
	g = g * val * 255;
	b = b * val * 255;
	return "#" + pad(Math.round(r).toString(16), 2)
		+ pad(Math.round(g).toString(16), 2)
		+ pad(Math.round(b).toString(16), 2);
}

function pad(num, length) {
    while (num.length < length) {
        num = "0" + num;
    }
    return num;
}

const SCALE_COLOR = [
	function() {
		return "#FFFFFF"
	}, 
	function() {
		return "#0060FF"
	},
	function() {
		return "#FFD000"
	}, 
	function() {
		return "#FF0060"
	},
	function() {
		return "#20BF3A"
	}, 
	function() {
		return "#8636FF"
	},
	function() {
		return "#00C7F3"
	}, 
	function() {
		return "#FF8000"
	},
	function() {
		return "#E0E0E0"
	}, 
	function() {
		let r = 0;
		let g = 0;
		let b = 0;
		let t = (TIME / 5000) % 1;
		r = (Math.sin(t * Math.PI * 2) + 1) * 127
		g = r
		b = r
		return "#" + pad(Math.round(r).toString(16), 2)
		+ pad(Math.round(g).toString(16), 2)
		+ pad(Math.round(b).toString(16), 2);
	},
	function() {
		return rainbow(TIME / 4000, 1, 1)
	}, 
]

const SCALE_COLOR_DARK = [function() {
	return "#00000000"
}, 
function() {
	return "#00358b"
},
function() {
	return "#927700"
}, 
function() {
	return "#880034"
},
function() {
	return "#117421"
}, 
function() {
	return "#471d85"
},
function() {
	return "#006080"
}, 
function() {
	return "#804000"
},
function() {
	return "#707070"
}, 
function() {
	let r = 0;
	let g = 0;
	let b = 0;
	let t = (TIME / 5000) % 1;
	r = (Math.sin((t - 0.5) * Math.PI * 2) + 1) * 64
	g = r
	b = r
	return "#" + pad(Math.round(r).toString(16), 2)
	+ pad(Math.round(g).toString(16), 2)
	+ pad(Math.round(b).toString(16), 2);
},
function() {
	return rainbow(TIME / 4000, 0.5, 1)
}, 
]

const SCALE_COLOR_BRIGHT = [function() {
	return "#FFFFFF"
}, 
function() {
	return "#90c5ff"
},
function() {
	return "#fff4a0"
}, 
function() {
	return "#ff8ebc"
},
function() {
	return "#80f090"
}, 
function() {
	return "#c198ff"
},
function() {
	return "#a7efff"
}, 
function() {
	return "#804000"
},
function() {
	return "#707070"
}, 
function() {
	let r = 0;
	let g = 0;
	let b = 0;
	let t = (TIME / 5000) % 1;
	r = (Math.sin(t * Math.PI * 2) + 1) * 63 + 64
	g = r
	b = r
	return "#" + pad(Math.round(r).toString(16), 2)
	+ pad(Math.round(g).toString(16), 2)
	+ pad(Math.round(b).toString(16), 2);
},
function() {
	return rainbow(TIME / 4000, 1, 0.5)
}, 
]

// const SCALE_COLOR_DARK = ["#00000000", "#00358b", "#927700", "#880034", "#117421", "#471d85", "#006080"]
// const SCALE_COLOR_BRIGHT = ["#FFFFFF", "#90c5ff", "#fff4a0", "#ff8ebc", "#80f090", "#c198ff", "#a7efff"]
const SCALE_TEXT_SHADOW = [1, 1, 1.25, 1.5, 1.8, 2, 2, 2, 2, 2, 2]
const SCALING_STARTS = {
	scaled: { // polynomial
		rank: new ExpantaNum(50),
		rankCheap: new ExpantaNum(10),
		tier: new ExpantaNum(8),
		rf: new ExpantaNum(35),
		fn: new ExpantaNum(6),
		bf: new ExpantaNum(15),
		efn: new ExpantaNum(20),
		pathogenUpg: new ExpantaNum(10),
		darkCore: new ExpantaNum(15),
		endorsements: new ExpantaNum(5),
		enlightenments: new ExpantaNum(6),
		spectralGems: new ExpantaNum(5),
		dervBoost: new ExpantaNum(6),
		photons: new ExpantaNum(15),
			magma: new ExpantaNum(100),
			rmagma: new ExpantaNum(25),
			rocketupg: new ExpantaNum(22),
	},
	superscaled: { // polynomial
		rank: new ExpantaNum(100),
		rankCheap: new ExpantaNum(20),
		tier: new ExpantaNum(12),
		rf: new ExpantaNum(75),
		fn: new ExpantaNum(15),
			bf: new ExpantaNum(35),
		efn: new ExpantaNum(60),
		pathogenUpg: new ExpantaNum(40),
		darkCore: new ExpantaNum(20),
		endorsements: new ExpantaNum(50),
		enlightenments: new ExpantaNum(20),
		spectralGems: new ExpantaNum(8),
		dervBoost: new ExpantaNum(14),
			photons: new ExpantaNum(60),
	},
	hyper: { // exponential
		rank: new ExpantaNum(160),
		rankCheap: new ExpantaNum(35),
		tier: new ExpantaNum(16),
		rf: new ExpantaNum(120),
			bf: new ExpantaNum(60),
		fn: new ExpantaNum(40),
			efn: new ExpantaNum(1000),
		pathogenUpg: new ExpantaNum(65),
			darkCore: new ExpantaNum(70),
			dervBoost: new ExpantaNum(30),
			endorsements: new ExpantaNum(100),
			photons: new ExpantaNum(125),
			enlightenments: new ExpantaNum(80),
			spectralGems: new ExpantaNum(22),
	},
	atomic: { // polynomial
		rank: new ExpantaNum(800), 
			rankCheap: new ExpantaNum(4000),
		tier: new ExpantaNum(40), 
		rf: new ExpantaNum(300),
			bf: new ExpantaNum(150),
		fn: new ExpantaNum(35000),
			efn: new ExpantaNum(8000),
			pathogenUpg: new ExpantaNum(200),
			dervBoost: new ExpantaNum(100),
			endorsements: new ExpantaNum(250),
			photons: new ExpantaNum(400),
			enlightenments: new ExpantaNum(300),
			spectralGems: new ExpantaNum(80),
			darkCore: new ExpantaNum(75),
	},
	supercritical: { // exponential (weaker than hyper???) 
			rank: new ExpantaNum(60000), 
			tier: new ExpantaNum(500), 
			rf: new ExpantaNum(10000),
			fn: new ExpantaNum(100000),
			photons: new ExpantaNum(250000),
			spectralGems: new ExpantaNum(500),
			pathogenUpg: new ExpantaNum(999),
	},
	meta: { // logarithmic-polynomial 
			fn: new ExpantaNum(1e7),
			rank: new ExpantaNum(100000),
			tier: new ExpantaNum(1000)
	},
	exotic: {
			rank: new ExpantaNum(1e7),
	},
	instant: {
			rank: new ExpantaNum(1e15),
	},
	wtf: {
			rank: new ExpantaNum(1e40),
	},
	utterlyFucked: {
			rank: new ExpantaNum(1e125),
	},
};
const SCALING_RES = {
	rank: function (n = 0) {
		return player.rank;
	},
	rankCheap: function (n = 0) {
		return modeActive("extreme") ? player.rankCheap : new ExpantaNum(0);
	},
	tier: function (n = 0) {
		return player.tier;
	},
	rf: function (n = 0) {
		return player.rf;
	},
	fn: function (n = 0) {
		return modeActive("extreme") ? player.furnace.upgrades[n - 1] : new ExpantaNum(0);
	},
	bf: function(n = 0) {
		return modeActive("extreme") ? player.furnace.blueFlame : new ExpantaNum(0);
	},
	efn: function (n = 0) {
		return modeActive("extreme") ? player.furnace.enhancedUpgrades[n - 1] : new ExpantaNum(0);
	},
	pathogenUpg: function (n = 0) {
		return player.pathogens.upgrades[n];
	},
	darkCore: function (n = 0) {
		return player.dc.cores;
	},
	endorsements: function (n = 0) {
		return player.inf.endorsements;
	},
	enlightenments: function (n = 0) {
		return player.inf.ascension.enlightenments[n - 1];
	},
	spectralGems: function (n = 0) {
		return tmp.inf ? tmp.inf.pantheon.totalGems : new ExpantaNum(1 / 0);
	},
	dervBoost: function (n = 0) {
		return player.inf.derivatives.unlocks;
	},
	photons: function(n = 0) {
		return player.elementary.bosons.gauge.photons.upgrades[n - 1];
	},
	magma: function(n = 0) {
		return modeActive("extreme") ? player.magma.amount : new ExpantaNum(0);
	},
	rmagma: function(n = 0) {
		return modeActive("extreme") ? player.magma.ref : new ExpantaNum(0);
	},
	rocketupg: function(n = 0) {
		return player.rocketUPG[n].bought;
	},
};
const MULTI_SCALINGS = ["fn", "pathogenUpg", "enlightenments", "photons", "rocketupg"]
const SCALING_AMTS = {
	fn: 5,
	efn: 13,
	pathogenUpg: 15,
	enlightenments: 4,
	photons: 4,
	rocketupg: 1,
}
const REAL_SCALING_NAMES = {
	rank: "ranks",
	rankCheap: "rank cheapeners",
	tier: "tiers",
	rf: "rocket fuel",
	fn: "furnace upgrades",
	bf: "blue flame",
	efn: "enhanced furnace upgrades",
	pathogenUpg: "pathogen upgrades",
	darkCore: "dark cores",
	endorsements: "endorsements",
	enlightenments: "enlightenments",
	spectralGems: "spectral gems",
	dervBoost: "derivative boosts",
	photons: "photon upgrades",
	magma: "magma",
	rmagma: "reformed magma",
	rocketupg: "rocket upgrades",
}