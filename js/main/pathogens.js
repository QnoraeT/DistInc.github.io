function updatePathogensGain(){
	tmp.pathogens.st = new ExpantaNum(1.25);
	tmp.pathogens.gainLEpart = player.collapse.lifeEssence.add(1).log10().add(1).pow(0.1).sub(1);
	tmp.pathogens.gainPTHpart = player.pathogens.amount.add(1).log10().add(1);
	tmp.pathogens.gain = tmp.pathogens.gainLEpart.mul(tmp.pathogens.gainPTHpart).sqrt();
	tmp.pathogens.gain = softcap(tmp.pathogens.gain, "P", player.rank.gt(70000)?0.3:1, tmp.pathogens.st, 2)
	tmp.pathogens.baseGain = new ExpantaNum(tmp.pathogens.gain); // what why
	if (tmp.ach) if (tmp.ach[63].has) tmp.pathogens.gain = tmp.pathogens.gain.mul(ach63Eff());
	if (tmp.ach) if (tmp.ach[68].has) {
		tmp.pathogens.gain = tmp.pathogens.gain.mul(2.5);
		if (modeActive("hard+hikers_dream")) tmp.pathogens.gain = tmp.pathogens.gain.mul(tmp.hd.enerUpgs[3])
	}
	let a84 = tmp.dc ? tmp.dc.flow.max(1) : new ExpantaNum(1);
	if (a84.gte(50)) a84 = softcap(a84, "EP", player.rank.gt(70000)?0.3:1, 50, 2.5);
	if (tmp.ach[84].has) tmp.pathogens.gain = tmp.pathogens.gain.mul(a84);
	
	if (tmp.ach[131].has) tmp.pathogens.gain = tmp.pathogens.gain.mul(2);
	if (tmp.ach[87].has && modeActive("hard+hikers_dream")) {
		let x = player.tr.cubes.div("1e750").pow(.2).add(1)
		if (x.gt(100)) x = softcap(x, "EP", player.rank.gt(70000)?0.3:1, 100, 3.5)
		tmp.pathogens.gain = tmp.pathogens.gain.mul(x)
		let x2 = player.tr.cubes.div("1e800").pow(.2).add(1).min(1e3)
		tmp.pathogens.gain = tmp.pathogens.gain.mul(x2)
	}
	if (modeActive("hard")) tmp.pathogens.gain = tmp.pathogens.gain.div(3);
	if (modeActive("easy")) tmp.pathogens.gain = tmp.pathogens.gain.mul(2.4);
	tmp.pathogens.gain = tmp.pathogens.gain.mul(pathogenUpg5Eff());
	if (player.tr.upgrades.includes(25)&&modeActive("extreme")) tmp.pathogens.gain = tmp.pathogens.gain.mul(5)
	if (tmp.elm)
		if (player.elementary.times.gt(0))
			tmp.pathogens.gain = tmp.pathogens.gain.mul(tmp.elm.ferm.quarkR("strange").max(1));
	if (tmp.elm) tmp.pathogens.gain = tmp.pathogens.gain.mul(tmp.elm.bos.photonEff(1).max(1));
	if (tmp.inf) if (tmp.inf.upgs.has("5;10")) tmp.pathogens.gain = tmp.pathogens.gain.mul(INF_UPGS.effects["5;10"]().pth)
	if (tmp.inf) if (tmp.inf.upgs.has("10;5")) tmp.pathogens.gain = tmp.pathogens.gain.mul(INF_UPGS.effects["10;5"]())
	if (tmp.inf) if (tmp.inf.upgs.has("10;10")) tmp.pathogens.gain = tmp.pathogens.gain.mul(INF_UPGS.effects["10;10"]())
	if (tmp.fn && modeActive("extreme")) tmp.pathogens.gain = tmp.pathogens.gain.mul(tmp.fn.enh.moltBrEff||1)
	if (player.elementary.foam.unl && tmp.elm) tmp.pathogens.gain = tmp.pathogens.gain.mul(tmp.elm.qf.boost24)
}

function nonFreePathogenStrength(){
	let ret = new ExpantaNum(1)
	if (player.tier.gt(80)) ret = ret.mul(20)
	if (player.tier.gt(667)) ret = ret.mul(40)
	return ret
}

function freePathogenStrength(){
	let ret = new ExpantaNum(1)
	return ret
}

