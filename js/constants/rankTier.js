// Ranks

const RANK_DESCS = {
	0: {
		text: "increase the maximum velocity by 1m/s.",
		req: new ExpantaNum(1),
		effectType: "x",
	},
	1: {
		text: "increase the acceleration and maximum velocity by 10% for each rank up.",
		req: new ExpantaNum(2),
		effectType: "x",
	},
	2: {
		text: "double your acceleration.",
		req: new ExpantaNum(3),
		effectType: "x",
	},
	3: {
		text: "triple your acceleration & maximum velocity for each tier up.",
		req: new ExpantaNum(4),
		effectType: "x",
	},
	4: {
		text: "increase the acceleration and maximum velocity by 97.5% for each rank up.",
		req: new ExpantaNum(5),
		effectType: "x",
	},
	5: {
		text: "increase your maximum velocity by 10% for each rank up.",
		req: new ExpantaNum(8),
		effectType: "x",
	},
	6: {
		text: "double your acceleration.",
		req: new ExpantaNum(10),
		effectType: "x",
	},
	7: {
		text: "multiply your acceleration & maximum velocity by (n+1)^1.6, where n is your rocket fuel.",
		req: new ExpantaNum(14),
		effectType: "x",
	},
	8: {
		text: "quadruple your acceleration.",
		req: new ExpantaNum(15),
		effectType: "x",
	},
	9: {
		text: "double intelligence gain.",
		req: new ExpantaNum(20),
		effectType: "x",
	},
	10: {
		text: "multiply your acceleration by 10.",
		req: new ExpantaNum(25),
		effectType: "x",
	},
	11: {
		text: "triple intelligence gain.",
		req: new ExpantaNum(30),
		effectType: "x",
	},
	12: {
		text: "time goes by 50% faster.",
		req: new ExpantaNum(35),
		effectType: "x",
	},
	13: {
		text: "multiply intelligence gain by the number of primes less than or equal to your scrap amount (minimum 1, softcaps after 1,000,000,000 primes).",
		req: new ExpantaNum(40),
		effectType: "x",
	},
	14: {
		text: "time goes by 80% faster.",
		req: new ExpantaNum(45),
		effectType: "x",
	},
	15: {
		text: "multiply your acceleration by 15.",
		req: new ExpantaNum(50),
		effectType: "x",
	},
	16: {
		text: "double your maximum velocity for each rank up.",
		req: new ExpantaNum(55),
		effectType: "x",
	},
	17: {
		text: "double scrap gain.",
		req: new ExpantaNum(60),
		effectType: "x",
	},
	18: {
		text: "time goes by 40% faster.",
		req: new ExpantaNum(70),
		effectType: "x",
	},
	19: {
		text: "multiply your acceleration by 25.",
		req: new ExpantaNum(75),
		effectType: "x",
	},
	20: {
		text: "time goes by 50% faster.",
		req: new ExpantaNum(80),
		effectType: "x",
	},
	21: {
		text: "time goes by 75% faster.",
		req: new ExpantaNum(90),
		effectType: "x",
	},
	22: {
		text: "double rocket gain.",
		req: new ExpantaNum(100),
		effectType: "x",
	},
	23: {
		text: "double intelligence gain for each rank up.",
		req: new ExpantaNum(111),
		effectType: "x",
	},
	24: {
		text: "time goes by 50% faster.",
		req: new ExpantaNum(125),
		effectType: "x",
	},
	25: {
		text: "time goes by 55% faster.",
		req: new ExpantaNum(150),
		effectType: "x",
	},
	26: {
		text: "time goes by 60% faster.",
		req: new ExpantaNum(175),
		effectType: "x",
	},
	27: {
		text: "time goes by 70% faster.",
		req: new ExpantaNum(200),
		effectType: "x",
	},
	28: {
		text: "time goes by 80% faster.",
		req: new ExpantaNum(250),
		effectType: "x",
	},
	29: {
		text: "time goes by 90% faster.",
		req: new ExpantaNum(300),
		effectType: "x",
	},
	30: {
		text: "time goes by 95% faster.",
		req: new ExpantaNum(500),
		effectType: "x",
	},
	31: {
		text: "time goes by 98% faster.",
		req: new ExpantaNum(1000),
		effectType: "x",
	},
	32: {
		text: "photon upgrades get scaled later based on your EP.",
		req: new ExpantaNum(1500),
		effectType: "+",
	},
	33: {
		text: "foam cost scaling is weaker based off of your Hadronic Score",
		req: new ExpantaNum(1750),
		effectType: "% weaker",
	},
	34: {
		text: `scaled Enlightenments are weaker based off of your Ascension Power, starting at ${showNum(Number.MAX_VALUE)}. (also effects Superscaled at a reduced rate).`,
		req: new ExpantaNum(2000),
		effectType: "% weaker",
	},
	35: {
		text: `rocket Fuel uses a better effect formula, and its Atomic scaling is weaker based off of Rockets (after ${showNum("ee9")} rockets)`,
		req: new ExpantaNum(2500),
		effectType: "% weaker",
	},
	36: {
		text: "all Rocket-related softcaps are weaker based off of Cadavers.",
		req: new ExpantaNum(4000),
		effectType: "% weaker",
	},
	37: {
		text: "time Reversal Upgrades 1-15 uses better formulas boosted by Rank.",
		req: new ExpantaNum(7500),
		effectType: "x",
	},
	38: {
		text: "time goes by 100% faster.",
		req: new ExpantaNum(10000),
		effectType: "x",
	},
	39: {
		text: "dark flow is increased based off of your ranks (softcapped after 40,000 ranks)",
		req: new ExpantaNum(15000),
		effectType: "x",
	},
	40: {
		text: "pathogen upgrade power softcap is 20% weaker.",
		req: new ExpantaNum(22500),
		effectType: "x",
	},
	41: {
		text: "hyper Pathogen upgrades are weaker based off of your Ranks and EP.",
		req: new ExpantaNum(40000),
		effectType: "% weaker",
	},
	42: {
		text: "pathogen gain related softcaps are 70% weaker",
		req: new ExpantaNum(70000),
		effectType: "x",
	},
	43: {
		text: "superscaled Endorsements are weaker based off of your knowledge, starting at (X)",
		req: new ExpantaNum(100000),
		effectType: "% weaker",
	},
	44: {
		text: "all Atomic scaling from pre-infinity is weaker based off of Time Cubes",
		req: new ExpantaNum(150000),
		effectType: "% weaker",
	},
	45: {
		text: "all Hyper Scalings in pre-multiverse is 10% weaker.",
		req: new ExpantaNum(200000),
		effectType: "x",
	},
};

