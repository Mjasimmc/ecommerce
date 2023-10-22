const OrderModel = require('../models/orders')

const searchOrder = async (req, res, next) => {
    try {
        const startOfToday = new Date();
        let yesterday = new Date(startOfToday.getTime() - (24 * 60 * 60 * 1000));
        yesterday = yesterday.toISOString().slice(0, 10);
        let todaySum = 0
        let totalSum = 0
        let yesSum = 0
        const dateToday = startOfToday.toISOString().slice(0, 10);
        const todayOrder = await OrderModel.find();
        todayOrder.forEach(element => {
            let date = (element.orderdate).toISOString().slice(0, 10);
            if (element.orderstatus[element.orderstatus.length - 1] != "order cancelled") {
                totalSum += element.totalprice
                if (date == dateToday) {
                    todaySum += element.totalprice
                } else if (yesterday == date) {
                    yesSum += element.totalprice
                }
            }
        });
        req.session.todaySales = {
            today:todayOrder,
            yesterday:yesterday,
            todaySum: todaySum,
            totalSum: totalSum,
            yesSum: yesSum
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};


module.exports = searchOrder