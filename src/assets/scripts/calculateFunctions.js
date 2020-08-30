export const calculateSign = exchangeRate => {
    return exchangeRate === 'dollar' ? String.fromCharCode(36) : String.fromCharCode(8364)
};

export const calculateValueInExchangeRate = (valueInDollars,exchangeRate,coefficient) => {
    let resultValue;
    exchangeRate === 'dollar' ? resultValue = valueInDollars : resultValue = +(valueInDollars*coefficient).toFixed(2);
    return resultValue;
};
