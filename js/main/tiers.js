function updateTempTiers() {
	if (!tmp.tiers) tmp.tiers = {};
	tmp.tiers.fp = getTierFP();
	tmp.tiers.bc = getTierBaseCost();
	let scalTier;
	scalTier = player.tier;
	scalTier = doAllScaling(scalTier, "tier", false);
	scalTier = new ExpantaNum(tmp.tiers.bc).add(scalTier.div(tmp.tiers.fp).pow(2));
	tmp.tiers.req = scalTier;
	scalTier = player.rank.sub(tmp.tiers.bc).max(0).sqrt().mul(tmp.tiers.fp);
	scalTier = doAllScaling(scalTier, "tier", true);
	scalTier = scalTier.add(1).floor();
	tmp.tiers.bulk = scalTier;
	if (player.tier.gte(TIER_DESCS[Object.keys(TIER_DESCS).length-1].req)){
		tmp.tiers.desc = DEFAULT_TIER_DESC
	} else {
		for (let i=0;i<Object.keys(TIER_DESCS).length;i++) {
			if (player.tier.lt(TIER_DESCS[i].req)){
				tmp.tiers.desc = TIER_DESCS[i].text + "  (Next reward at " + showNum(TIER_DESCS[i].req) + " tiers.)"
				break;
			}
		}
	}
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
	let fp = new ExpantaNum(1);
	if (player.elementary.sky.unl && tmp.elm && !scalingActive("tier", player.tier, "scaled")) fp = fp.sub(tmp.elm.sky.pionEff[10]).pow(-1);
	if (player.tr.upgrades.includes(20) && !HCCBA("noTRU") && modeActive("extreme")) fp = fp.mul(TR_UPGS[20].current());
	if (extremeStadiumActive("cranius", 5)) fp = fp.div(player.rankCheap.add(1));
	if (tmp.ach) if (tmp.ach[194].has) fp = fp.mul(1.0069);
	return fp;
}

function getTierBaseCost() {
	let bc = new ExpantaNum(3);
	if (modeActive("extreme") && player.tier.lt(2)) bc = bc.add(1);
	if (modeActive("easy") && player.tier.lt(2)) bc = bc.sub(1);
	if (tmp.inf) if (tmp.inf.stadium.active("solaris", 5) || tmp.inf.stadium.active("spaceon", 6)) bc = bc.add(25);
	return bc;
}

function tierEffects(num) {
	let temp
	num = showNum(new Decimal(num), false)
	switch(num) {
		case "2":
			temp = ExpantaNum.pow(1.1, player.tier);
			break;
		case "7":
			temp = ExpantaNum.pow(1.1, player.rf);
			break;
		case "9":
			temp = player.automation.intelligence.add(1).log10().add(1).sqrt();
			break;
		case "50":
			temp = player.tier.div(50).pow(2).add(1);
			break;
		case "60":
			temp = player.magma ? player.magma.amount.max(5).div(5).pow(1.2).sub(1):new Decimal(1);
			break;
		case "85":
			temp = player.rockets.add(1).log(10).add(1).log(10).pow(4.25).mul(player.rank.mul(player.tier)).root(128).max(1)
			break;
		case "100":
			temp = player.collapse.cadavers.max("ee10").log(10).log(10).div(10).pow(2.2222)
			break;
		case "120":
			temp = softcap(player.elementary.time, "EP", 1, 100, 2.2).root(1.5).div(200).add(1).min(10)
			break;	
		default: 
			return false																								
	}
	return temp
}