const DEFAULT_RANK_DESC = "rank up.";

// Tiers

const TIER_DESCS = {
	0: {
		text: "make the rank requirement formula 25% slower.",
		req: new ExpantaNum(0),
		effectType: "x",
	},
	1: {
		text: "double your acceleration and quintuple your maximum velocity if you are at least Rank 3.",
		req: new ExpantaNum(1),
		effectType: "x",
	},
	2: {
		text: "make the rank requirement formula 10% slower for each tier up.",
		req: new ExpantaNum(2),
		effectType: "x",
	},
	3: {
		text: "triple your acceleration.",
		req: new ExpantaNum(3),
		effectType: "x",
	},
	4: {
		text: "double intelligence gain.",
		req: new ExpantaNum(4),
		effectType: "x",
	},
	5: {
		text: "quintuple your acceleration.",
		req: new ExpantaNum(5),
	},
	6: {
		text: "time goes by 50% faster.",
		req: new ExpantaNum(6),
		effectType: "x",
	},
	7: {
		text: "time goes by 10% faster for each rocket fuel.",
		req: new ExpantaNum(7),
		effectType: "x",
	},
	8: {
		text: "multiply your acceleration by 10.",
		req: new ExpantaNum(8),
		effectType: "x",
	},
	9: {
		text: "intelligence boosts maximum velocity.",
		req: new ExpantaNum(9),
		effectType: "x",
	},
	10: {
		text: "multiply your acceleration by 15.",
		req: new ExpantaNum(10),
		effectType: "x",
	},
	11: {
		text: "triple intelligence gain.",
		req: new ExpantaNum(12),
		effectType: "x",
	},
	12: {
		text: "quadruple intelligence gain.",
		req: new ExpantaNum(13),
		effectType: "x",
	},
	13: {
		text: "multiply your acceleration by 25.",
		req: new ExpantaNum(15),
		effectType: "x",
	},
	14: {
		text: "time goes by 60% faster.",
		req: new ExpantaNum(16),
		effectType: "x",
	},
	15: {
		text: "time goes by 80% faster.",
		req: new ExpantaNum(18),
		effectType: "x",
	},
	16: {
		text: "time goes by 100% faster.",
		req: new ExpantaNum(20),
		effectType: "x",
	},
	17: {
		text: "EP softcap gets weakened based off of your tiers.",
		req: new ExpantaNum(50),
		effectType: "% weaker",
	},
	18: {
		text: "hyper Tier starts later based off of your Magma.",
		req: new ExpantaNum(60),
		req2: function() { player.magma.done },
		effectType: "+",
	},
	19: {
		text: "compressed supersymmetrical wave's softcap is much weaker, Entangled Strings' gain softcap is 25% weaker, and Acceleron's effect softcap is weaker. ",
		req: new ExpantaNum(72),
		effectType: "x",
	},
	20: {
		text: "non-extra Pathogen Upgrades are 2,000% stronger, and their general cost scaling is 25% weaker",
		req: new ExpantaNum(80),
		effectType: "x",
	},
	21: {
		text: "atomic Rocket Fuel is weaker based off of your Rockets and the product of Ranks and Tiers.",
		req: new ExpantaNum(85),
		effectType: "% weaker",
	},
	22: {
		text: "hyper Dark Cores and Scaled Derivative Boosts are weaker based off of your Cadavers.",
		req: new ExpantaNum(100),
		effectType: "% weaker",
	},
	23: {
		text: "all furnace and rocket related scalings (before Atomic and Magma) is weaker based off of time in Elementary reset.",
		req: new ExpantaNum(120),
		effectType: "% weaker",
	},
	24: {
		text: "non-free Pathogen Upgrade purchases are 100x stronger.",
		req: new ExpantaNum(200),
		effectType: "x",
	},
	25: {
		text: "scaled and Superscaled Endorsements are 50% and 25% weaker, respectively.",
		req: new ExpantaNum(300),
		effectType: "x",
	},
};

const DEFAULT_TIER_DESC = "tier up.";
