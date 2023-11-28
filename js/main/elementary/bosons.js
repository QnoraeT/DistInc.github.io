function updateGluonTabs() {
	if (!tmp.elm.bos.updateGluonTabs) tmp.elm.bos.updateGluonTabs = function () {
		let tabs = Element.allFromClass("gluontab");
		for (let i = 0; i < tabs.length; i++) tabs[i].setDisplay(gluonTab == tabs[i].id);
	};
	if (!tmp.elm.bos.showGluonTab) tmp.elm.bos.showGluonTab = function (name) {
		if (gluonTab == name) return;
		gluonTab = name;
		tmp.elm.bos.updateGluonTabs();
	};
	tmp.elm.bos.updateGluonTabs();
}

function updatePhotonsGain(gaugeSpeed){
	tmp.elm.bos.photonGain = gaugeSpeed;
	if (modeActive("extreme")) tmp.elm.bos.photonGain = tmp.elm.bos.photonGain.mul(Math.pow(player.elementary.bosons.scalar.higgs.upgrades.length+1, 1/3))
	if (modeActive("hikers_dream") && player.elementary.bosons.scalar.higgs.upgrades.includes("1;2;0")) tmp.elm.bos.photonGain = tmp.elm.bos.photonGain.mul(tmp.hd.superEn.add(1))
	if (tmp.lu3) tmp.elm.bos.photonGain = tmp.elm.bos.photonGain.mul(tmp.lu3.max(1))
	if (player.elementary.theory.supersymmetry.unl) tmp.elm.bos.photonGain = tmp.elm.bos.photonGain.mul(tmp.chEff||1)
}

function updatePhotonCosts() {
	tmp.elm.bos.photonCost = {
		1: ExpantaNum.pow(5, player.elementary.bosons.gauge.photons.upgrades[0].pow(2)).mul(25),
		2: ExpantaNum.pow(4, player.elementary.bosons.gauge.photons.upgrades[1].pow(2)).mul(40),
		3: ExpantaNum.pow(10, player.elementary.bosons.gauge.photons.upgrades[2]).mul(1e4),
		4: ExpantaNum.pow(2, new ExpantaNum(player.elementary.bosons.gauge.photons.upgrades[3]||0).pow(1.1).mul(ExpantaNum.pow(1.01, player.elementary.bosons.gauge.photons.upgrades[3]||0))).mul(6e4),
	};
	for (let i=1;i<=4;i++) {
		let scalPho
		scalPho = player.elementary.bosons.gauge.photons.upgrades[i-1]
		scalPho = doAllScaling(scalPho, "photons", false)
		switch(i){
			case 1:
				scalPho = ExpantaNum.pow(5, scalPho.pow(2)).mul(25)
				break;
			case 2:
				scalPho = ExpantaNum.pow(4, scalPho.pow(2)).mul(40)
				break;
			case 3:
				scalPho = ExpantaNum.pow(10, scalPho).mul(1e4)
				break;
			case 4:
				scalPho = ExpantaNum.pow(2, scalPho.pow(1.1).mul(ExpantaNum.pow(1.01, scalPho))).mul(6e4)
				break;
			default:
				throw new Error("what the hell? PH UPG#" + i + " doesn't exist")
		}
		tmp.elm.bos.photonCost[i] = scalPho
	}
}

function loadPhotonEffects() {
	if (!tmp.elm.bos.photonEff) tmp.elm.bos.photonEff = function (x) {
		let bought = player.elementary.bosons.gauge.photons.upgrades[x - 1]||new ExpantaNum(0);
		if (player.elementary.times.lt(1)) bought = new ExpantaNum(0);
		switch (x) {
			case 1:
				return Decimal.pow(10, bought.mul(10).add(bought.mul(bought.sub(1)).div(2)));
			case 2:
				return Decimal.pow(2, bought.pow(1.5));
			case 3:
				return ExpantaNum.pow(bought.mul(0.005).add(2), bought);
			case 4:
				return ExpantaNum.pow(bought.mul(0.001).add(2), bought);
			default:
				throw new Error(`Photon Upgrade ID ${x} doesn't exist!`)
		}
	};
}

