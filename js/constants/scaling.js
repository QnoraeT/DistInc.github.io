const SCALE_COLOR = ["#FFFFFF", "#0060FF", "#FFD000", "#FF0060", "#20BF3A", "#8636FF"]
const SCALE_COLOR_DARK = ["#00000000", "#00358b", "#927700", "#880034", "#117421", "#471d85"]
const SCALE_COLOR_BRIGHT = ["#FFFFFF", "#90c5ff", "#fff4a0", "#ff8ebc", "#80f090", "#c198ff"]
const SCALE_TEXT_SHADOW = [1, 1, 1.25, 1.5, 1.8, 2]
const SCALING_STARTS = {
	scaled: {
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
	},
	superscaled: {
		rank: new ExpantaNum(100),
		rankCheap: new ExpantaNum(20),
		tier: new ExpantaNum(12),
		rf: new ExpantaNum(75),
		fn: new ExpantaNum(15),
			bf: new ExpantaNum(55),
		efn: new ExpantaNum(60),
		pathogenUpg: new ExpantaNum(40),
		darkCore: new ExpantaNum(20),
		endorsements: new ExpantaNum(50),
		enlightenments: new ExpantaNum(20),
		spectralGems: new ExpantaNum(16),
		dervBoost: new ExpantaNum(14),
			photons: new ExpantaNum(60),
	},
	hyper: {
		rank: new ExpantaNum(160),
		rankCheap: new ExpantaNum(35),
		tier: new ExpantaNum(16),
		rf: new ExpantaNum(120),
			bf: new ExpantaNum(100),
		fn: new ExpantaNum(40),
			efn: new ExpantaNum(1000),
		pathogenUpg: new ExpantaNum(65),
			darkCore: new ExpantaNum(40),
			dervBoost: new ExpantaNum(30),
			endorsements: new ExpantaNum(400),
			photons: new ExpantaNum(1600),
			enlightenments: new ExpantaNum(80),
			spectralGems: new ExpantaNum(95),
	},
	atomic: { 
		rank: new ExpantaNum(800), 
			rankCheap: new ExpantaNum(1200),
		tier: new ExpantaNum(40), 
		rf: new ExpantaNum(300),
			bf: new ExpantaNum(4000),
		fn: new ExpantaNum(35000),
			efn: new ExpantaNum(40000),
			pathogenUpg: new ExpantaNum(200),
			dervBoost: new ExpantaNum(100),
			endorsements: new ExpantaNum(2000),
			photons: new ExpantaNum(9000),
			enlightenments: new ExpantaNum(600),
			spectralGems: new ExpantaNum(570),
			darkCore: new ExpantaNum(75),
	},
	supercritical: {
			rank: new ExpantaNum(60000), 
			tier: new ExpantaNum(2000), 
			rf: new ExpantaNum(10000),
			fn: new ExpantaNum(100000),
			photons: new ExpantaNum(250000),
			spectralGems: new ExpantaNum(4600),
			pathogenUpg: new ExpantaNum(999),
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
};
const MULTI_SCALINGS = ["fn", "pathogenUpg", "enlightenments", "photons"]
const SCALING_AMTS = {
	fn: 5,
	efn: 13,
	pathogenUpg: 15,
	enlightenments: 4,
	photons: 4,
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
}