function scalingActive(name, amt, type) {
	amt = new ExpantaNum(amt);
	return amt.gte(getScalingStart(type, name));
}

function getScalingName(name, x=0) {
	let cap = Object.keys(SCALING_STARTS).length;
	let current = "";
	let amt = SCALING_RES[name](x);
	for (let n = cap - 1; n >= 0; n--) {
		if (scalingActive(name, amt, Object.keys(SCALING_STARTS)[n]))
			return capitalFirst(Object.keys(SCALING_STARTS)[n]) + " ";
	}
	return current;
}

function getScalingId(name, x=0) {
	let cap = Object.keys(SCALING_STARTS).length;
	let current = 0;
	let amt = SCALING_RES[name](x);
	for (let n = cap - 1; n >= 0; n--) {
		if (scalingActive(name, amt, Object.keys(SCALING_STARTS)[n]))
			return n + 1;
	}
	return current;
}

function getScalingStart(type, name) {
	let start = new ExpantaNum(SCALING_STARTS[type][name])
	if (name=="rank") {
		if (type=="scaled") {
			if (player.tr.upgrades.includes(11) && !HCCBA("noTRU")) start = start.plus(10)
			if (player.tr.upgrades.includes(15) && !HCCBA("noTRU")) start = start.plus(32)
			if (tmp.inf) if (tmp.inf.upgs.has("1;6")) start = start.plus(2)
			if (player.elementary.sky.unl && tmp.elm) start = start.plus(tmp.elm.sky.pionEff[1])
			if (nerfActive("scaledRank")) start = new ExpantaNum(1)
		} else if (type=="superscaled") {
			if (tmp.inf) if (tmp.inf.upgs.has("6;2")) start = start.plus(5)
			if (tmp.inf) if (tmp.inf.stadium.completed("solaris")) start = start.plus(STADIUM_REWARDS.effects.solaris())
			if (player.elementary.sky.unl && tmp.elm) start = start.plus(tmp.elm.sky.pionEff[1])
		} else if (type=="hyper") {
			if (hasMltMilestone(23) && player.mlt.active==0) start = start.plus(250);
			if (player.elementary.sky.unl && tmp.elm) start = start.plus(tmp.elm.sky.pionEff[1])
		} else if (type=="atomic") {
			if (player.elementary.bosons.scalar.higgs.upgrades.includes("0;0;5") && tmp.elm) start = start.plus(tmp.elm.bos["higgs_0;0;5"]())
			if (player.elementary.sky.unl && tmp.elm) start = start.plus(tmp.elm.sky.pionEff[1])
		}

	} else if (name=="rankCheap") {
		if (type=="scaled") {

		} else if (type=="superscaled") {

		} else if (type=="hyper") {

		}
		if (tmp.fn) if (tmp.fn.pl) if (tmp.fn.pl.unl) start = start.plus(tmp.fn.pl.boosts[4])
	} else if (name=="tier") {
		if (type=="scaled") {
			if (player.tr.upgrades.includes(12) && !HCCBA("noTRU")) start = start.plus(2)
			if (player.tr.upgrades.includes(14) && !HCCBA("noTRU")) start = start.plus(tr14Eff()["ss"])
			if (tmp.inf) if (tmp.inf.upgs.has("1;6")) start = start.plus(2)
			if (player.elementary.sky.unl && tmp.elm) start = start.plus(tmp.elm.sky.pionEff[1])
			if (nerfActive("scaledTier")) start = new ExpantaNum(1)
		} else if (type=="superscaled") {
			if (tmp.inf) if (tmp.inf.upgs.has("5;7")) start = start.plus(INF_UPGS.effects["5;7"]());
			if (player.elementary.sky.unl && tmp.elm) start = start.plus(tmp.elm.sky.pionEff[1])
		} else if (type=="hyper") {
			if (player.tier.gt(60)) start = start.add(tierEffects(60))
			if (player.elementary.sky.unl && tmp.elm) start = start.plus(tmp.elm.sky.pionEff[1])
		} else if (type=="atomic") {
			if (player.elementary.sky.unl && tmp.elm) start = start.plus(tmp.elm.sky.pionEff[1])
		}

	} else if (name=="rf") {
		if (type=="scaled") {
			if (player.dc.unl && tmp.dc) start = start.plus(tmp.dc.dfEff)
			if (tmp.inf) if (tmp.inf.upgs.has("6;1")) start = start.plus(10)
			if (nerfActive("scaledRF")) start = new ExpantaNum(1)
		} else if (type=="superscaled") {
			if (tmp.pathogens) start = start.plus(tmp.pathogens[11].eff())
			if (tmp.inf) if (tmp.inf.upgs.has("2;6")) start = start.plus(5)
		} else if (type=="hyper") {
			if (tmp.inf) if (tmp.inf.upgs.has("10;7")) start = start.plus(20)
			if (modeActive("extreme")) start = new ExpantaNum(1)
		} 
	} else if (name=="pathogenUpg") {
		if (type=="scaled") {
			if (tmp.inf) if (tmp.inf.upgs.has("4;5")) start = start.plus(2)
		} else if (type=="superscaled") {
			if (tmp.inf && mltRewardActive(1)) if (tmp.inf.stadium.completed("solaris")) start = start.plus(STADIUM_REWARDS.effects.solaris())
		} else if (type=="hyper") {
			if (player.elementary.entropy.upgrades.includes(4) && tmp.elm) start = start.plus(tmp.elm.entropy.upgEff[4])
		}
	} else if (name=="darkCore") {
		if (type=="scaled") {
			if (tmp.pathogens) start = start.plus(tmp.pathogens[12].eff())
			if (tmp.inf) if (tmp.inf.upgs.has("6;4")) start = start.plus(2)
		} else if (type=="superscaled") {
			if (tmp.inf) if (tmp.inf.upgs.has("2;10")) start = start.plus(5)
		}
	} else if (name=="endorsements") {
		if (type=="scaled") {
			if (tmp.ach) if (tmp.ach[108].has && modeActive("extreme")) start = start.plus(1)
			if (tmp.inf) if (tmp.inf.upgs.has("9;3")) start = start.plus(1)
			if (player.elementary.theory.tree.unl) start = start.plus(TREE_UPGS[7].effect(ExpantaNum.add(player.elementary.theory.tree.upgrades[7]||0, TREE_UPGS[11].effect(player.elementary.theory.tree.upgrades[11]||0))))
		} else if (type=="superscaled") {
			if (modeActive("extreme+hikers_dream")) {
				start = start.min(35)
				if (tmp.ach[153].has) start = start.plus(TREE_UPGS[7].effect(ExpantaNum.add(player.elementary.theory.tree.upgrades[7]||0, TREE_UPGS[11].effect(player.elementary.theory.tree.upgrades[11]||0))).div(10))
			}
			if (player.elementary.foam.unl && tmp.elm ? tmp.elm.qf : false) start = start.plus(tmp.elm.qf.boost10);
		}
	} else if (name=="enlightenments") {
		if (type=="scaled") {
			if (modeActive("extreme")) start = start.sub(4);
		}
	} else if (name=="dervBoost") {
		if (type=="superscaled") {
			if (player.elementary.entropy.upgrades.includes(32)) start = start.plus(2);
		}
	} else if (name=="photons") {
		if (type=="scaled") {
			if (player.rank.gt(1500)){
				start = start.add(rankEffects(1500))
			}
		}
	}
	
	if (type!=="utterlyFucked") {
		if (Object.values(SCALING_STARTS)[Object.keys(SCALING_STARTS).indexOf(type)+1][name]!==undefined) {
			start = start.min(getScalingStart(Object.keys(SCALING_STARTS)[Object.keys(SCALING_STARTS).indexOf(type)+1], name));
		}
	}
	return start
}

