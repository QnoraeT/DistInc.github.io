function getCadaverEffSoftcapStart() {
	let sc = new ExpantaNum(1e12);
	if (modeActive("hard")) sc = sc.div(100);
	if (modeActive("easy")) sc = sc.mul(80);
	if (tmp.pathogens && player.pathogens.unl) sc = sc.mul(tmp.pathogens[10].eff());
	if (tmp.inf) sc = sc.mul(tmp.inf.asc.perkEff(3));
	return sc;
}

function getCadaverEffSoftcapPower() {
	let pow = new ExpantaNum(1);
	if (tmp.inf) if (tmp.inf.upgs.has("8;5")) pow = pow.mul(0.36);
	return pow;
}

function getCadaverEff() {
	let thisName = "Cadaver Effect"
	let eff
	let p
	let txt
	clearMultiList(thisName)
	showMultiList(thisName, player.collapse.unl)
	let scs = getCadaverEffSoftcapStart()
	let scp = getCadaverEffSoftcapPower()
	eff = ExpantaNum.log10(player.rank.plus(player.tier.mul(5)).plus(player.collapse.cadavers).plus(1))
		.pow(player.collapse.cadavers.plus(1).logBase(2).pow(0.81))
		.plus(player.collapse.cadavers.sqrt());
	txt = `sqrt(${showNum(player.collapse.cadavers)}) + log(`
	if (player.collapse.cadavers.lt(10000)) {
		txt += `${showNum(player.rank)} + 5(${showNum(player.tier)}) + ${showNum(player.collapse.cadavers.add(1))}) ^ `
	} else {
		txt += `${showNum(player.collapse.cadavers.add(1))}) ^ `
	}
	txt += `(log2(${showNum(player.collapse.cadavers.add(1))})^0.81)`
	setMultiList(thisName, "Base Effect", `${txt} = ${showNum(eff)}`, `${showNum(eff)}x`)
	if (eff.gte(scs) && scp.gt(0)) {
		p = eff
		eff = softcap(eff, "EP", scp, scs, 4)
		setMultiList(thisName, "Harsh Softcap 1", `${showNum(p)} at ${showNum(scs)} is raised to ^${showNum(eff.log(p))} with ${showNum(Decimal.mul(100, scp))}% power`, `${showNum(eff)}`)
	}
	if (tmp.elm.ferm.leptonR("muon").gt(1)) {
		p = tmp.elm && player.elementary.times.gt(0) ? tmp.elm.ferm.leptonR("muon") : 1
		eff = eff.pow(p);
		setMultiList(thisName, "Muon Lepton Effect", `^${showNum(p)}`, `${showNum(eff)}`) 
	}
	if (player.elementary.sky.unl && tmp.elm) {
		p = tmp.elm.sky.pionEff[4]
		eff = eff.pow(p)
		setMultiList(thisName, "Pion Upgrade 4 Effect", `^${showNum(p)}`, `${showNum(eff)}`) 
	}
	if (player.elementary.sky.unl && tmp.elm) {
		p = tmp.elm.sky.pionEff[12]
		eff = eff.pow(p)
		setMultiList(thisName, "Pion Upgrade 12 Effect", `^${showNum(p)}`, `${showNum(eff)}`) 
	}
	if (player.elementary.entropy.upgrades.includes(35) && modeActive("extreme")) {
		eff = eff.pow(100);
		setMultiList(thisName, "Entropy Upgrade 35 Effect", `^${showNum(100)}`, `${showNum(eff)}`) 
	}
	if (eff.gte("ee13")) {
		p = eff
		eff = Decimal.pow(10, softcap(eff.log(10), "EP", 1, 1e13, 5.25))
		setMultiList(thisName, "Harsh Softcap 2", `${showNum(p)} at ${showNum("ee13")} is silated by ^${showNum(eff.log(p))} with ${showNum(100)}% power`, `${showNum(eff)}`)
	}
	return eff;
}

function getLifeEssenceAmt() {
	let cLEGain = player.collapse.cadavers.mul(tmp.collapse.sacEff).div(4).max(1)
	if (cLEGain.gte("ee12")) cLEGain = Decimal.pow(10, Decimal.pow(10, softcap(cLEGain.log(10).log(10), "EP", 1, 12, 1.25)))// quadlog ^0.8 softcap after ee12
	return cLEGain
}

function sacrificeToLifeEssence() {
	if (player.collapse.cadavers.eq(0) || nerfActive("noLifeEssence")) return;
	player.collapse.lifeEssence = player.collapse.lifeEssence.plus(getLifeEssenceAmt());
	if (tmp.inf ? !tmp.inf.upgs.has("2;4") : true) player.collapse.cadavers = new ExpantaNum(0);
}

