function getRocketSoftcapStart() {
	let sc = new ExpantaNum(LAYER_SC["rockets"]);
	if (modeActive("hard")) sc = new ExpantaNum(1)
	if (modeActive("easy")) sc = sc.mul(1.1).round();
	if (tmp.pathogens && player.pathogens.unl) sc = sc.mul(tmp.pathogens[7].eff())
	return sc
}

function getRocketEffectSoftcapStart() {
	let sc = new ExpantaNum(5);
	if (modeActive("hard")) sc = sc.sub(2);
	if (modeActive("easy")) sc = sc.add(1);
	if (tmp.pathogens && player.pathogens.unl) sc = sc.add(tmp.pathogens[8].eff());
	return sc
}

function getRocketSoftcapStrength() {
	let temp = new Decimal(1)
	if (player.rank.gt(4000)) temp = temp.div(rankEffects(4000))
	if (tmp.rockets && player.rocketUPG[1].ascension.gte(1)) temp = temp.div(ROCKET_UPGS[1].eff()[1])
	return temp
}

function getRocketEffect() {
	let rocketSoftcapStrength = getRocketSoftcapStrength();
	let r = player.rockets;
	if (extremeStadiumActive("nullum", 4)) r = ExpantaNum.pow(10, r.log10().mul(0.75));
	let sc1 = new Decimal(4)
	if (tmp.rockets && player.rocketUPG[1].ascension.gte(2)) sc1 = sc1.pow(ROCKET_UPGS[1].eff()[2]);
	if (r.gte(sc1)) r = softcap(r, "EP", rocketSoftcapStrength, sc1, 10);
	if (player.rf.gt(0)) {
		if (player.rank.gt(2500)){
			r = r.mul(getFuelEff2());
		} else {
			r = r.add(getFuelEff2());
		}
	}
	let eff = r.add(1).logBase(3).mul(getFuelEff());
	if (modeActive("easy")) eff = eff.mul(2).add(1);
	eff = softcap(eff, "P", rocketSoftcapStrength, getRocketEffectSoftcapStart(), 2);
	if (tmp.fn && modeActive("extreme")) if (player.rf.gt(0)) eff = eff.add(tmp.fn.eff);
	if (tmp.inf) if (tmp.inf.upgs.has("2;1")) eff = eff.mul(INF_UPGS.effects["2;1"]());
	if (tmp.inf) if (tmp.inf.upgs.has("9;2")) eff = eff.add(INF_UPGS.effects["9;2"]());
	if (tmp.inf) if (tmp.inf.upgs.has("6;10")) eff = eff.mul(16)
	if (player.elementary.foam.unl && tmp.elm) eff = eff.mul(tmp.elm.qf.boost20)
	eff = softcap(eff, "P", rocketSoftcapStrength, 100, 2);
	eff = softcap(eff, "EP", rocketSoftcapStrength, 100000, 2) // pre-multi softcap
	if (tmp.inf) if (tmp.inf.stadium.completed("reality") && mltRewardActive(1)) eff = eff.mul(8);
	eff = softcap(eff, "E", rocketSoftcapStrength, 1e6) 
	return eff;
}