function updateTempPhotons(gaugeSpeed) {
	updatePhotonsGain(gaugeSpeed)
	
	updatePhotonCosts()
	loadPhotonEffects()
	if (!tmp.elm.bos.buyLU) tmp.elm.bos.buyLU = function (x, max=false) {
		updatePhotonCosts();
		if (new ExpantaNum(player.elementary.bosons.gauge.photons.amount).lt(tmp.elm.bos.photonCost[x])) return;
		let target;
		if (max) {
			let scalPho = player.elementary.bosons.gauge.photons.amount
			switch(x) {
				case 1: 
					scalPho = scalPho.div(25).max(1).logBase(5).sqrt()
					break;
				case 2: 
					scalPho = scalPho.div(40).max(1).logBase(4).sqrt()
					break;
				case 3: 
					scalPho = scalPho.div(1e4).max(1).log10()
					break;
				case 4: 
					scalPho = scalPho.div(1875).ln().mul(1.4427).sub(5).pow(10/11).mul(0.00904576).lambertw().mul(110.549)
					break;
				default:
					throw new Error("what the hell? PH UPG#" + i + " doesn't exist")
			}
			scalPho = doAllScaling(scalPho, "photons", true)
			target = scalPho.add(1).floor()
		}
		if (!max) player.elementary.bosons.gauge.photons.amount = new ExpantaNum(
			player.elementary.bosons.gauge.photons.amount
		).sub(tmp.elm.bos.photonCost[x]).max(0);
		if (max) player.elementary.bosons.gauge.photons.upgrades[x - 1] = new ExpantaNum(player.elementary.bosons.gauge.photons.upgrades[x - 1]||0).max(target);
		else player.elementary.bosons.gauge.photons.upgrades[x - 1] = new ExpantaNum(player.elementary.bosons.gauge.photons.upgrades[x - 1]||0).add(1);
	};
}

function updateTempWZB(gaugeSpeed) {
	tmp.elm.bos.wg = gaugeSpeed.mul(0.4).mul(tmp.z1 || 1);
	if (player.elementary.foam.unl && tmp.elm.qf) tmp.elm.bos.wg = tmp.elm.bos.wg.mul(tmp.elm.qf.boost19)
	tmp.elm.bos.w1 = player.elementary.bosons.gauge.w.add(1).log10().div(10).add(1);
	if (player.inf.upgrades.includes("7;10")) tmp.elm.bos.w1 = player.elementary.bosons.gauge.w.add(1).pow(0.25).max(tmp.elm.bos.w1)
	tmp.elm.bos.w2 = player.elementary.bosons.gauge.w.add(1).pow(0.6);
	tmp.elm.bos.zg = gaugeSpeed.mul(0.1).mul(tmp.elm.bos.w1);
	if (player.elementary.foam.unl && tmp.elm.qf) tmp.elm.bos.zg = tmp.elm.bos.zg.mul(tmp.elm.qf.boost19)
	tmp.elm.bos.z1 = player.elementary.bosons.gauge.z.add(1).pow(0.2);
	tmp.elm.bos.z2 = player.elementary.bosons.gauge.z.add(1).pow(2);
}

