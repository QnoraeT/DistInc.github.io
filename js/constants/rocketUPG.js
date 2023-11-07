const ROCKET_UPGS = {
    1: {
        constC: new Decimal("e1.000e15"),
        linearC: new Decimal("e0.075e15"),
        quadC: new Decimal("e0.001e15"),
        extra: function () {
            let extra = new Decimal(0)
            return extra
        },
        eff: function () {
            let effA, effB, effC
            let eff = getRUPGEffective(1)
            effA = (true == true)
                ?eff.add(1).log(10).mul(player.rocketUPG[1].tier.add(1).pow(1.2)).div(4).add(1).pow(player.rocketUPG[1].tier.add(1).root(4)).root(5)
                :new Decimal(1)
            effB = (player.rocketUPG[1].ascension.gte(1))
                ?eff.add(1).root(6).pow(player.rocketUPG[1].tier.mul(2.5).add(1).root(3)).sub(1).div(27).add(1)
                :new Decimal(1)
            effC = (player.rocketUPG[1].ascension.gte(2))
                ?eff.div(2).add(1).pow(player.rocketUPG[1].tier.add(1).root(1.7).mul(0.4)).sub(1).mul(1.3).add(1)
                :new Decimal(1)
            return [Decimal.div(1.1, effA).max(0.1), effB, effC]
        },
        desc: function (e) {
            let desc = "Decrease RF's cost exponent from " + showNum(new Decimal(1.1)) + " to " + showNum(ROCKET_UPGS[1].eff()[0])
            if (player.rocketUPG[1].ascension.gte(1)) desc += ". <br> Rocket fuel is " + showNum(ROCKET_UPGS[1].eff()[1].sub(1).mul(100)) + "% stronger"
            if (player.rocketUPG[1].ascension.gte(2)) desc += 
                (!ROCKET_UPGS[1].eff()[1].gte(1000))
                    ?". <br> Rocket fuel's cost scaling is " + showNum(Decimal.sub(1, Decimal.div(1, ROCKET_UPGS[1].eff()[2])).mul(100)) + "% slower"
                    :". <br> Rocket fuel's cost scaling is " + showNum(ROCKET_UPGS[1].eff()[2]) + "x slower"
            return desc + "."
        },
    },
    2: {
        constC: new Decimal("e1.500e15"),
        linearC: new Decimal("e0.200e15"),
        quadC: new Decimal("e0.0002e15"),
        extra: function () {
            let extra = new Decimal(0)
            return extra
        },
        eff: function () {
            let effA, effB, effC
            effA = (true == true)
                ?5
                :new Decimal(1)
            effB = (player.rocketUPG[2].ascension.gte(1))
                ?5
                :new Decimal(1)
            effC = (player.rocketUPG[2].ascension.gte(2))
                ?5
                :new Decimal(1)
            return [effA, effB, effC]
        },
        desc: function (e) {
            let desc = "Rocket gain is raised to the power of ^" + showNum(ROCKET_UPGS[2].eff()[0])
            if (player.rocketUPG[2].ascension.gte(1)) desc += 
                (!ROCKET_UPGS[2].eff()[1].gte(1000))
                    ?". <br> Rocket related softcaps are " + showNum(Decimal.sub(1, Decimal.div(1, ROCKET_UPGS[2].eff()[1])).mul(100)) + "% weaker"
                    :". <br> Rocket related softcaps are " + showNum(ROCKET_UPGS[2].eff()[2]) + "x weaker"
            if (player.rocketUPG[2].ascension.gte(2)) desc += ". <br> Rocket's first major softcap at 10 gets delayed by ^" + showNum(ROCKET_UPGS[2].eff()[2])      
            return desc + "."
        },
    },
}