function getRocketGainMult() {
	let thisName = "Rocket Gain Multi"
	let eff
	let txt
	clearMultiList(thisName)
	showMultiList(thisName, player.rockets.gte(1))
	let rSS = getRocketSoftcapStrength()
	let mult = new ExpantaNum(1);
	if (tmp.ach[34].has)  { 
		mult = mult.mul(1.1);  
		setMultiList(thisName, "Achievement 34 Reward", `${showNum(1.1)}x`, `${showNum(mult)}`)
	}
	if (tmp.ach[15].has)  { 
		mult = mult.mul(1.05); 
		setMultiList(thisName, "Achievement 15 Reward", `${showNum(1.05)}x`, `${showNum(mult)}`)
	}
	if (tmp.ach[26].has)  { 
		mult = mult.mul(1.1);  
		setMultiList(thisName, "Achievement 26 Reward", `${showNum(1.1)}x`, `${showNum(mult)}`)
	}
	if (tmp.ach[44].has)  { 
		mult = mult.mul(1.15); 
		setMultiList(thisName, "Achievement 44 Reward", `${showNum(1.15)}x`, `${showNum(mult)}`)
	}
	if (tmp.ach[76].has)  { 
		mult = mult.mul(1.02); 
		setMultiList(thisName, "Achievement 76 Reward", `${showNum(1.02)}x`, `${showNum(mult)}`)
	}
	if (tmp.ach[131].has) { 
		mult = mult.mul(2);  
		setMultiList(thisName, "Achievement 131 Reward", `${showNum(2)}x`, `${showNum(mult)}`)  
	}
	if (modeActive("extreme") && player.rf.gt(0)) {
		eff = ExpantaNum.pow(2, player.furnace.upgrades[2].mul(tmp.fn ? tmp.fn.upgPow : 1))
		mult = mult.mul(eff);
		setMultiList(thisName, "Furnace Upgrade 3 Effect", `2^(${showNum(player.furnace.upgrades[2])} * ${showNum(tmp.fn ? tmp.fn.upgPow : 1)}) = ${showNum(eff)}x`, `${showNum(mult)}`)
	}
	if (player.rank.gt(100)) {
		mult = mult.mul(2);
		setMultiList(thisName, "Rank 100 Reward", `${showNum(2)}x`, `${showNum(mult)}`)  
	}
	if (player.tr.upgrades.includes(10) && !HCCBA("noTRU")) {
		eff = tr10Eff().max(1)
		mult = mult.mul(eff);
		txt = `1.1 ^ log(${showNum(player.tr.cubes.add(1))+((!player.rank.gt(7500) && player.tr.cubes.gte(1e100))?" dilated to the 1.25":"")})`
		setMultiList(thisName, "Time Reversal Upgrade 10", `${txt} = ${showNum(eff)}x`, `${showNum(mult)}`)  
	}
	if (player.tr.upgrades.includes(28) && !HCCBA("noTRU") && modeActive("extreme")) { 
		eff = TR_UPGS[28].current()
		mult = mult.mul(eff); 
		txt = Decimal.pow(20, player.furnace.coal.add(1e10).log10().log10().log10().add(1).root(5)).div(3)
		if (txt.lt(100)) {
			txt = `${showNum(Decimal.div(1, txt))}`
		} else {
			txt = `1 / ${showNum(txt)}`
		}
		setMultiList(thisName, "Time Reversal Upgrade 28", `${showNum(player.furnace.coal.add(1))} ^ ${txt} = ${showNum(eff)}x`, `${showNum(mult)}`)  
	}
	if (player.tr.upgrades.includes(29) && !HCCBA("noTRU") && modeActive("extreme")) { 
		eff = TR_UPGS[29].current()
		mult = mult.mul(eff); 
		setMultiList(thisName, "Time Reversal Upgrade 29", `log2(${showNum(player.rockets.add(1))}) ^ (1 + 4.5(log(1 + (log(${showNum(player.dc.fluid.add(1))}) / 2.3)))) = ${showNum(eff)}x`, `${showNum(mult)}`)  
	}
	if (hasCollapseMilestone(6)) {
		mult = mult.mul(10);
		setMultiList(thisName, "Collapse Milestone 6 Effect", `${showNum(10)}x`, `${showNum(mult)}`) 
	}
	if (hasCollapseMilestone(8)) {
		eff = collapseMile8Eff().max(1)
		mult = mult.mul(eff);
		setMultiList(thisName, "Collapse Milestone 8 Effect", `log2(${showNum((tmp.timeSpeed ? tmp.timeSpeed : new ExpantaNum(1)).add(1))}) = ${showNum(eff)}x`, `${showNum(mult)}`) 
	}
	if (tmp.pathogens && player.pathogens.unl) {
		eff = tmp.pathogens[2].eff().max(1)
		mult = mult.mul(eff);
		setMultiList(thisName, "Pathogen Upgrade 2 Effect", `${showNum(eff)}x`, `${showNum(mult)}`) 
	}
	if (tmp.dc) if (player.dc.unl) {
		eff = tmp.dc.dmEff.max(1)
		mult = mult.mul(eff);
		setMultiList(thisName, "Dark Matter Effect", `${showNum(eff)}x`, `${showNum(mult)}`) 
	}
	if (tmp.inf) {
		if (tmp.inf.upgs.has("1;2")) { 
			eff = INF_UPGS.effects["1;2"]().max(1)
			mult = mult.mul(eff);
			setMultiList(thisName, "Infinity Upgrade 1;2 Effect", `(1 + ${showNum(player.inf.knowledge)}) ^ ((1 + log(log${showNum(1e10)}(${showNum(1e10)} * (1 + ${showNum(player.inf.knowledge)})))) ^ 1.6) = ${showNum(eff)}x`, `${showNum(mult)}`) 
		}
		if (tmp.inf.upgs.has("4;8")) { 
			eff = player.collapse.lifeEssence.max(1)
			mult = mult.mul(eff);
			setMultiList(thisName, "Infinity Upgrade 4;8 Effect", `${showNum(eff)}x`, `${showNum(mult)}`) 
		}
		if (tmp.inf.upgs.has("9;8")) {
			let c = player.tr.cubes.max(1).pow(0.1);
			if (c.gte("1e100000")) c = softcap(c, "EP", rSS, "e100000", 5.675)
			eff = c.max(1)
			mult = mult.mul(eff);
			setMultiList(thisName, "Infinity Upgrade 9;8 Effect", `(${showNum(player.tr.cubes)} ^ 0.1) ${(c.gte("1e100000")?" dilated by 5.675":"")} = ${showNum(eff)}x`, `${showNum(mult)}`) 
		}
	}
	if (tmp.elm)
		if (player.elementary.times.gt(0)) {
			eff = tmp.elm.ferm.quarkR("up").max(1)
			mult = mult.mul(eff);
			setMultiList(thisName, "Up Quark Effect", `${showNum(eff)}x`, `${showNum(mult)}`)
		}
	if (mult.eq(0)) mult = new ExpantaNum(1)
	return mult
}

