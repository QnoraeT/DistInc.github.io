function updateTempQuarks() {
	tmp.elm.ferm.quarkGain = player.elementary.fermions.amount
		.mul(player.inf.endorsements.add(1).sqrt())
		.mul((tmp.psiEff ? tmp.psiEff : new ExpantaNum(0)).max(1));
	if (tmp.glu2) tmp.elm.ferm.quarkGain = tmp.elm.ferm.quarkGain.mul(tmp.glu2.max(1));
	if (tmp.higgs031) tmp.elm.ferm.quarkGain = tmp.elm.ferm.quarkGain.mul(tmp.higgs031)
	if (player.elementary.theory.supersymmetry.unl) tmp.elm.ferm.quarkGain = tmp.elm.ferm.quarkGain.mul(tmp.sqEff||1)
	if (player.elementary.foam.unl && tmp.elm.qf) tmp.elm.ferm.quarkGain = tmp.elm.ferm.quarkGain.mul(tmp.elm.qf.boost2)
	if (modeActive("easy")) tmp.elm.ferm.quarkGain = tmp.elm.ferm.quarkGain.mul(4)
	if (tmp.elm.ferm.quarkGain.gte("e616")) tmp.elm.ferm.quarkGain = softcap(tmp.elm.ferm.quarkGain, "EP", 1, "e616", 3)
	tmp.elm.ferm.quarkRewards = new ExpantaNum(player.elementary.fermions.quarks.amount).max(1).logBase(50).floor();
	if (tmp.elm.ferm.quarkRewards.gte(10)) tmp.elm.ferm.quarkRewards = softcap(tmp.elm.ferm.quarkRewards, "P", 1, 10, 2)
	if (!tmp.elm.ferm.quarkName) tmp.elm.ferm.quarkName = function (noExp = false) {
		let name = QUARK_NAMES[player.elementary.fermions.quarks.type - 1];
		let stacks = getQuarkStacks(tmp.elm.ferm.quarkRewards)
		return capitalFirst(name) + (noExp ? "" : stacks.gt(1) ? "<sup>" + showNum(stacks) + "</sup>" : "");
	};
	tmp.elm.ferm.quarkEff = function (name) {
		let qks = player.elementary.fermions.quarks.amount.max(0);
		if (qks.gte("ee3.5")) qks = softcap(qks, "EP", 1, "ee3.5", 2.5)
		let stacks = getQuarkStacks(tmp.elm.ferm.quarkRewards)
		if (stacks.gte(8) && player.elementary.sky.amount.eq(0)) stacks = softcap(stacks, "P", 1, 8, 2)
		if (name == "up") return qks.add(1).pow(ExpantaNum.mul(5, stacks));
		else if (name == "down") return qks.add(1).pow(ExpantaNum.mul(Math.sqrt(2), stacks.sqrt()));
		else if (name == "charm") return qks.add(1).pow(ExpantaNum.mul(0.1, stacks.cbrt()));
		else if (name == "strange")
			return player.elementary.fermions.amount
				.add(1)
				.mul(qks.add(1).sqrt().log10().add(1))
				.pow(ExpantaNum.mul(0.2, stacks.sqrt()))
				.mul(qks.eq(0) ? 0 : 1)
				.add(1);
		else if (name == "top")
			return ExpantaNum.pow(ExpantaNum.mul(2, qks.add(1).log10().div(100).add(1)), stacks.pow(0.8))
				.mul(qks.eq(0) ? 0 : 1)
				.add(1);
		else if (name == "bottom")
			return ExpantaNum.pow(ExpantaNum.mul(0.4, qks.add(1).log10()).add(1), stacks.add(1));
	};
	if (!tmp.elm.ferm.quarkR) tmp.elm.ferm.quarkR = function (name) {
		if ((name == QUARK_NAMES[player.elementary.fermions.quarks.type - 1]) || ExpantaNum.gte(player.elementary.theory.tree.upgrades[32]||0, 1) || hasMltMilestone(14)) return tmp.elm.ferm.quarkEff(name);
		else return new ExpantaNum(1);
	};
	if (!tmp.elm.ferm.quarkDesc) tmp.elm.ferm.quarkDesc = function (name) {
		let desc = QUARK_DESCS[name] + "     ";
		desc += "Currently: " + showNum(tmp.elm.ferm.quarkEff(name)) + "x";
		return desc;
	};
	if (!tmp.elm.ferm.changeQuark) tmp.elm.ferm.changeQuark = function () {
		player.elementary.fermions.quarks.type = (player.elementary.fermions.quarks.type % 6) + 1;
	};
}