function updateTempGluons(gaugeSpeed) {
	if (!tmp.elm.bos.updateTabs) tmp.elm.bos.updateTabs = function () {
		let tabs = Element.allFromClass("bostab");
		for (let i = 0; i < tabs.length; i++) tabs[i].setDisplay(bosTab == tabs[i].id);
	};
	if (!tmp.elm.bos.showTab) tmp.elm.bos.showTab = function (name) {
		if (bosTab == name) return;
		bosTab = name;
		tmp.elm.bos.updateTabs();
	};
	tmp.elm.bos.updateTabs();
	if (!tmp.elm.bos.gluonEff) tmp.elm.bos.gluonEff = function (col, x) {
		let bought = player.elementary.bosons.gauge.gluons[col].upgrades[x - 1]||new ExpantaNum(0);
		if (x == 1) return ExpantaNum.pow(2, bought.pow(1.3));
		else if (x==2) return ExpantaNum.pow(bought.mul(0.05).add(1.1), bought); 
		else return bought.mul(10)
	};
	tmp.elm.bos.rg = gaugeSpeed.div(2.5).mul(tmp.elm.bos.gluonEff("ar", 1)).mul(tmp.elm.bos.photonEff(3).max(1));
	tmp.elm.bos.gg = gaugeSpeed.div(2.6).mul(tmp.elm.bos.gluonEff("ag", 1)).mul(tmp.elm.bos.photonEff(3).max(1));
	tmp.elm.bos.bg = gaugeSpeed.div(2.4).mul(tmp.elm.bos.gluonEff("ab", 1)).mul(tmp.elm.bos.photonEff(3).max(1));
	tmp.elm.bos.arg = gaugeSpeed.div(10).mul(tmp.elm.bos.gluonEff("r", 1)).mul(tmp.elm.bos.photonEff(3).max(1));
	tmp.elm.bos.agg = gaugeSpeed.div(9.8).mul(tmp.elm.bos.gluonEff("g", 1)).mul(tmp.elm.bos.photonEff(3).max(1));
	tmp.elm.bos.abg = gaugeSpeed.div(10.2).mul(tmp.elm.bos.gluonEff("b", 1)).mul(tmp.elm.bos.photonEff(3).max(1));
	if (player.elementary.foam.unl && tmp.elm.qf) {
		tmp.elm.bos.rg = tmp.elm.bos.rg.mul(tmp.elm.qf.boost19)
		tmp.elm.bos.gg = tmp.elm.bos.gg.mul(tmp.elm.qf.boost19)
		tmp.elm.bos.bg = tmp.elm.bos.bg.mul(tmp.elm.qf.boost19)
		tmp.elm.bos.arg = tmp.elm.bos.arg.mul(tmp.elm.qf.boost19)
		tmp.elm.bos.agg = tmp.elm.bos.agg.mul(tmp.elm.qf.boost19)
		tmp.elm.bos.abg = tmp.elm.bos.abg.mul(tmp.elm.qf.boost19)
	}
	if (!tmp.elm.bos.gluonCost) tmp.elm.bos.gluonCost = function (col, x) {
		let bought = player.elementary.bosons.gauge.gluons[col].upgrades[x - 1]||new ExpantaNum(0);
		if (x == 1) return ExpantaNum.pow(1.3, bought.pow(1.5).mul(2)).mul(100);
		else if (x==2) return ExpantaNum.pow(3, ExpantaNum.pow(1.4, bought)).mul(1e3 / 3);
		else return ExpantaNum.pow(10, bought.pow(2)).mul(1e7)
	};
	if (!tmp.elm.bos.gluonTarg) tmp.elm.bos.gluonTarg = function (col, x) {
		let amt = player.elementary.bosons.gauge.gluons[col].amount||new ExpantaNum(0);
		if (x == 1) return amt.div(100).max(1).logBase(1.3).div(2).root(1.5).add(1).floor();
		else if (x==2) return amt.div(1e3 / 3).max(1).logBase(3).max(1).logBase(1.4).add(1).floor();
		else return amt.div(1e7).max(1).log10().sqrt().add(1).floor();
	};
	tmp.elm.bos.buy = function (col, x, max=false) {
		let amt = player.elementary.bosons.gauge.gluons[col].amount;
		if (amt.lt(tmp.elm.bos.gluonCost(col, x))) return;
		let target;
		if (max) target = tmp.elm.bos.gluonTarg(col, x);
		player.elementary.bosons.gauge.gluons[col].amount = amt.sub(tmp.elm.bos.gluonCost(col, x));
		if (max) player.elementary.bosons.gauge.gluons[col].upgrades[x - 1] = player.elementary.bosons.gauge.gluons[col].upgrades[x - 1].max(target)
		else player.elementary.bosons.gauge.gluons[col].upgrades[x - 1] = player.elementary.bosons.gauge.gluons[
			col
		].upgrades[x - 1].add(1);
	};
	tmp.elm.bos.gluon2total = new ExpantaNum(1);
	for (let i = 0; i < GLUON_COLOURS.length; i++) {
		tmp.elm.bos.gluon2total = tmp.elm.bos.gluon2total.mul(tmp.elm.bos.gluonEff(GLUON_COLOURS[i], 2));
		if (tmp.hh410) tmp.elm.bos[GLUON_COLOURS[i]+"g"] = tmp.elm.bos[GLUON_COLOURS[i]+"g"].mul(666)
	}
}

