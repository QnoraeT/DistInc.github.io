function updateTempRanks() {
	if (!tmp.ranks) tmp.ranks = {};
	let fp = getRankFP()
	let bc = getRankBaseCost()
	let divide = new Decimal(1)
	if (tmp.rankCheap)
		divide = tmp.rankCheap.eff2
	let scalRank
	scalRank = player.rank
	scalRank = doAllScaling(scalRank, "rank", false)
	scalRank = new ExpantaNum(bc).times(ExpantaNum.pow(2, scalRank.div(fp).max(1).sub(1).pow(2))).div(divide);
	tmp.ranks.req = scalRank
	scalRank = player.distance.mul(divide).div(bc).max(1).logBase(2).sqrt().add(1).mul(fp)
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
	if (player.tier.gt(0)) fp = fp.times(1.25);
	if (player.tier.gt(2)) fp = fp.times(tierEffects(2));
	if (tmp.ach) if (tmp.ach[43].has) fp = fp.times(1.025);
	if (player.tr.upgrades.includes(3) && !HCCBA("noTRU")) fp = fp.times(1.1);
	if (tmp.rankCheap && modeActive("extreme")) fp = fp.times(getRankCheapEff());
	return fp;
}

function getRankBaseCost() {
	let bc = new ExpantaNum(10);
	if (modeActive("extreme") && player.rank < 3) bc = bc.times(2);
	if (modeActive("easy") && player.rank < 3) bc = bc.div(3);
	if (tmp.inf) if (tmp.inf.stadium.active("spaceon", 5) || tmp.inf.stadium.active("solaris", 6)) bc = bc.times(10);
	// if (tmp.rankCheap && modeActive("extreme")) bc = bc.div(tmp.rankCheap.eff2).max(1e-100);
	return bc;
}

function rankEffects(num) {
	let temp
	num = showNum(new Decimal(num), false)
	switch(num) {
		case "2":
			temp = ExpantaNum.pow(1.1, player.rank);
			break;
		case "4":
			temp = ExpantaNum.pow(3, player.tier);
			break;
		case "5":
			temp = ExpantaNum.pow(1.975, player.rank);
			break;
		case "8":
			temp = ExpantaNum.pow(1.1, player.rank);
			break;
		case "14":
			temp = ExpantaNum.pow(player.rf.plus(1), 1.6);
			break;
		case "40":
			let eff = primesLTE(player.automation.scraps).max(1);
			if (eff.gte(1e9)) eff = softcap(eff, "E", 1, 1e9);
			temp = eff;
			break;
		case "55":
			temp = ExpantaNum.pow(2, player.rank);
			break;
		case "111":
			temp = ExpantaNum.pow(2, player.rank);
			break;
		case "1500":
			temp = softcap(ExpantaNum.pow(10, player.elementary.particles.max(1e9).sub(1e9).add(1).log(10).pow(0.25)).sub(1).div(20), "EP", 1, 25, 2);
			break;
		case "1750":
			temp = player.elementary.hc.best.max(10).div(10).sub(1).div(6).add(1);
			break;
		case "2000":
			temp = player.inf.ascension.power.max(Number.MAX_VALUE).log(Number.MAX_VALUE).root(2);
			break;
		case "2500":
			temp = player.rockets.max("ee9").log(10).root(9).div(10).root(1.75);
			break;
		case "4000":
			temp = player.collapse.cadavers.max("ee8").log(10).log(1e8).root(3.5);
			break;
		case "1.5e4":
			temp = new Decimal(1) // placeholder
			break;
		case "4e4":
			temp = new Decimal(1) // placeholder
			break;
		case "1e5":
			temp = new Decimal(1) // placeholder
			break;
		case "1.5e5":
			temp = new Decimal(1) // placeholder
			break;
		default:
			return false
	}
	return temp
}
