function updatePathogensGain() {
	let thisName = "Pathogens"
	let eff
	let softcapPow = player.rank.gt(70000) ? 0.3 : 1
	clearMultiList(thisName)
	showMultiList(thisName, player.pathogens.unl)
	tmp.pathogens.gainLEpart = player.collapse.lifeEssence.add(1).log10().add(1).pow(0.1).sub(1);
	tmp.pathogens.gainPTHpart = player.pathogens.amount.add(1).log10().add(1);
	tmp.pathogens.gain = tmp.pathogens.gainLEpart.mul(tmp.pathogens.gainPTHpart).sqrt();
	setMultiList(thisName, "Base Gain", `(((1 + log(${showNum(player.collapse.lifeEssence.add(1))}))^0.1 - 1) * (1 + log(${showNum(player.pathogens.amount.add(1))}))) ^ 0.5`, `${showNum(tmp.pathogens.gain)}`)
	tmp.pathogens.baseGain = new ExpantaNum(tmp.pathogens.gain); // what why
	if (tmp.ach) if (tmp.ach[63].has) {
		eff = ach63Eff()
		tmp.pathogens.gain = tmp.pathogens.gain.mul(eff);
		setMultiList(thisName, "Achievement 63 Reward", `${showNum(eff)}x`, `${showNum(tmp.pathogens.gain)}`)
	}
	if (tmp.ach) if (tmp.ach[68].has) {
		eff = new Decimal(2.5)
		if (modeActive("hard+hikers_dream")) {
			eff = eff.mul(tmp.hd.enerUpgs[3])
		}
		tmp.pathogens.gain = tmp.pathogens.gain.mul(eff);
		setMultiList(thisName, "Achievement 68 Reward", `${showNum(eff)}x`, `${showNum(tmp.pathogens.gain)}`)
	}
	if (tmp.ach[84].has) {
		let a84 = tmp.dc ? tmp.dc.flow.max(1) : new ExpantaNum(1);
		if (a84.gte(50)) {
			a84 = softcap(a84, "EP", softcapPow, 50, 2.5);
		}
		tmp.pathogens.gain = tmp.pathogens.gain.mul(a84);
		if (a84.gte(50)) {
			setMultiList(thisName, "Achievement 84 Reward", `${showNum(tmp.dc.flow.max(1))} dilated by 2.5 = ${showNum(a84)}x`, `${showNum(tmp.pathogens.gain)}`)
		} else {
			setMultiList(thisName, "Achievement 84 Reward", `${showNum(a84)}x`, `${showNum(tmp.pathogens.gain)}`)
		}
	}
	if (tmp.ach[131].has) {
		tmp.pathogens.gain = tmp.pathogens.gain.mul(2);
		setMultiList(thisName, "Achievement 131 Reward", `${showNum(2)}x`, `${showNum(tmp.pathogens.gain)}`)
	}
	if (tmp.ach[87].has && modeActive("hard+hikers_dream")) {
		eff = [tmp.pathogens.gain, ""]
		let x = player.tr.cubes.div("1e750").pow(.2).add(1)
		if (x.gte(100)) x = softcap(x, "EP", softcapPow, 100, 3.5)
		tmp.pathogens.gain = tmp.pathogens.gain.mul(x)
		if (x.gte(100)) {
			eff[1] = `((${showNum(player.tr.cubes)} / ${showNum("e750")}) ^ 0.2 + 1) dilate 3.5 * `
		} else {
			eff[1] = `((${showNum(player.tr.cubes)} / ${showNum("e750")}) ^ 0.2 + 1) * `
		}
		let x2 = player.tr.cubes.div("1e800").pow(.2).add(1).min(1e3)
		if (x2.eq(1000)) {
			eff[1] += showNum(1000)
		} else {
			eff[1] += `(${showNum(player.tr.cubes)} / ${showNum("e800")}) ^ 0.2 + 1)`
		}
		tmp.pathogens.gain = tmp.pathogens.gain.mul(x2)
		setMultiList(thisName, "Achievement 87 Reward", `${eff[1]} = ${showNum(tmp.pathogens.gain.div(eff[0]))}x`, `${showNum(tmp.pathogens.gain)}`)
	}
	if (modeActive("hard")) {
		tmp.pathogens.gain = tmp.pathogens.gain.div(3);
		setMultiList(thisName, "Hard Mode Nerf", `${showNum(1/3)}x`, `${showNum(tmp.pathogens.gain)}`)
	}
	if (modeActive("easy")) {
		tmp.pathogens.gain = tmp.pathogens.gain.mul(2.4);
		setMultiList(thisName, "Easy Mode Buff", `${showNum(2.4)}x`, `${showNum(tmp.pathogens.gain)}`)
	}
	tmp.pathogens.gain = tmp.pathogens.gain.mul(pathogenUpg5Eff());
	setMultiList(thisName, "Pathogen Upgrade 5 Effect", `${showNum(pathogenUpg5Eff())}x`, `${showNum(tmp.pathogens.gain)}`)
	if (player.tr.upgrades.includes(25) && modeActive("extreme")) {
		tmp.pathogens.gain = tmp.pathogens.gain.mul(5)
		setMultiList(thisName, "Time Reversal Upgrade 25 Effect", `${showNum(5)}x`, `${showNum(tmp.pathogens.gain)}`)
	}
	if (tmp.elm) {		
		if (player.elementary.times.gt(0)) {
			eff = tmp.elm.ferm.quarkR("strange").max(1)
			tmp.pathogens.gain = tmp.pathogens.gain.mul(eff);
			setMultiList(thisName, "Strange Quark Effect", `${showNum(eff)}x`, `${showNum(tmp.pathogens.gain)}`)
		}
		if (player.elementary.times.gt(0)) {
			eff = tmp.elm.bos.photonEff(1).max(1)
			tmp.pathogens.gain = tmp.pathogens.gain.mul(eff);
			setMultiList(thisName, "Photon Upgrade 1 Effect", `${showNum(eff)}x`, `${showNum(tmp.pathogens.gain)}`)
		}
	}
	if (tmp.inf) {
		if (tmp.inf.upgs.has("5;10")) {
			eff = INF_UPGS.effects["5;10"]().pth
			tmp.pathogens.gain = tmp.pathogens.gain.mul(eff)
			setMultiList(thisName, "Infinity Upgrade 5;10 Effect", `${showNum(eff)}x`, `${showNum(tmp.pathogens.gain)}`)
		}
		if (tmp.inf.upgs.has("10;5")) {
			eff = INF_UPGS.effects["10;5"]()
			tmp.pathogens.gain = tmp.pathogens.gain.mul(eff)
			setMultiList(thisName, "Infinity Upgrade 10;5 Effect", `${showNum(eff)}x`, `${showNum(tmp.pathogens.gain)}`)
		}
		if (tmp.inf.upgs.has("10;10")) {
			eff = INF_UPGS.effects["10;10"]()
			tmp.pathogens.gain = tmp.pathogens.gain.mul(eff)
			setMultiList(thisName, "Infinity Upgrade 10;10 Effect", `${showNum(eff)}x`, `${showNum(tmp.pathogens.gain)}`)
		}
	}
	if (tmp.fn && modeActive("extreme")) {
		if (Decimal.gt(tmp.fn.enh.moltBrEff || 1, 1)) {
			eff = tmp.fn.enh.moltBrEff || 1
			tmp.pathogens.gain = tmp.pathogens.gain.mul(eff)
			setMultiList(thisName, "Molten Brick Effect", `${showNum(eff)}x`, `${showNum(tmp.pathogens.gain)}`)
		}
	}
	if (player.elementary.foam.unl && tmp.elm) {
		if (tmp.elm.qf.boost24.gt(1)) {
			eff = tmp.elm.qf.boost24
			tmp.pathogens.gain = tmp.pathogens.gain.mul(eff)
			setMultiList(thisName, "Quantum Foam Boost 24 Effect", `${showNum(eff)}x`, `${showNum(tmp.pathogens.gain)}`)
		}
	}
}