function hasCollapseMilestone(n) {
	return player.collapse.lifeEssence.gte(ESSENCE_MILESTONES[n].req);
}

function calcCollapseSCS(){
	tmp.collapse.sc = new ExpantaNum(LAYER_SC["collapse"]);
	if (tmp.pathogens && player.pathogens.unl) tmp.collapse.sc = tmp.collapse.sc.mul(tmp.pathogens[9].eff());
	if (tmp.inf) tmp.collapse.sc = tmp.collapse.sc.mul(tmp.inf.asc.perkEff(4));
}

function calcCollapseSacEff(){
	tmp.collapse.sacEff = new ExpantaNum(1);
	if (modeActive("hard")) tmp.collapse.sacEff = tmp.collapse.sacEff.div(1.4);
	if (modeActive("easy")) tmp.collapse.sacEff = tmp.collapse.sacEff.mul(1.6);
	if (tmp.pathogens && player.pathogens.unl) tmp.collapse.sacEff = tmp.collapse.sacEff.mul(tmp.pathogens[6].eff());
}

function updateTempCollapse() {
	if (!tmp.collapse) {
		tmp.collapse = {};
		tmp.collapse.onReset = function (prev) {
			if (hasCollapseMilestone(3)) player.rockets = new ExpantaNum(10);
			if (hasCollapseMilestone(4)) player.rf = new ExpantaNum(1);
			if (hasCollapseMilestone(7)) player.tr.upgrades = prev.tr.upgrades;
			tmp.inf.derv.resetDervs();
		};
	}
	calcCollapseSCS()
	tmp.collapse.lrm = new ExpantaNum(1);
	if (modeActive("hard")) tmp.collapse.lrm = tmp.collapse.lrm.div(50);
	tmp.collapse.can = player.distance.gte(ExpantaNum.mul(LAYER_REQS["collapse"][1], tmp.collapse.lrm));
	if (nerfActive("noCadavers")) tmp.collapse.can = false;
	tmp.collapse.layer = new Layer("collapse", tmp.collapse.can, "normal", true);
	tmp.collapse.doGain = function () {
		player.collapse.cadavers = player.collapse.cadavers.plus(tmp.collapse.layer.gain);
	};
	calcCollapseSacEff()
}

function collapseMile1Eff() {
	return new ExpantaNum(100).div(player.distance.plus(1).pow(0.06989).plus(1).min(50))
}

function collapseMile5Eff() {
	let eff = player.tr.cubes.plus(1).log10().plus(1).log10().plus(1);
	return eff
}

function collapseMile8Eff() {
	let eff = (tmp.timeSpeed ? tmp.timeSpeed : new ExpantaNum(1)).plus(1).logBase(2).max(1);
	return eff
}

function collapseMile10Eff() {
	let exp = (modeActive("extreme"))?3:8
	let eff = player.collapse.lifeEssence.plus(1).log10().plus(1).sqrt().pow(exp);
	if (eff.gte(40)) eff = softcap(eff, "E", 1, 40)
	if (hasDE(5)) if ((player.elementary.theory.tree.upgrades[27]||new ExpantaNum(0)).gte(1)) {
		eff = player.collapse.lifeEssence.plus(1).root(player.collapse.lifeEssence.plus(1).log(10).add(1).log(10).pow(1.5).add(1))
	}
	return eff
}

