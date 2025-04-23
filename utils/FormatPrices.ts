const formatPrices = (cost: number) =>{
    return new Intl.NumberFormat(
        'en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(cost)
};

export default formatPrices;