function updateTempGravitons(gaugeSpeed) {
	tmp.elm.bos.gravGain = gaugeSpeed.div(1.75);
	if (player.inf.upgrades.includes("10;9")) tmp.elm.bos.gravGain = tmp.elm.bos.gravGain.mul(100)
	if (player.elementary.theory.supersymmetry.unl) tmp.elm.bos.gravGain = tmp.elm.bos.gravGain.mul(tmp.neuEff||1)
	tmp.elm.bos.gravEff = player.elementary.bosons.gauge.gravitons
		.mul(player.elementary.times.add(1))
		.add(1)
		.log10()
		.div(10)
		.add(1)
		.pow(2.25);
	if (hasMltMilestone(13)) tmp.elm.bos.gravEff = tmp.elm.bos.gravEff.pow(15)
}

function updateTempGauge() {
	tmp.elm.bos.gaugeGain = player.elementary.bosons.amount.mul(player.inf.ascension.power.add(1).log10().add(1));
	tmp.elm.bos.forceGain = player.elementary.bosons.gauge.amount.pow(0.75);
	if (tmp.gravEff) tmp.elm.bos.forceGain = tmp.elm.bos.forceGain.mul(tmp.gravEff);
	if (player.elementary.foam.unl && tmp.elm.qf) tmp.elm.bos.forceGain = tmp.elm.bos.forceGain.mul(tmp.elm.qf.boost18);
	tmp.elm.bos.forceEffExpMult = new ExpantaNum(1)
	if (player.mlt.times.gt(0) && tmp.mlt) tmp.elm.bos.forceEffExpMult = tmp.elm.bos.forceEffExpMult.mul(tmp.mlt.quilts[3].eff);
	tmp.elm.bos.forceEff = player.elementary.bosons.gauge.force.div(10).add(1).logBase(2).pow(tmp.elm.bos.forceEffExpMult.mul(.2));
	if (player.inf.upgrades.includes("8;10")) tmp.elm.bos.forceEff = tmp.elm.bos.forceEff.mul(player.elementary.bosons.gauge.force.add(1).pow(tmp.elm.bos.forceEffExpMult.mul(0.08)))
	if (tmp.ach[132].has) tmp.elm.bos.forceEff = tmp.elm.bos.forceEff.mul(2)
	if (player.mlt.times.gt(0) && tmp.mlt) tmp.elm.bos.forceEff = tmp.elm.bos.forceEff.mul(tmp.mlt.quilts[3].eff2);
	tmp.elm.bos.forceEff = tmp.elm.bos.forceEff.mul(tmp.higgs130?tmp.higgs130.max(1):1)
	if (player.elementary.entropy.upgrades.includes(15)) tmp.elm.bos.forceEff = tmp.elm.bos.forceEff.pow(5)
	if (player.elementary.sky.unl && tmp.elm.sky) tmp.elm.bos.forceEff = tmp.elm.bos.forceEff.pow(tmp.elm.sky.spinorEff[11])
	if (modeActive("easy")) tmp.elm.bos.forceEff = tmp.elm.bos.forceEff.mul(2);
	if (ExpantaNum.gte(player.elementary.theory.tree.upgrades[41]||0, 1) && hasDE(6)) tmp.elm.bos.forceEff = tmp.elm.bos.forceEff.mul(TREE_UPGS[41].effect(player.elementary.theory.tree.upgrades[41]||0))
	let gaugeSpeed = new ExpantaNum(tmp.elm.bos.forceEff);

	updateTempPhotons(gaugeSpeed);
	updateTempWZB(gaugeSpeed);
	updateTempGluons(gaugeSpeed);
	updateTempGravitons(gaugeSpeed);
}

