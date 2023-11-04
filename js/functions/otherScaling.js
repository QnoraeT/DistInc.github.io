"use strict";

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
    switch(type) {
        case "P":
            if (!inv)
                // temp = x.pow(ExpantaNum.pow(c, b)).div(a.pow(ExpantaNum.pow(c, b).sub(1)));
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
        case "LE":
            if (!inv)
                temp = ExpantaNum.pow(ExpantaNum.pow(c, b), x.sub(a)).mul(a);
            else
                temp = x.div(a).log(ExpantaNum.pow(c, b)).add(a);
            // return (inv)?(ExpantaNum.min(temp,x)):(ExpantaNum.max(temp,x));
            return temp; // but why would you let hyper anything have the potential to scale way slower than normal
        case "E":
            if (!inv)
                temp = ExpantaNum.pow(ExpantaNum.pow(c, b), x.div(a).sub(1)).mul(a);
            else
                temp = x.div(a).log(ExpantaNum.pow(c, b)).add(1).mul(a);
            return (inv)?(ExpantaNum.min(temp,x)):(ExpantaNum.max(temp,x)); // lmao 
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
            if (!inv){
                if (x.gte(a)){
                    temp = x.sub(a).add(1);
                    temp = b.pow(x).mul(c.pow(temp.sub(1).mul(temp).div(2)));
                } else {
                    temp = b.pow(x);
                }
            } else {
                if (x.gte(b.pow(a))){
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
            return new ExpantaNum(10); // fallback cost
    }
}


function softcap(amt, type, strength, start, powScale = 2) {
    let sta = new ExpantaNum(start);
    if (amt.gte(sta)){
        let str = new ExpantaNum(strength);
        let temp;
        switch(type) {
            case "D":
                str = new ExpantaNum(powScale).pow(str);
                return amt.div(str).add(sta.sub(sta.div(str)));
            case "P": // polynomial
                str = new ExpantaNum(powScale).pow(str);
                return amt.div(sta).root(str).mul(sta).sub(sta).mul(str).add(sta);
            case "E": // exponential 
                if (str.gt(1)){console.warn("Softcap \"E\" cannot work correctly with strength > 1 !");str=new ExpantaNum(1)}
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

function doScaling(name, type, amt, inv, special = [2, 3, 1.01, 4, 5], special2 = ["P", "P", "LE", "P", "E"]){
    let scaleSTR;
    let scaleTYP;
    switch (type){
        case "scaled":
            scaleTYP = special2[0] !== undefined?special2[0]:"P";
            scaleSTR = special[0] !== undefined?special[0]:2;
            break;
        case "superscaled":
            scaleTYP = special2[1] !== undefined?special2[1]:"P";
            scaleSTR = special[1] !== undefined?special[1]:3;
            break;
        case "hyper":
            scaleTYP = special2[2] !== undefined?special2[2]:"LE";
            scaleSTR = special[2] !== undefined?special[2]:1.01;
            break;
        case "atomic":
            scaleTYP = special2[3] !== undefined?special2[3]:"P";
            scaleSTR = special[3] !== undefined?special[3]:4;
            break;
        case "supercritical":
            scaleTYP = special2[4] !== undefined?special2[4]:"E";
            scaleSTR = special[4] !== undefined?special[4]:5;
            break;  
        case "meta":
            scaleTYP = special2[5] !== undefined?special2[5]:"SE";
            scaleSTR = special[5] !== undefined?special[5]:6;
            break;
        case "exotic":
            scaleTYP = special2[6] !== undefined?special2[6]:"P";
            scaleSTR = special[6] !== undefined?special[6]:15;
            break;
        case "instant":
            scaleTYP = special2[7] !== undefined?special2[7]:"P";
            scaleSTR = special[7] !== undefined?special[7]:75;
            break;
        case "wtf":
            scaleTYP = special2[8] !== undefined?special2[8]:"E";
            scaleSTR = special[8] !== undefined?special[8]:100;
            break;
        case "utterlyFucked":
            scaleTYP = special2[9] !== undefined?special2[9]:"SE";
            scaleSTR = special[9] !== undefined?special[9]:60;
            break;
        default:
            throw new Error("type " + type + " doesn't exist!");
    }
    if ((SCALING_STARTS[type][name] !== undefined) && scalingActive(name, amt, type)){
        return cSC(scaleTYP, amt, inv, getScalingStart(type, name), getScalingPower(type, name), scaleSTR);
    }
    return amt;
}

function doAllScaling(amt, name, inv, specialScale, specialType){
    let scalS = amt;
    if (inv){
        scalS = doScaling(name, "scaled", scalS, true, specialScale, specialType);
        scalS = doScaling(name, "superscaled", scalS, true, specialScale, specialType);
        scalS = doScaling(name, "hyper", scalS, true, specialScale, specialType);
        scalS = doScaling(name, "atomic", scalS, true, specialScale, specialType);
        scalS = doScaling(name, "supercritical", scalS, true, specialScale, specialType);
        scalS = doScaling(name, "meta", scalS, true, specialScale, specialType);
        scalS = doScaling(name, "exotic", scalS, true, specialScale, specialType);
        scalS = doScaling(name, "instant", scalS, true, specialScale, specialType);
        scalS = doScaling(name, "wtf", scalS, true, specialScale, specialType);
        scalS = doScaling(name, "utterlyFucked", scalS, true, specialScale, specialType);
    } else {
        scalS = doScaling(name, "utterlyFucked", scalS, false, specialScale, specialType);
        scalS = doScaling(name, "wtf", scalS, false, specialScale, specialType);
        scalS = doScaling(name, "instant", scalS, false, specialScale, specialType);
        scalS = doScaling(name, "exotic", scalS, false, specialScale, specialType);
        scalS = doScaling(name, "meta", scalS, false, specialScale, specialType);
        scalS = doScaling(name, "supercritical", scalS, false, specialScale, specialType);
        scalS = doScaling(name, "atomic", scalS, false, specialScale, specialType);
        scalS = doScaling(name, "hyper", scalS, false, specialScale, specialType);
        scalS = doScaling(name, "superscaled", scalS, false, specialScale, specialType);
        scalS = doScaling(name, "scaled", scalS, false, specialScale, specialType);
    }
    return scalS;
}