function getScalingPower(type, name) {
	let power = new ExpantaNum(1)
	if (name=="rank") {
		if (type=="scaled") {
			if (tmp.pathogens) power = power.times(ExpantaNum.sub(1, tmp.pathogens[14].eff()))
			if (tmp.inf) if (tmp.inf.upgs.has("4;3")) power = power.times(0.5)
			if (tmp.inf) if (tmp.inf.stadium.active("solaris", 4)) power = power.times(6)
			if (tmp.inf) if (tmp.inf.stadium.active("drigganiz", 4)) power = power.times(6)
			if (modeActive("extreme")) power = power.div(6)
		} else if (type=="superscaled") {
			if (tmp.pathogens) power = power.times(ExpantaNum.sub(1, tmp.pathogens[14].eff()))
			if (tmp.inf) if (tmp.inf.upgs.has("2;5")) power = power.times(0.95)
			if (tmp.inf) if (tmp.inf.upgs.has("9;6")) power = power.times(ExpantaNum.sub(1, INF_UPGS.effects["9;6"]()))
		} else if (type=="hyper") {
			if (tmp.inf) if (tmp.inf.upgs.has("8;6")) power = power.times(ExpantaNum.sub(1, INF_UPGS.effects["8;6"]()))
			if (tmp.inf) if (tmp.inf.upgs.has("7;9")) power = power.times(0.98)
		} else if (type=="atomic") {
			if (hasMltMilestone(15) && tmp.mlt) power = power.times(tmp.mlt.mil15reward)
		}
	} else if (name=="rankCheap" && modeActive("extreme")) {
		if (type=="scaled") {
			if (FCComp(3)) power = power.times(0.1)
		} else if (type=="superscaled") {
			if (extremeStadiumComplete("flamis")) power = power.times(0.1)
		}
	} else if (name=="tier") {
		if (type=="scaled") {
			if (tmp.inf) if (tmp.inf.upgs.has("1;5")) power = power.times(0.8)
			if (tmp.inf) if (tmp.inf.upgs.has("2;7")) power = power.times(ExpantaNum.sub(1, INF_UPGS.effects["2;7"]()))
			if (tmp.inf) if (tmp.inf.stadium.active("eternity", 4)) power = power.times(6)
			if (tmp.inf) if (tmp.inf.stadium.active("drigganiz", 4)) power = power.times(6)
		} else if (type=="superscaled") {
			if (tmp.inf) if (tmp.inf.upgs.has("9;6")) power = power.times(ExpantaNum.sub(1, INF_UPGS.effects["9;6"]()))
		} else if (type=="hyper") {
			if (tmp.inf) if (tmp.inf.upgs.has("1;10")) power = power.times(ExpantaNum.sub(1, INF_UPGS.effects["1;10"]()))
		}
	} else if (name=="rf") {
		if (type=="scaled") {
			if (tmp.inf) if (tmp.inf.upgs.has("3;5")) power = power.times(0.75)
		} else if (type=="superscaled") {
			if (player.elementary.theory.tree.unl) power = power.times(ExpantaNum.sub(1, TREE_UPGS[8].effect(player.elementary.theory.tree.upgrades[8]||0))).max(0)
		} else if (type=="hyper") {

		} else if (type=="atomic") {
			if (player.tier.gte(85)) power = power.div(tierEffects(85))
			if (player.rank.gte(2500)) power = power.div(rankEffects(2500))
		}
	} else if (name=="fn" && modeActive("extreme")) {
		if (type == "scaled"){
			if (modeActive("hikers_dream")){
				let a = Math.max(player.achievements.length - 74, 20)
				if (a >= 22) a += 10
				if (tmp.ach) if (tmp.ach[124].has) power = power.times(20 / a)
			}
			if (player.tier.gt(120)) power = power.div(tierEffects(120))
		} else if (type=="superscaled") {
			if (FCComp(1)) power = power.times(0.1)
			if (player.tier.gt(120)) power = power.div(tierEffects(120))
		} else if (type=="hyper") {
			if (FCComp(1)) power = power.times(0.1)
			if (player.tier.gt(120)) power = power.div(tierEffects(120))
			if (inFC(3)) power = new ExpantaNum(99.99)
		}
	} else if (name=="pathogenUpg") {
		if (type=="scaled") {
			if (tmp.inf) if (tmp.inf.stadium.active("infinity", 4)) power = power.times(6)
			if (tmp.inf) if (tmp.inf.upgs.has("8;7")) power = power.times(0.16)
		} else if (type=="superscaled") {
			if (tmp.inf) if (tmp.inf.upgs.has("10;1")) power = power.times(ExpantaNum.sub(1, INF_UPGS.effects["10;1"]("pth")))
		} else if (type=="hyper") {
			if (tmp.ach[185].has) power = power.mul(0.9); // sub by 0.1 might cause issues
			if (player.rank.gte(4e4)) power = power.div(rankEffects(4e4))
		}
	} else if (name=="darkCore") {
		if (type=="scaled") {
			if (tmp.inf) if (tmp.inf.upgs.has("8;6")) power = power.times(ExpantaNum.sub(1, INF_UPGS.effects["8;6"]()))
		} else if (type=="hyper") {
			if (!modeActive("extreme")&&!modeActive("hikers_dream")) power = power.div(25.5)
			if (player.tier.gt(100)) power = power.div(tierEffects(100))
		}
	} else if (name=="endorsements") {
		if (type=="scaled") {
			if (tmp.pathogens) power = power.times(ExpantaNum.sub(1, tmp.pathogens[15].eff()))
		}
	} else if (name=="dervBoost") {
		if (type=="scaled") {
			if (player.tier.gt(100)) power = power.div(tierEffects(100))
		}
	} else if (name=="enlightenments") {
		if (type=="scaled") {
			if (player.rank.gte(2000)) power = power.div(rankEffects(2000))
		} else if (type=="superscaled") {
			if (player.rank.gte(2000)) power = power.div(rankEffects(2000).root(2))
		}
	} else if (name=="efn") {
		if (type=="scaled") {
			if (player.tier.gt(120)) power = power.div(tierEffects(120))
		} else if (type=="superscaled") {
			if (player.tier.gt(120)) power = power.div(tierEffects(120))
		} else if (type=="hyper") {
			if (player.tier.gt(120)) power = power.div(tierEffects(120))
		}
	} else if (name=="bf") {
		if (type=="scaled") {
			if (player.tier.gt(120)) power = power.div(tierEffects(120))
		} else if (type=="superscaled") {
			if (player.tier.gt(120)) power = power.div(tierEffects(120))
		} else if (type=="hyper") {
			if (player.tier.gt(120)) power = power.div(tierEffects(120))
		}
	}
	if (type=="hyper"&&name!="darkCore"&&power.lte(0.5)) power = ExpantaNum.div(1, softcap(ExpantaNum.div(1, power.max(1e-12)), "EP", 1, 2)).max(0.05)
	if (type=="supercritical"&&power.lte(2/3)) power = ExpantaNum.div(1, softcap(ExpantaNum.div(1, power.max(1e-12)), "EP", 1, 1.5, 3)).max(0.25)
	return power
}

function getScalingPowerDisplay(type,name) {
	if (!modeActive("extreme")&&!modeActive("hikers_dream")&&name=="darkCore"&&type=="hyper") return getScalingPower(type,name).times(25.5);
	return getScalingPower(type,name)
}