function updateTempRockets() {
	if (!tmp.rockets) tmp.rockets = {};
	tmp.rockets.lrm = new ExpantaNum(1);
	if (modeActive("hikers_dream")){
		if (modeActive("extreme")) tmp.rockets.lrm = new ExpantaNum(.1)
	} else {
		if (modeActive("hard")) tmp.rockets.lrm = tmp.rockets.lrm.mul(2);
		if (modeActive("extreme")) tmp.rockets.lrm = tmp.rockets.lrm.div(100);
	}
	tmp.rockets.sc = getRocketSoftcapStart();
	tmp.rockets.canRocket = player.distance.gte(ExpantaNum.mul(LAYER_REQS["rockets"][1], tmp.rockets.lrm));
	if (nerfActive("noRockets")) tmp.rockets.canRocket = false;
	tmp.rockets.layer = new Layer("rockets", tmp.rockets.canRocket, "normal");
	let mlt5 = mltActive(5);
	let r = player.rockets;
	if (mlt5) r = r.min(0);
	tmp.rockets.accPow = tmp.acc.add(1).log10().pow(getRocketEffect()).add(r).max(1);
	tmp.rockets.mvPow = tmp.maxVel.add(1).log10().pow(getRocketEffect()).add(r).max(1);
	tmp.rockets.accEnPow = tmp.accEn.add(1).log10().pow(getRocketEffect()).max(1);
	tmp.rockets.tsPow = tmp.inf?(tmp.inf.upgs.has("10;3")?(tmp.timeSpeed.add(1).log10().pow(getRocketEffect()).add(1)):new ExpantaNum(1)):new ExpantaNum(1)
	if (modeActive("extreme") && tmp.fn) tmp.rockets.clPow = tmp.fn.gain.add(1).log10().pow(getRocketEffect()).add(1);
	if (!tmp.rockets.onReset) tmp.rockets.onReset = function (prev) {
		if (modeActive('extreme')) if (tmp.ach[14].has) player.rankCheap = new ExpantaNum(1)
		tmp.inf.derv.resetDervs();
	};
}

const RC_TABBTN_SHOWN = {
	mrc: function() { return true },
	upgrc: function() { return tmp.ach[198].has },
}

function isRCTabShown(name) {
	return rcTab == name;
}

function getRCTabBtnsShown() {
	let btns = [];
	for (j = 0; j < Object.keys(RC_TABBTN_SHOWN).length; j++)
		if (Object.values(RC_TABBTN_SHOWN)[i]()) btns.push(Object.keys(RC_TABBTN_SHOWN)[i]);
	return btns;
}

function updateRCTabs() {
	var tabs = document.getElementsByClassName("rocketTab");
	for (i = 0; i < tabs.length; i++) {
		var el = new Element(tabs[i].id);
		el.setDisplay(isRCTabShown(tabs[i].id));
		var elT = new Element(tabs[i].id + "tabbtn");
		elT.changeStyle("visibility", getRCTabBtnsShown().includes(tabs[i].id)?"visible":"hidden");
	}
}

function showRocketsTab(name) {
	rcTab = name;
}