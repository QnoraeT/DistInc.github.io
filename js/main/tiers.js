function updateTempTiers() {
	if (!tmp.tiers) tmp.tiers = {};
	tmp.tiers.fp = getTierFP();
	tmp.tiers.bc = getTierBaseCost();
	let scalTier
	scalTier = player.tier
	scalTier = doAllScaling(scalTier, "tier", false)
	scalTier = new ExpantaNum(tmp.tiers.bc).plus(scalTier.div(tmp.tiers.fp).pow(2));
	tmp.tiers.req = scalTier
	scalTier = player.rank.sub(tmp.tiers.bc).max(0).sqrt().times(tmp.tiers.fp)
	scalTier = doAllScaling(scalTier, "tier", true)
	scalTier = scalTier.plus(1).round();
	tmp.tiers.bulk = scalTier
	tmp.tiers.desc = player.tier.lt(Number.MAX_VALUE)
		? TIER_DESCS[player.tier.toNumber()]
			? TIER_DESCS[player.tier.toNumber()]
			: DEFAULT_TIER_DESC
		: DEFAULT_TIER_DESC;
	tmp.tiers.canTierUp = player.rank.gte(tmp.tiers.req);
	if (nerfActive("noTier")) tmp.tiers.canTierUp = false;
	tmp.tiers.layer = new Layer("tier", tmp.tiers.canTierUp, "semi-forced");
	if (!tmp.tier) tmp.tier = {};
	if (!tmp.tier.onReset) tmp.tier.onReset = function (prev) {
		if (modeActive('extreme')) if (tmp.ach[22].has) player.rankCheap = new ExpantaNum(1)
		if (hasCollapseMilestone(11)) {
			player.rank = prev.rank;
		}
		if (player.tr.upgrades.includes(14) && !HCCBA("noTRU")) {
			player.distance = prev.distance;
			player.velocity = prev.velocity;
		}
		if (!tmp.inf.upgs.has("4;9")) tmp.inf.derv.resetDervs();
	};
	if (!tmp.tier.updateOnReset) tmp.tier.updateOnReset = function() { updateTempTiers(); }
}

function getTierFP() {
	let fp = new ExpantaNum(1)
	if (player.elementary.sky.unl && tmp.elm && !scalingActive("tier", player.tier, "scaled")) fp = fp.sub(tmp.elm.sky.pionEff[10]).pow(-1)
	if (player.tr.upgrades.includes(20) && !HCCBA("noTRU") && modeActive("extreme")) fp = fp.times(player.rankCheap.plus(1).log10().plus(1).log10().plus(1));
	if (extremeStadiumActive("cranius", 5)) fp = fp.div(player.rankCheap.plus(1))
	if (tmp.ach) if (tmp.ach[194].has) fp = fp.times(1.0069);
	return fp
}

function getTierBaseCost() {
	let bc = new ExpantaNum(3)
	if (modeActive("extreme") && player.tier < 2) bc = bc.plus(1);
	if (modeActive("easy") && player.tier < 2) bc = bc.sub(1);
	if (tmp.inf) if (tmp.inf.stadium.active("solaris", 5) || tmp.inf.stadium.active("spaceon", 6)) bc = bc.plus(25);
	return bc
}

function tier2Eff() {
	let tier = player.tier;
	return ExpantaNum.pow(1.1, tier);
}

function tier7Eff() {
	return ExpantaNum.pow(1.1, player.rf)
}

function tier9Eff() {
	return player.automation.intelligence.plus(1).log10().plus(1).sqrt();
}