function getCadaverGainMult() {
	let thisName = "Cadaver Gain Multi"
	let eff
	let txt
	clearMultiList(thisName)
	showMultiList(thisName, player.collapse.unl)
	let mult = new ExpantaNum(1);
	setMultiList(thisName, "Base Gain", `${showNum(1)}x`, `${showNum(mult)}`)
	if (hasCollapseMilestone(5))  { 
		eff = collapseMile5Eff()
		mult = mult.mul(eff);  
		setMultiList(thisName, "Collapse Milestone 5", `1 + log[2](${showNum(player.tr.cubes.add(1))}) = ${showNum(eff)}x`, `${showNum(mult)}`)
	}
	if (hasCollapseMilestone(10)) { 
		eff = collapseMile10Eff()
		mult = mult.mul(eff); 
		if (hasDE(5) && (player.elementary.theory.tree.upgrades[27]||new ExpantaNum(0)).gte(1)) {
			eff = player.collapse.lifeEssence.plus(1).root(player.collapse.lifeEssence.plus(1).log(10).add(1).log(10).pow(1.5).add(1))
			txt = `(${showNum(player.collapse.lifeEssence.add(1))}) ^ (1 / (1 + (log[2](${showNum(player.collapse.lifeEssence.add(1))})) ^ 1.5))`
		} else {
			txt = `(1 + log(${showNum(player.collapse.lifeEssence.add(1))})) ^ ${showNum((modeActive("extreme"))?1.5:4)}`
			if (eff.gte(40)) {
				txt = `log40(${txt}) ^ ${showNum(5.643856189774724)}`
			} 
		}
		setMultiList(thisName, "Collapse Milestone 10", `${txt} = ${showNum(eff)}x`, `${showNum(mult)}`)
	}
	if (tmp.ach[38].has)  { 
		mult = mult.mul(2);   
		setMultiList(thisName, "Achievement 38 Reward", `${showNum(2)}x`, `${showNum(mult)}`)
	}
	if (tmp.ach[65].has)  { 
		mult = mult.mul(1.4); 
		setMultiList(thisName, "Achievement 65 Reward", `${showNum(1.4)}x`, `${showNum(mult)}`)
	}
	if (tmp.ach[131].has) { 
		mult = mult.mul(2);   
		setMultiList(thisName, "Achievement 131 Reward", `${showNum(2)}x`, `${showNum(mult)}`)
	}
	if (player.tr.upgrades.includes(14) && !HCCBA("noTRU")) {
		eff = tr14Eff()["cd"]
		mult = mult.mul(eff);
		if (player.rank.gt(7500)) {
			txt = `2 ^ (${showNum(player.tier.add(1))} ^ (2 * sqrt(${showNum(player.rank)} / 7500)))`
			if (eff.gte("ee11")) {
				txt += ` dilated by 6.5`
			}
		} else {
			txt = `${showNum(player.tier.add(1))} ^ 1.25`
		}
		setMultiList(thisName, "Time Reversal Upgrade 14", `${txt} = ${showNum(eff)}x`, `${showNum(mult)}`)
	}
	if (tmp.inf) if (tmp.inf.upgs.has("3;2")) {
		eff = INF_UPGS.effects["3;2"]()["cadavers"]
		mult = mult.mul(eff);
		txt = `${showNum(player.inf.knowledge.add(1))} ^ (`
		if (tmp.inf) if (tmp.inf.upgs.has("7;4")) {
			txt += `sqrt(1 + 64(log[2](${showNum(player.pathogens.amount.add(10).mul(1e9))}) - 1)) * `
		}
		txt += `log[3](${showNum(player.inf.knowledge.add(1))}))`
		setMultiList(thisName, "Infinity Upgrade 3;2", `${txt} = ${showNum(eff)}x`, `${showNum(mult)}`)
	}
	if (tmp.collapse) if (modeActive("extreme") && (tmp.collapse.layer.gain.gte(10) || (tmp.clghm && tmp.collapse.layer.gain.gte(5)))) {
		mult = mult.div(2);
		tmp.clghm = true;
		setMultiList(thisName, "I honestly don't know what this is.", `${showNum(0.5)}x`, `${showNum(mult)}`)
	}
	if (modeActive("extreme") && FCComp(5)) {
		eff = ExpantaNum.pow(2, player.furnace.upgrades[4].mul(tmp.fn ? tmp.fn.upgPow : 1))
		mult = mult.mul(eff)
		setMultiList(thisName, "Furnace Upgrade 5 Effect", `2^(${showNum(player.furnace.upgrades[4])} * ${showNum(tmp.fn ? tmp.fn.upgPow : 1)}) = ${showNum(eff)}x`, `${showNum(mult)}`)
	}
	if (tmp.ach[68].has && modeActive("extreme")) {
		mult = mult.mul(5);
		setMultiList(thisName, "Achievement 68 Reward", `${showNum(5)}x`, `${showNum(mult)}`)
	}
	if (tmp.collapse) if (modeActive("easy")) {
		mult = mult.mul(3);
		setMultiList(thisName, "Easy Mode Buff", `${showNum(3)}x`, `${showNum(mult)}`)
	}
	if (tmp.elm) if (player.elementary.times.gt(0)) {
		if (tmp.elm.ferm.quarkR("down").gt(1)) {
			eff = tmp.elm.ferm.quarkR("down")
			mult = mult.mul(eff);
			setMultiList(thisName, "Down Quark Effect", `${showNum(eff)}x`, `${showNum(mult)}`)
		}
	}
	return mult
}