function updateTempLeptons() {
	tmp.elm.ferm.leptonGain = player.elementary.fermions.amount
		.mul(tmp.inf.pantheon.totalGems.add(1))
		.div(2.5)
		.mul(tmp.elm.ferm.quarkR("top").max(1))
		.max(0);
	if (tmp.glu2) tmp.elm.ferm.leptonGain = tmp.elm.ferm.leptonGain.mul(tmp.glu2.max(1));
	if (tmp.higgs031) tmp.elm.ferm.leptonGain = tmp.elm.ferm.leptonGain.mul(tmp.higgs031.max(1));
	if (player.elementary.theory.supersymmetry.unl) tmp.elm.ferm.leptonGain = tmp.elm.ferm.leptonGain.mul(tmp.slEff||1)
	if (player.elementary.foam.unl && tmp.elm.qf) tmp.elm.ferm.leptonGain = tmp.elm.ferm.leptonGain.mul(tmp.elm.qf.boost2)
	if (modeActive("easy")) tmp.elm.ferm.leptonGain = tmp.elm.ferm.leptonGain.mul(4)
	if (tmp.elm.ferm.leptonGain.gte("e616")) tmp.elm.ferm.leptonGain = softcap(tmp.elm.ferm.leptonGain, "EP", 1, "e616", 3)
	tmp.elm.ferm.leptonRewards = new ExpantaNum(player.elementary.fermions.leptons.amount).max(1).logBase(100).floor();
	if (tmp.elm.ferm.leptonRewards.gte(7)) tmp.elm.ferm.leptonRewards = softcap(tmp.elm.ferm.leptonRewards, "P", 1, 7, 2)
	if (!tmp.elm.ferm.leptonName) tmp.elm.ferm.leptonName = function (noExp = false) {
		let name = LEPTON_NAMES[player.elementary.fermions.leptons.type - 1];
		let stacks = getLeptonStacks(tmp.elm.ferm.leptonRewards)
		return capitalFirst(name) + (noExp ? "" : stacks.gt(1) ? "<sup>" + showNum(stacks) + "</sup>" : "");
	};
	tmp.elm.ferm.leptonEff = function (name) {
		let lpts = player.elementary.fermions.leptons.amount;
		if (lpts.gte("e1000")) lpts = softcap(lpts, "EP", 1, "e1000", 2.5)
		let stacks = getLeptonStacks(tmp.elm.ferm.leptonRewards)
		if (stacks.gte(8) && player.elementary.sky.amount.eq(0)) stacks = softcap(stacks, "P", 1, 8, 2)
		if (name == "electron")
			return softcap(lpts.max(0)
			.add(1)
			.mul(10)
			.log(10)
			.max(1)
			.pow(ExpantaNum.mul(0.1, stacks.add(1).log10().add(1).pow(2)))
			.sub(1)
			.div(10)
			.max(0)
			.add(1)
			.pow(2)
			,"EP", 1, 2.5, 2) // exponent square rooted after 2.5
		else if (name == "muon") return lpts.mul(ExpantaNum.pow(2.5, stacks)).add(1).mul(10).log(10).root(6).max(1)
		else if (name == "tau")
			return ExpantaNum.pow(
				player.inf.knowledge.max(0).add(1).log10().add(1).log10().add(1),
				lpts.max(0).mul(ExpantaNum.pow(2.5, stacks)).add(1).mul(10).log(10).div(5).max(0.2)
			).min(lpts.add(1));
		else if (name == "netrion")
			return softcap(
				lpts.max(0).mul(ExpantaNum.pow(2, stacks)).add(1).mul(10).log(10).max(1).sub(1).div(100).max(0).root(1.5).add(1)
				, "EP", 1, 20, 2.25);
		else if (name == "vibrino")
			return softcap(
				lpts.max(0).mul(ExpantaNum.pow(1.4, stacks)).add(1).mul(16).log(16).max(1).sub(1).div(250).max(0).root(1.5).add(1)
				, "EP", 1, 10, 2.5);
		else if (name == "psi") return lpts.max(0).add(1).log10().add(1).pow(stacks.add(0.5)).max(1);
	};
	if (!tmp.elm.ferm.leptonR) tmp.elm.ferm.leptonR = function (name) {
		if ((name == LEPTON_NAMES[player.elementary.fermions.leptons.type - 1])||ExpantaNum.gte(player.elementary.theory.tree.upgrades[32]||0, 1) || hasMltMilestone(14)) return tmp.elm.ferm.leptonEff(name);
		else return new ExpantaNum(1);
	};
	if (!tmp.elm.ferm.leptonDesc) tmp.elm.ferm.leptonDesc = function (name) {
		let desc = LEPTON_DESCS[name] + "      Currently: ";
		let eff = tmp.elm.ferm.leptonEff(name);
		if (name == "electron" || name == "netrion" || name == "vibrino") desc += "+" + showNum(eff.sub(1).mul(100)) + "%";
		else if (name == "muon") desc += "^" + showNum(eff);
		else desc += showNum(eff) + "x";
		return desc;
	};
	if (!tmp.elm.ferm.changeLepton) tmp.elm.ferm.changeLepton = function () {
		player.elementary.fermions.leptons.type = (player.elementary.fermions.leptons.type % 6) + 1;
	};
}

function updateTempFermions() {
	if (!tmp.elm.ferm) tmp.elm.ferm = {};
	if (!tmp.elm.ferm.transfer1) tmp.elm.ferm.transfer1 = function () {
		if (player.elementary.particles.lt(1)) return;
		player.elementary.particles = player.elementary.particles.sub(1);
		player.elementary.fermions.amount = player.elementary.fermions.amount.add(HCCBA("fermbos")?0:1);
	};
	if (!tmp.elm.ferm.transfer) tmp.elm.ferm.transfer = function (ratio) {
		if (player.elementary.particles.mul(ratio).floor().lt(1)) return;
		let toSub = player.elementary.particles.mul(ratio).floor();
		player.elementary.particles = player.elementary.particles.sub(toSub);
		player.elementary.fermions.amount = player.elementary.fermions.amount.add(HCCBA("fermbos")?0:toSub);
	};
	
	updateTempQuarks();
	updateTempLeptons();
}