function updateHiggsUpgradeEffects() {
	if (!tmp.elm.bos["higgs_1;1;0"]) tmp.elm.bos["higgs_1;1;0"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("1;1;0")) return new ExpantaNum(1)
		let f1 = player.elementary.fermions.quarks.amount.add(1).log10().pow(0.2).add(1)
		let f2 = player.elementary.fermions.leptons.amount.add(1).log10().pow(0.3).add(1)
		let f3 = player.elementary.bosons.gauge.photons.amount.add(1).log10().pow(0.15).add(1)
		let f4 = player.elementary.bosons.gauge.gravitons.add(1).log10().pow(0.25).add(1)
		let f5 = player.elementary.bosons.scalar.higgs.amount.add(1).log10().pow(0.1).add(1)
		return f1.mul(f2).mul(f3).mul(f4).mul(f5).pow(0.2)
	}
	if (!tmp.elm.bos["higgs_0;1;1"]) tmp.elm.bos["higgs_0;1;1"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("0;1;1")) return new ExpantaNum(1)
		let e = player.inf.endorsements.sub(36).max(0)
		if (e.gte(3)) e = e.sqrt().mul(Math.sqrt(3))
		return ExpantaNum.pow(7, e).max(1)
	}
	if (!tmp.elm.bos["higgs_3;0;0"]) tmp.elm.bos["higgs_3;0;0"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("3;0;0")) return new ExpantaNum(1)
		return ExpantaNum.pow(1.1, player.elementary.bosons.scalar.higgs.upgrades.length)
	}
	if (!tmp.elm.bos["higgs_0;2;1"]) tmp.elm.bos["higgs_0;2;1"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("0;2;1")) return new ExpantaNum(1)
		return player.elementary.bosons.scalar.higgs.amount.add(1).mul(10).slog(10).pow(0.1).sub(1).mul(100)
		// TODO: remove this slog
	}
	if (!tmp.elm.bos["higgs_0;0;4"]) tmp.elm.bos["higgs_0;0;4"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("0;0;4")) return new ExpantaNum(1)
		let ret = tmp.elm.pa.active?tmp.elm.pa.speedBoost.add(1):new ExpantaNum(1)
		return ret
	}
	if (!tmp.elm.bos["higgs_1;3;0"]) tmp.elm.bos["higgs_1;3;0"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("1;3;0")) return new ExpantaNum(1)
		let amt = player.inf.pantheon.angels.add(player.inf.pantheon.demons)
		let ret = ExpantaNum.pow(10, amt.sqrt()).pow(0.2)
		return ret
	}
	if (!tmp.elm.bos["higgs_0;3;1"]) tmp.elm.bos["higgs_0;3;1"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("0;3;1")) return new ExpantaNum(1)
		let ret = player.inf.pantheon.purge.power.add(1).pow(0.9)
		return ret
	}
	if (!tmp.elm.bos["higgs_0;0;5"]) tmp.elm.bos["higgs_0;0;5"] = function(disp=false) {
		if (!disp) if (!tmp.elm.bos.hasHiggs("0;0;5")) return new ExpantaNum(0)
		let ret = player.elementary.bosons.scalar.higgs.amount.add(1).mul(10).slog(10).pow(2.5).sub(1).mul(18)
		return ret
		// TODO: remove this slog
	}
}

