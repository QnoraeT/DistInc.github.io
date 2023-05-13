function updateTempRanks() {
	if (!tmp.ranks) tmp.ranks = {};
	let fp = getRankFP()
	let bc = getRankBaseCost()
	let scalRank
	scalRank = player.rank
	scalRank = doAllScaling(scalRank, "rank", false)
	scalRank = new ExpantaNum(bc).times(ExpantaNum.pow(2, scalRank.div(fp).max(1).sub(1).pow(2)));
	tmp.ranks.req = scalRank
	scalRank = player.distance.div(bc).max(1).logBase(2).sqrt().add(1).mul(fp)
	scalRank = doAllScaling(scalRank, "rank", true)
	scalRank = scalRank.plus(1).floor();
	tmp.ranks.bulk = scalRank
	if (player.rank.gte(RANK_DESCS[Object.keys(RANK_DESCS).length-1].req)){
		tmp.ranks.desc = DEFAULT_RANK_DESC
	} else {
		for (let i=0;i<Object.keys(RANK_DESCS).length;i++) {
			if (player.rank.lt(RANK_DESCS[i].req)){
				tmp.ranks.desc = RANK_DESCS[i].text + "  (Next reward at " + showNum(RANK_DESCS[i].req) + " ranks.)"
				break;
			}
		}
	}
	tmp.ranks.canRankUp = player.distance.gte(tmp.ranks.req);
	if (nerfActive("noRank")) {tmp.ranks.canRankUp = false;}
	tmp.ranks.layer = new Layer("rank", tmp.ranks.canRankUp, "semi-forced");
	if (!tmp.rank) tmp.rank = {};
	if (!tmp.rank.onReset) tmp.rank.onReset = function (prev) {
		if (tmp.collapse)
			if (hasCollapseMilestone(12)) {
				player.distance = prev.distance;
				player.velocity = prev.velocity;
			}
		if (!tmp.inf.upgs.has("4;9")) tmp.inf.derv.resetDervs();
	};
	if (!tmp.rank.updateOnReset) tmp.rank.updateOnReset = function() { updateTempRanks(); }
}

function getRankFP() {
	let fp = new ExpantaNum(1);
	if (player.tier.gt(0)) fp = fp.times(1.25)
	if (player.tier.gt(2)) fp = fp.times(tier2Eff())
	if (tmp.ach) if (tmp.ach[43].has) fp = fp.times(1.025)
	if (player.tr.upgrades.includes(3) && !HCCBA("noTRU")) fp = fp.times(1.1)
	if (tmp.rankCheap && modeActive("extreme")) fp = fp.times(getRankCheapEff())
	return fp
}

function getRankBaseCost() {
	let bc = new ExpantaNum(10)
	if (modeActive("extreme") && player.rank < 3) bc = bc.times(2)
	if (modeActive("easy") && player.rank < 3) bc = bc.div(3)
	if (tmp.inf) if (tmp.inf.stadium.active("spaceon", 5) || tmp.inf.stadium.active("solaris", 6)) bc = bc.times(10)
	if (tmp.rankCheap && modeActive("extreme")) bc = bc.div(tmp.rankCheap.eff2).max(1e-100)
	return bc
}

function rank2Eff() {
	return ExpantaNum.pow(1.1, player.rank);
}

function rank4Eff() {
	return ExpantaNum.pow(3, player.tier);
}

function rank5Eff() {
	return ExpantaNum.pow(1.975, player.rank);
}

function rank8Eff() {
	return ExpantaNum.pow(1.1, player.rank);
}

function rank14Eff() {
	return ExpantaNum.pow(player.rf.plus(1), 1.6);
}

function rank40Eff() {
	let eff = primesLTE(player.automation.scraps).max(1);
	if (eff.gte(1e9)) eff = softcap(eff, "E", 1, 1e9)
	return eff;
}

function rank55Eff() {
	return ExpantaNum.pow(2, player.rank)
}

function rank111Eff() {
	return ExpantaNum.pow(2, player.rank)
}

function rank1500Eff() {
	return softcap(ExpantaNum.pow(10, player.elementary.particles.max(1e9).sub(1e9).add(1).log(10).pow(0.25)).sub(1).div(20), "EP", 1, 45, 2)
}