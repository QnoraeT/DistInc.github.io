"use strict";

/**
 * 
 * @param {string} type Determines what type of scaling / softcap to use. 
 * Available are:
 *   "P" for Polynomial
 *   "SE" for Semi-Exponential
 *   "AE" for Alternate-Exponential
 *   "E" for Exponential
 *   "EP" for Exponential-Polynomial
 *   "EEP" for Exponential^2-Polynomial
 *   "ADt" for Antimatter Dimensions time shards calculations
 * 
 * If these types are wrong, this will throw a warning and fallback to "amt"
 * @param {number} amt 
 * This is the value of "x" where any formula can be used on it depending on what type is.
 * @param {boolean} inv 
 * This is a boolean, showing if its the inverse of these functions or not.
 * @param {number} a 
 * These are parameters for the scalings. a is most commonly for the start of scaling.
 * @param {number} b 
 * b is most commonly used for scaling strength directly.
 * @param {number} c 
 * c is most commonly used for how much on average it should scale, assuming b is at 1.0.
 * @param {number} d 
 * @param {number} f 
 * @param {number} g 
 * @returns {ExpantaNum}
 */
function cSC(type, amt, inv, a, b, c, d, f, g) {
    // 1st arg is type, 2nd arg is effective bought, 3rd arg is if it's inverse, 4th+ are params
    let x = new ExpantaNum(amt);
    a = new ExpantaNum(a);
    b = new ExpantaNum(b);
    c = new ExpantaNum(c);
    d = new ExpantaNum(d);
    f = new ExpantaNum(f);
    g = new ExpantaNum(g);
    let temp;
    switch (type) {
        case "P":
            if (!inv)
                temp = x.div(a).pow(ExpantaNum.pow(c, b)).mul(a).sub(a).div(ExpantaNum.pow(c, b)).add(a);
            else
                temp = x.sub(a).mul(ExpantaNum.pow(c, b)).add(a).div(a).root(ExpantaNum.pow(c, b)).mul(a);
            return temp;
        case "SE":
            if (!inv)
                temp = ExpantaNum.pow(a, x.log(a).pow(ExpantaNum.pow(c, b)).sub(1).div(ExpantaNum.pow(c, b)).add(1));
            else
                temp = ExpantaNum.pow(a, x.log(a).sub(1).mul(ExpantaNum.pow(c, b)).add(1).root(ExpantaNum.pow(c, b)));
            return temp;
        case "AE":
            if (!inv)
                temp = ExpantaNum.pow(ExpantaNum.pow(c, b), x.sub(a)).mul(a);
            else
                temp = x.div(a).log(ExpantaNum.pow(c, b)).add(a);
            return (inv) ? (ExpantaNum.min(temp, x)) : (ExpantaNum.max(temp, x));
        case "E":
            if (!inv)
                temp = ExpantaNum.pow(ExpantaNum.pow(c, b), x.div(a).sub(1)).mul(a);
            else
                temp = x.div(a).log(ExpantaNum.pow(c, b)).add(1).mul(a);
            return (inv) ? (ExpantaNum.min(temp, x)) : (ExpantaNum.max(temp, x));
        case "EP": // a*b^(x+(cx)^2)) - exponential:polynomial
            if (!inv)
                temp = b.pow(x.mul(c).pow(2).add(x)).mul(a);
            else
                temp = b.ln().add(x.div(a).ln().mul(c.pow(2).mul(4))).root(2).div(b.ln().root(2).mul(c.pow(2).mul(2))).sub(new ExpantaNum(1).div(c.pow(2).mul(2)));
            return temp;
        case "EEP": // a*b^(xcd^((fx)^g)) - exponential^2:polynomial
            if (!inv)
                temp = a.mul(b.pow(d.pow(x.mul(f).pow(g)).mul(c).mul(x)));
            else
                temp = x.div(a).ln().pow(g).mul(d.ln()).mul(f.pow(g)).mul(g).div(c.pow(g).mul(b.ln().pow(g))).lambertw().root(g).div(g.root(g).mul(f).mul(d.ln().root(g)));
            return temp;
        case "ADt": // antimatter dimension's free tickspeed from time softcap (a = start [AD = 300000], b = normal base [AD = 1.33 or 1.25], c = scale base [AD = 1.000006])
            if (!inv) {
                if (x.gte(a)) {
                    temp = x.sub(a).add(1);
                    temp = b.pow(x).mul(c.pow(temp.sub(1).mul(temp).div(2)));
                } else {
                    temp = b.pow(x);
                }
            } else {
                if (x.gte(b.pow(a))) {
                    b = b.ln();
                    c = c.ln();
                    //((2ac-2b-c)/2c)+(sqrt(4bc-8abc+4b^2+8ln(x)*c+c^2)/2c)
                    temp = a.mul(c).mul(2).sub(b.mul(2)).sub(c).div(c.mul(2)).add(b.mul(c).mul(4).sub(a.mul(b).mul(c).mul(8)).add(b.pow(2).mul(4)).add(x.ln().mul(8).mul(c)).add(c.pow(2)).root(2).div(c.mul(2)));
                } else {
                    temp = x.log(b);
                }
            }
            return temp;
        default:
            console.warn("Cost scaling type " + type + " is not defined!!");
            return x; // fallback cost
    }
}


