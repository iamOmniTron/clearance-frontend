export const formatCurrency = (amount) => new Intl.NumberFormat().format(amount);

export const getPercentageAmount = (amount,percentage)=>((percentage/100)*amount);

export const serializeObjectToUrlParams = (obj)=>{
    return new URLSearchParams(obj).toString();
}

export const scrollToTop = ()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
}

export const extractValueFromInputRef = (ref)=> ref.current.input.value;


export const getRandomNumber = (min,max) => Math.floor(Math.random() * (max - min + 1)) + min;