function updateTempScalar() {
	tmp.elm.bos.scalarGain = player.elementary.bosons.amount.sqrt().mul(0.6);
	tmp.elm.bos.higgsGain = player.elementary.bosons.scalar.amount.div(10).pow(0.95).mul(ExpantaNum.pow(2, Math.sqrt(player.elementary.bosons.scalar.higgs.upgrades.length)))
	tmp.elm.bos.higgsGain = tmp.elm.bos.higgsGain.mul(tmp.higgs011?new ExpantaNum(tmp.higgs011).max(1):1).mul(tmp.higgs300?new ExpantaNum(tmp.higgs300).max(1):1)
	if (player.mlt.times.gt(0) && tmp.mlt) tmp.elm.bos.higgsGain = tmp.elm.bos.higgsGain.mul(tmp.mlt.quilts[3].eff2);
	if (tmp.inf510) tmp.elm.bos.higgsGain = tmp.elm.bos.higgsGain.mul(INF_UPGS.effects["5;10"]().hb);
	if (player.elementary.theory.tree.unl) tmp.elm.bos.higgsGain = tmp.elm.bos.higgsGain.mul(TREE_UPGS[2].effect(player.elementary.theory.tree.upgrades[2]||0))
	if (modeActive("easy")) tmp.elm.bos.higgsGain = tmp.elm.bos.higgsGain.mul(10)
	if (!tmp.elm.bos.buyHiggs) tmp.elm.bos.buyHiggs = function(id) {
		let data = HIGGS_UPGS[id]
		if (player.elementary.bosons.scalar.higgs.amount.lt(data.cost) || player.elementary.bosons.scalar.higgs.upgrades.includes(id)) return
		player.elementary.bosons.scalar.higgs.amount = player.elementary.bosons.scalar.higgs.amount.sub(data.cost)
		player.elementary.bosons.scalar.higgs.upgrades.push(id)
		if (id=="0;0;2") for (let i=1;i<=4;i++) tmp.inf.asc.activatePerk(i)
	}
	if (!tmp.elm.bos.hasHiggs) tmp.elm.bos.hasHiggs = function(id) { return player.elementary.bosons.scalar.higgs.upgrades.includes(id) }
	updateHiggsUpgradeEffects();
}

function updateTempBosons() {
	if (!tmp.elm.bos) tmp.elm.bos = {};
	if (!tmp.elm.bos.transfer1) tmp.elm.bos.transfer1 = function () {
		if (player.elementary.particles.lt(1)) return;
		player.elementary.particles = player.elementary.particles.sub(1);
		player.elementary.bosons.amount = player.elementary.bosons.amount.add(HCCBA("fermbos")?0:1);
	};
	if (!tmp.elm.bos.transfer) tmp.elm.bos.transfer = function (ratio) {
		if (player.elementary.particles.mul(ratio).floor().lt(1)) return;
		let toSub = player.elementary.particles.mul(ratio).floor();
		player.elementary.particles = player.elementary.particles.sub(toSub);
		player.elementary.bosons.amount = player.elementary.bosons.amount.add(HCCBA("fermbos")?0:toSub);
	};
	
	updateGluonTabs();
	updateTempGauge();
	updateTempScalar();
}

function adjGravBoosts(b, rev=false) {
	if (rev) {
		if (hasDE(6) && b.lt(60)) {
			b = b.div(2);
			b = ExpantaNum.pow(10, ExpantaNum.div(3, ExpantaNum.sub(30, b)).sub(1)).add(26)
		}
	} else {
		if (hasDE(6) && b.lt(60)) {
			if (b.gte(27)) b = ExpantaNum.sub(30, ExpantaNum.div(3, b.sub(26).log10().add(1)))
			b = b.mul(2)
		}
	}
	return b;
}

function getGravBoosts() {
	if (!hasDE(4)) return new ExpantaNum(0)
	let g = player.elementary.bosons.gauge.gravitons
	let b = g.add(1).log10().sqrt()
	return adjGravBoosts(b).floor()
}

function getNextGravBoost(boosts) {
	if (!hasDE(4)) return new ExpantaNum(1/0)
	return ExpantaNum.pow(10, adjGravBoosts(new ExpantaNum(boosts), true).add(1).pow(2)).sub(1);
}

function getGravBoostBase() {
	let base = new ExpantaNum(2)
	if (hasDE(5)&&(player.elementary.theory.tree.upgrades[21]||new ExpantaNum(0)).gte(1)) base = base.pow(2)
	if (player.elementary.sky.unl && tmp.elm.sky) base = base.pow(tmp.elm.sky.spinorEff[2])
	return base
}

function getGravBoostMult() {
	if (!hasDE(4)) return new ExpantaNum(1)
	let b = getGravBoosts()
	return ExpantaNum.pow(getGravBoostBase(), b)
}