function softcap(amt, type, strength, start, powScale = 2) {
    let sta = new ExpantaNum(start);
    if (amt.gte(sta)) {
        let str = new ExpantaNum(strength);
        switch (type) {
            case "D":
                str = new ExpantaNum(powScale).pow(str);
                return amt.div(str).add(sta.sub(sta.div(str)));
            case "P": // polynomial
                str = new ExpantaNum(powScale).pow(str);
                return amt.div(sta).root(str).mul(sta).sub(sta).mul(str).add(sta);
            case "E": // exponential 
                if (str.gt(1)) { console.warn("Softcap \"E\" cannot work correctly with strength > 1 !"); str = new ExpantaNum(1) }
                str = ExpantaNum.sub(1, str);
                return amt.log(sta.mul(amt.div(sta).pow(str))).add(1).pow(sta.mul(amt.div(sta).pow(str)).log(2));
            case "EP":
                str = new ExpantaNum(powScale).pow(str);
                return ExpantaNum.pow(sta, amt.log(sta).root(str));
            case "L": // logarithmic
                return amt.log(10).pow(sta.log(10).div(sta.log(10).log(10)));
            default:
                console.warn("Softcap type " + type + " is not defined");
                return amt;
        }
    }
    return amt;
}

const DEFAULT_SCALE = {
    scaled:        { id: 0, typ: "P",  str: 2 },
    superscaled:   { id: 1, typ: "P",  str: 3 },
    hyper:         { id: 2, typ: "AE", str: 1.01 },
    atomic:        { id: 3, typ: "P",  str: 4 },
    supercritical: { id: 4, typ: "E",  str: 5 },
    meta:          { id: 5, typ: "SE", str: 6 },
    exotic:        { id: 6, typ: "P",  str: 15 },
    instant:       { id: 7, typ: "P",  str: 75 },
    wtf:           { id: 8, typ: "E",  str: 100 },
    utterlyFucked: { id: 9, typ: "SE", str: 60 },
}

const SCALE_LIST = ["scaled", "superscaled", "hyper", "atomic", "supercritical", "meta", "exotic", "instant", "wtf", "utterlyFucked"]

function doScaling(name, type, amt, inv, special = [], special2 = []) {
    if (DEFAULT_SCALE[type] === undefined) { throw new Error(`Scaling type ${type} does not exist!`) }
    let scaleSTR;
    let scaleTYP;
    let cur = DEFAULT_SCALE[type]
    scaleTYP = special2[cur.id] ?? cur.typ
    scaleSTR = special[cur.id] ?? cur.str
    if ((SCALING_STARTS[type][name] !== undefined) && scalingActive(name, amt, type)) {
        return cSC(scaleTYP, amt, inv, getScalingStart(type, name), getScalingPower(type, name), scaleSTR);
    }
    return amt;
}

function doAllScaling(amt, name, inv, specialScale, specialType) {
    let scalS = amt;
    for (let i = 0; i < SCALE_LIST.length; i++) {
        scalS = doScaling(name, SCALE_LIST[!inv ? SCALE_LIST.length - i - 1 : i], scalS, inv, specialScale, specialType);
    }
    return scalS;
}