function updateTempPathogens() {
	if (!tmp.pathogens) tmp.pathogens = {};
	tmp.pathogens.lrm = new ExpantaNum(1);
	if (modeActive("hard")) tmp.pathogens.lrm = tmp.pathogens.lrm.div(5);
	if (modeActive("extreme")) tmp.pathogens.lrm = tmp.pathogens.lrm.mul(20);
	tmp.pathogens.upgPow = new ExpantaNum(1);
	if (player.tr.upgrades.includes(13) && !HCCBA("noTRU")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(tr13Eff().max(0));
	if (modeActive("extreme") && player.tr.upgrades.includes(27) && !HCCBA("noTRU"))
		tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(
			TR_UPGS[27].current()
		);
	if (modeActive("hard")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.mul(0.98);
	if (modeActive("easy")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.mul(1.089);
	if (tmp.dc) tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(tmp.dc.coreEff.max(0));
	if (modeActive('extreme')) tmp.pathogens.upgPow = tmp.pathogens.upgPow.mul(0.8);
	if (tmp.inf) if (tmp.inf.upgs.has("3;3")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(0.1);
	if (tmp.inf) if (tmp.inf.upgs.has("5;2")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(0.05);
	if (tmp.inf) if (tmp.inf.upgs.has("6;3")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(0.025);
	if (tmp.inf)
		if (tmp.inf.stadium.completed("drigganiz"))
			tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(STADIUM_REWARDS.effects.drigganiz());
	if (tmp.inf)
		if (tmp.inf.upgs.has("9;5"))
			tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(ExpantaNum.mul(0.01, player.inf.endorsements));
	if (tmp.ach) if (tmp.ach[125].has) tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(0.05);
	if (extremeStadiumComplete("quantron")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(EXTREME_STADIUM_DATA.quantron.effect());
	if (tmp.elm)
		if (player.elementary.times.gt(0))
			tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(tmp.elm.ferm.leptonR("netrion"));
	if (tmp.inf) if (tmp.inf.upgs.has("9;10")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(INF_UPGS.effects["9;10"]().sub(1).max(0))
	if (player.elementary.theory.tree.unl) tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(TREE_UPGS[13].effect(player.elementary.theory.tree.upgrades[13]||0))
	if (hasDE(5)) if ((player.elementary.theory.tree.upgrades[25]||new ExpantaNum(0)).gte(1)) tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(1.5)
	if (extremeStadiumActive("aqualon", 3)) tmp.pathogens.upgPow = tmp.pathogens.upgPow.div(player.rank.add(1).pow(0.05).mul(1.01))
	if (extremeStadiumActive("cranius", 4)) tmp.pathogens.upgPow = tmp.pathogens.upgPow.div(player.tier.add(1).pow(0.1).mul(1.02))
	if (nerfActive("weakPathogenUpgs")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.div(10);
	if (extremeStadiumActive("flamis", 3)) tmp.pathogens.upgPow = tmp.pathogens.upgPow.div(2);
	if (extremeStadiumActive("nullum", 3)) tmp.pathogens.upgPow = tmp.pathogens.upgPow.mul(0.8);
	if (extremeStadiumActive("quantron")) tmp.pathogens.upgPow = tmp.pathogens.upgPow.mul(0.9);
	if (nerfActive("noPathogenUpgs")) tmp.pathogens.upgPow = new ExpantaNum(0);
	if (tmp.pathogens.upgPow.gte(10)) tmp.pathogens.upgPow = softcap(tmp.pathogens.upgPow, "P", (player.rank.gt(22500))?0.8:1, 10, 2)
	if (player.elementary.sky.unl && tmp.elm) tmp.pathogens.upgPow = tmp.pathogens.upgPow.mul(tmp.elm.sky.pionEff[2])
	if (!tmp.pathogens.extra) tmp.pathogens.extra = function (n) {
		let extra = new ExpantaNum(0);
		if (tmp.inf) if (tmp.inf.asc) extra = extra.add(tmp.inf.asc.perkEff(2));
		if (n == 5 && tmp.pathogens[13]) extra = extra.add(pathogenUpg13Eff());
		return extra;
	};
	if (!tmp.pathogens.buy) tmp.pathogens.buy = function (n, manual=false) {
		if (PTH_UPGS[n].unl ? !PTH_UPGS[n].unl() : false) return;
		let cost;
		if (manual) cost = getPathogenUpgData(n).cost
		else cost = tmp.pathogens[n].cost
		if (player.pathogens.amount.lt(cost)) return;
		if (!tmp.ach[88].has) player.pathogens.amount = player.pathogens.amount.sub(cost);
		player.pathogens.upgrades[n] = player.pathogens.upgrades[n].add(1);
	};
	if (!tmp.pathogens.eff) tmp.pathogens.eff = function (n) {
		let fp = new ExpantaNum(1);
		if (tmp.inf) if (tmp.inf.upgs.has("8;8")) fp = fp.mul(INF_UPGS.effects["8;8"]());
		let bought = player.pathogens.upgrades[n].mul(nonFreePathogenStrength()).add(tmp.pathogens.extra(n).mul(freePathogenStrength()));
		if (bought.gte(getPathogenUpgSoftcapStart(n))) bought = softcap(bought, "P", 1, getPathogenUpgSoftcapStart(n), 2)
		bought = bought.mul(tmp.pathogens.upgPow);
		if (PTH_UPGS[n].unl ? !PTH_UPGS[n].unl() : false) bought = new ExpantaNum(0);
		let sPos = tmp.inf ? (tmp.inf.upgs.has("3;8") && n >= 6 && n <= 10) : false;
		switch(n) {
			case 1: {
				let ret = player.pathogens.amount
					.add(1)
					.log10()
					.add(1)
					.log10()
					.add(1)
					.pow(
						bought
							.add(1)
							.logBase(2)
							.add(bought.gt(0) ? 1 : 0)
					);
				if (ret.gte(2e3) && !(tmp.elm?tmp.elm.bos.hasHiggs("0;1;4"):false)) ret = softcap(ret, "P", 1, 2e3, 2);
				if (ret.gte(1e4)) ret = softcap(ret, "EP", 1, 1e4, 10) // strongest SC so far, 10th root
				if (tmp.elm) if (tmp.elm.bos.hasHiggs("0;1;4")) ret = ret.mul(4)
				if (player.elementary.sky.unl && tmp.elm) ret = ret.mul(tmp.elm.sky.pionEff[11])
				return ret;
			} case 2: {
				let ret = player.collapse.cadavers.add(1).pow(0.3).pow(bought.add(1).logBase(1.3));
				if (ret.gte("1e100000")) ret = softcap(ret, "E", 1, "e100000")
				return ret;
			} case 3: {
				let ret = player.collapse.cadavers.add(1).pow(0.4).pow(bought.add(1).logBase(1.4));
				if (ret.gte("1e100000")) ret = softcap(ret, "E", 1, "e100000")
				return ret;
			} case 4:
				return player.pathogens.amount.add(1).pow(1.5).pow(bought.pow(0.9));
			case 5:
				let exp = new ExpantaNum(1);
				if (tmp.inf) if (tmp.inf.upgs.has("7;5")) exp = exp.mul(INF_UPGS.effects["7;5"]());
				return ExpantaNum.pow(3, bought.sqrt()).pow(exp);
			case 6:
				if (sPos) {
					let eff = ExpantaNum.pow(1.4, bought.sqrt()).mul(
						ExpantaNum.pow(2, bought.pow(ExpantaNum.mul(2.5, fp))).pow(0.2)
					);
					if (eff.gte(new ExpantaNum("e3e9"))) eff = softcap(eff, "EP", 1, "e3e9", 3)
					return eff;
				} else return ExpantaNum.pow(1.4, bought.sqrt())
			case 7: 
				if (sPos) {
					return bought
						.add(1)
						.logBase(2)
						.add(1)
						.pow(5)
						.mul(bought.add(1).pow(bought.add(1).logBase(2).add(1)).pow(ExpantaNum.mul(30, fp)));
				} else return bought.add(1).logBase(2).add(1).pow(5);
			case 8: 
				if (sPos) {
					return bought
						.add(1)
						.logBase(2)
						.add(1)
						.log10()
						.mul(bought.add(1).logBase(2).add(1).pow(ExpantaNum.mul(2.75, fp)));
				} else return bought.add(1).logBase(2).add(1).log10();
			case 9: 
				if (sPos) {
					return bought
						.add(1)
						.logBase(4)
						.add(1)
						.pow(1.25)
						.mul(bought.add(1).pow(bought.add(1).log10().add(1)).pow(ExpantaNum.mul(100, fp)));
				} else return bought.add(1).logBase(4).add(1).pow(1.25);
			case 10: 
				if (sPos) {
					return bought
						.add(1)
						.logBase(4)
						.add(1)
						.sqrt()
						.mul(bought.add(1).pow(ExpantaNum.mul(10, fp)));
				} else return bought.add(1).logBase(4).add(1).sqrt();
			case 11: 
				return player.pathogens.amount.add(1).mul(10).log(10).log(10).mul(bought.pow(0.4).mul(2.5));
			case 12: 
				return player.rf.add(1).log10().add(1).log10().mul(bought.cbrt().mul(1.5));
			case 13: 
				return ExpantaNum.mul(2, bought);
			case 14: 
				return ExpantaNum.sub(1, ExpantaNum.div(1, player.dc.cores.add(1).log10().mul(bought).add(1)));
			case 15: 
				return ExpantaNum.sub(1, ExpantaNum.div(1, bought.add(1).log10().add(1).pow(0.1)));
		}
		throw new Error("amazing code right here y'all  [Pathogen UPG#" + n + "  doesn't exist]")
	};
	if (!tmp.pathogens.disp) tmp.pathogens.disp = function (n) {
		let eff = tmp.pathogens.eff(n);
		if (n == 1) return "+" + showNum(eff.sub(1).mul(100)) + "%";
		else if (n == 2) return showNum(eff) + "x";
		else if (n == 3) return showNum(eff) + "x";
		else if (n == 4) return showNum(eff) + "x";
		else if (n == 5) return showNum(eff) + "x";
		else if (n == 6) return "+" + showNum(eff.sub(1).mul(100)) + "%";
		else if (n == 7) return showNum(eff) + "x later";
		else if (n == 8) return showNum(eff) + " later";
		else if (n == 9) return showNum(eff) + "x later";
		else if (n == 10) return showNum(eff) + "x later";
		else if (n == 11 || n == 12) return showNum(eff) + " later";
		else if (n == 13) return "+" + showNum(eff) + " Levels";
		else if (n == 14 || n == 15) return showNum(eff.mul(100)) + "% weaker";
		else return "???";
	};
	for (let i = 1; i <= PTH_AMT; i++) {
		if (!tmp.pathogens[i]) tmp.pathogens[i] = {};
		let data = getPathogenUpgData(i);
		tmp.pathogens[i].cost = data.cost;
		tmp.pathogens[i].bulk = data.bulk;
		if (!tmp.pathogens[i].extra) tmp.pathogens[i].extra = function() { return tmp.pathogens.extra(i) }
		if (!tmp.pathogens[i].buy) tmp.pathogens[i].buy = function(manual=false) { tmp.pathogens.buy(i, manual) }
		if (!tmp.pathogens[i].eff) tmp.pathogens[i].eff = function() { return tmp.pathogens.eff(i) }
		if (!tmp.pathogens[i].disp) tmp.pathogens[i].disp = function() { return tmp.pathogens.disp(i) }
	}
	if (!tmp.pathogens.maxAll) tmp.pathogens.maxAll = function () {
		for (let i = 1; i <= PTH_AMT; i++) {
			if (PTH_UPGS[i].unl ? !PTH_UPGS[i].unl() : false) continue;
			if (player.pathogens.amount.lt(tmp.pathogens[i].cost)) continue;
			player.pathogens.upgrades[i] = player.pathogens.upgrades[i].max(
				tmp.pathogens[i].bulk.floor().max(player.pathogens.upgrades[i].add(1))
			);
			if (!tmp.ach[88].has) player.pathogens.amount = player.pathogens.amount.sub(tmp.pathogens[i].cost);
		}
	};
	updatePathogensGain();
}

function getPathogenUpgData(i) {
	let upg = PTH_UPGS[i];
	let fp = new Decimal(1)
	if (player.tier.gt(80)) fp = fp.mul(1.25)
	let cost = upg.start.mul(ExpantaNum.pow(upg.inc, player.pathogens.upgrades[i]))
	let bulk = player.pathogens.amount.div(upg.start).max(1).logBase(upg.inc).add(1);
	let scalPath;
	scalPath = player.pathogens.upgrades[i];
	scalPath = doAllScaling(scalPath, "pathogenUpg", false, [3, 5, 1.025, 2, 3]);
	scalPath = upg.start.mul(ExpantaNum.pow(upg.inc, scalPath.div(fp)));
	cost = scalPath;
	scalPath = player.pathogens.amount.div(upg.start).max(1).logBase(upg.inc).mul(fp).add(1);
	scalPath = doAllScaling(scalPath, "pathogenUpg", true, [3, 5, 1.025, 2, 3]);
	scalPath = scalPath.add(1).round();
	bulk = scalPath;
	return {cost: cost, bulk: bulk};
}

function getPathogenUpgSoftcapStart(x) {
	let sc = new ExpantaNum(PTH_UPG_SCS[x])
	if (tmp.inf) if (tmp.inf.upgs.has("3;6")) sc = sc.add(1);
	if (modeActive("hard")) {
		sc = modeActive("easy") ? sc : new ExpantaNum(modeActive("extreme")?1:2);
		if (tmp.ach[65].has) sc = sc.add(5);
	}
	if (modeActive("easy")) sc = sc.mul(1.1).round();
	return sc;
}

function pathogenUpg5Eff() {
	return (tmp.pathogens && player.pathogens.unl) ? tmp.pathogens.eff(5) : new ExpantaNum(1);
}

function pathogenUpg13Eff() {
	return (tmp.pathogens && player.pathogens.unl) ? tmp.pathogens.eff(13) : new ExpantaNum(1);
}