function nonFreePathogenStrength() {
	let ret = new ExpantaNum(1)
	if (player.tier.gt(80)) ret = ret.mul(20)
	if (player.tier.gt(200)) ret = ret.mul(100)
	return ret
}

function freePathogenStrength() {
	let ret = new ExpantaNum(1)
	return ret
}

function updateTempPathogens() {
	if (!tmp.pathogens) tmp.pathogens = {};
	let eff
	tmp.pathogens.lrm = new ExpantaNum(1);
	if (modeActive("hard")) tmp.pathogens.lrm = tmp.pathogens.lrm.div(5);
	if (modeActive("extreme")) tmp.pathogens.lrm = tmp.pathogens.lrm.mul(20);

	tmp.pathogens.upgPow = new ExpantaNum(1);
	let thisName = "Pathogen Upgrade Power"
	showMultiList(thisName, player.pathogens.unl)
	clearMultiList(thisName)
	if (player.tr.upgrades.includes(13) && !HCCBA("noTRU")) {
		eff = tr13Eff().max(0)
		tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(eff);
		setMultiList(thisName, "Time Reversal Upgrade 13", `+${showNum(eff.mul(100))}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)
	}
	if (modeActive("extreme") && player.tr.upgrades.includes(27) && !HCCBA("noTRU")) {
		eff = TR_UPGS[27].current()
		tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(eff);
		setMultiList(thisName, "Time Reversal Upgrade 27", `+${showNum(eff.mul(100))}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)
	}
	if (modeActive("hard")) {
		tmp.pathogens.upgPow = tmp.pathogens.upgPow.mul(0.98);
		setMultiList(thisName, "Hard Mode Nerf", `x${showNum(98)}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)
	}
	if (modeActive("easy")) {
		tmp.pathogens.upgPow = tmp.pathogens.upgPow.mul(1.089);
		setMultiList(thisName, "Easy Mode Buff", `x${showNum(108.9)}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)
	}
	if (tmp.dc) {
		if (tmp.dc.coreEff.gt(0)) {
			eff = tmp.dc.coreEff
			tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(eff);
			setMultiList(thisName, "Dark Core Effect", `+${showNum(eff.mul(100))}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)
		}
	}
	if (modeActive('extreme')) {
		tmp.pathogens.upgPow = tmp.pathogens.upgPow.mul(0.8);
		setMultiList(thisName, "Extreme Mode Nerf", `x${showNum(80)}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)
	}
	if (tmp.inf) {
		if (tmp.inf.upgs.has("3;3")) {
			tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(0.1);
			setMultiList(thisName, "Infinity Upgrade 3;3 Effect", `+${showNum(10)}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)
		}
		if (tmp.inf.upgs.has("5;2")) {
			tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(0.05);
			setMultiList(thisName, "Infinity Upgrade 5;2 Effect", `+${showNum(5)}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)
		}
		if (tmp.inf.upgs.has("6;3")) {
			tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(0.025);
			setMultiList(thisName, "Infinity Upgrade 6;3 Effect", `+${showNum(2.5)}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)
		}
		if (tmp.inf.upgs.has("9;5")) {
			eff = ExpantaNum.mul(0.01, player.inf.endorsements)
			tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(eff);
			setMultiList(thisName, "Infinity Upgrade 9;5 Effect", `+${showNum(eff.mul(100))}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)
		}
		if (tmp.inf.upgs.has("9;10")) {
			eff = INF_UPGS.effects["9;10"]().sub(1).max(0)
			tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(eff)
			setMultiList(thisName, "Infinity Upgrade 9;10 Effect", `+${showNum(eff.mul(100))}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)
		}
		if (tmp.inf.stadium.completed("drigganiz")) {
			eff = STADIUM_REWARDS.effects.drigganiz()
			tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(eff);
			setMultiList(thisName, "Drigganiz's Completion Effect", `+${showNum(eff.mul(100))}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)
		}
	}
	if (tmp.ach) if (tmp.ach[125].has) {
		tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(0.05);
		setMultiList(thisName, "Achievement 125 Reward", `+${showNum(5)}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)
	}
	if (extremeStadiumComplete("quantron")) {
		eff = EXTREME_STADIUM_DATA.quantron.effect()
		tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(eff);
		setMultiList(thisName, "Quantron's Completion Effect", `+${showNum(eff.mul(100))}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)
	}
	if (tmp.elm)
		if (player.elementary.times.gt(0) && tmp.elm.ferm.leptonR("netrion").gt(0)) {
			eff = tmp.elm.ferm.leptonR("netrion")
			tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(eff);
			setMultiList(thisName, "Neutrino Lepton Effect", `+${showNum(eff.mul(100))}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)
		}

	if (player.elementary.theory.tree.unl) {
		eff = TREE_UPGS[13].effect(player.elementary.theory.tree.upgrades[13] || 0)
		tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(eff)
		setMultiList(thisName, "Neutrino Lepton Effect", `+${showNum(eff.mul(100))}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)
	}
	if (hasDE(5)) if ((player.elementary.theory.tree.upgrades[25] || new ExpantaNum(0)).gte(1)) {
		tmp.pathogens.upgPow = tmp.pathogens.upgPow.add(1.5)
		setMultiList(thisName, "Theory Tree 25 Effect", `+${showNum(150)}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)
	}
	if (extremeStadiumActive("aqualon", 3)) { 
		eff = player.rank.add(1).pow(0.05).mul(1.01)
		tmp.pathogens.upgPow = tmp.pathogens.upgPow.div(eff) 
		setMultiList(thisName, "Aqualon Difficulty 3 Nerf", `1 / (1.01 * (1 + ${showNum(player.rank)}) ^ 0.05) = x${showNum(Decimal.div(100, eff))}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)
	}
	if (extremeStadiumActive("cranius", 4)) { 
		eff = player.tier.add(1).pow(0.1).mul(1.02)
		tmp.pathogens.upgPow = tmp.pathogens.upgPow.div(eff)  
		setMultiList(thisName, "Cranius Difficulty 4 Nerf", `1 / (1.02 * (1 + ${showNum(player.rank)}) ^ 0.1) = x${showNum(Decimal.div(100, eff))}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)
	}
	if (nerfActive("weakPathogenUpgs"))     { 
		tmp.pathogens.upgPow = tmp.pathogens.upgPow.div(10);  
		setMultiList(thisName, "Weakened Pathogen Upgrades", `x${showNum(10)}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)
	}
	if (extremeStadiumActive("flamis", 3))  { 
		tmp.pathogens.upgPow = tmp.pathogens.upgPow.div(2); 
		setMultiList(thisName, "Flamis Difficulty 3 Nerf", `x${showNum(50)}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)  
	}
	if (extremeStadiumActive("nullum", 3))  { 
		tmp.pathogens.upgPow = tmp.pathogens.upgPow.mul(0.8); 
		setMultiList(thisName, "Nullum Difficulty 3 Nerf", `x${showNum(80)}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)  
	}
	if (extremeStadiumActive("quantron"))   { 
		tmp.pathogens.upgPow = tmp.pathogens.upgPow.mul(0.9); 
		setMultiList(thisName, "Quantron Difficulty 1 Nerf", `x${showNum(90)}%`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)  
	}
	if (nerfActive("noPathogenUpgs")) tmp.pathogens.upgPow = new ExpantaNum(0);
	if (tmp.pathogens.upgPow.gte(10)) {
		eff = [tmp.pathogens.upgPow, (player.rank.gt(22500)) ? 0.8 : 1]
		tmp.pathogens.upgPow = softcap(tmp.pathogens.upgPow, "P", eff[1], 10, 2)
		setMultiList(thisName, "Softcap 1", `${showNum(eff[0].mul(100))}% at ${showNum(1000)}% is divided by ${showNum(eff[0].div(tmp.pathogens.upgPow))} with ${showNum(Decimal.mul(100, eff[1]))}% power`, `${showNum(tmp.pathogens.upgPow.mul(100))}%`)
	}
	if (player.elementary.sky.unl && tmp.elm) tmp.pathogens.upgPow = tmp.pathogens.upgPow.mul(tmp.elm.sky.pionEff[2])


	if (!tmp.pathogens.extra) tmp.pathogens.extra = function (n) {
		let extra = new ExpantaNum(0);
		if (tmp.inf) if (tmp.inf.asc) extra = extra.add(tmp.inf.asc.perkEff(2));
		if (n == 5 && tmp.pathogens[13]) extra = extra.add(pathogenUpg13Eff());
		return extra;
	};
	if (!tmp.pathogens.buy) tmp.pathogens.buy = function (n, manual = false) {
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
		switch (n) {
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
				if (ret.gte(2e3) && !(tmp.elm ? tmp.elm.bos.hasHiggs("0;1;4") : false)) ret = softcap(ret, "P", 1, 2e3, 2);
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
				return player.dc.cores.add(1).log10().mul(bought).add(1);
			case 15:
				return bought.add(1).log10().add(1).pow(0.1);
		}
		throw new Error("amazing code right here y'all  [Pathogen UPG#" + n + "  doesn't exist]")
	};
	if (!tmp.pathogens.disp) tmp.pathogens.disp = function (n) {
		let eff = tmp.pathogens.eff(n);
		switch (n) {
			case 1:
			case 6:
				return "+" + showNum(eff.sub(1).mul(100)) + "%";
			case 2:
			case 3:
			case 4:
			case 5:
				return showNum(eff) + "x";
			case 7:
			case 9:
			case 10:
				return showNum(eff) + "x later";
			case 8:
			case 11:
			case 12:
				return showNum(eff) + " later";
			case 13:
				return "+" + showNum(eff) + " Levels";
			case 14:
			case 15:
				return showPerc(eff) + " weaker";
			default:
				return "???"
		}
	};
	for (let i = 1; i <= PTH_AMT; i++) {
		if (!tmp.pathogens[i]) tmp.pathogens[i] = {};
		let data = getPathogenUpgData(i);
		tmp.pathogens[i].cost = data.cost;
		tmp.pathogens[i].bulk = data.bulk;
		if (!tmp.pathogens[i].extra) tmp.pathogens[i].extra = function () { return tmp.pathogens.extra(i) }
		if (!tmp.pathogens[i].buy) tmp.pathogens[i].buy = function (manual = false) { tmp.pathogens.buy(i, manual) }
		if (!tmp.pathogens[i].eff) tmp.pathogens[i].eff = function () { return tmp.pathogens.eff(i) }
		if (!tmp.pathogens[i].disp) tmp.pathogens[i].disp = function () { return tmp.pathogens.disp(i) }
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
	return { cost: cost, bulk: bulk };
}

function getPathogenUpgSoftcapStart(x) {
	let sc = new ExpantaNum(PTH_UPG_SCS[x])
	if (tmp.inf) if (tmp.inf.upgs.has("3;6")) sc = sc.add(1);
	if (modeActive("hard")) {
		sc = modeActive("easy") ? sc : new ExpantaNum(modeActive("extreme") ? 1 : 2);
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