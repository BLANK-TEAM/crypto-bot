const moment = require('moment');
const Usermodel = require('../models/User');

const verifyPayment = (id, ctx) => {
    Usermodel.findOne({ UserID: id }).then((user) => {
        if (!user) return;
        if (user) {
            if (user.is_paid === true) {
                ctx.session.__scenes.state.is_paid = true
                return ctx.session.__scenes.state.is_paid
            } else {
                ctx.session.__scenes.state.is_paid = false
                return ctx.session.__scenes.state.is_paid
            }
        }
    })
}

const calculateNextPayment = async (planType, date) => {
    let currentDate;
    if (!planType) return null

    switch (planType) {
        case 'ONE_MONTH':
            currentDate = moment(date)
            currentDate.add(30, 'days').format('YYYY-MM-DD hh:mm')
            return currentDate
        case 'THREE_MONTH':
            currentDate = moment(date)
            currentDate.add(90, 'days').format('YYYY-MM-DD hh:mm')
            return currentDate
        case 'HALF_YEAR':
            currentDate = moment(date)
            currentDate.add(182, 'days').format('YYYY-MM-DD hh:mm')
            return currentDate
        case 'YEAR':
            currentDate = moment(date)
            currentDate.add(365, 'days').format('YYYY-MM-DD hh:mm')
            return currentDate
        default:
            break;
    }
}

const mockPayment = (id) => {
    try {
        Usermodel.findOne({ UserID: id }).then((user) => {
            user.is_paid = true
            
            user.save()
        })
    } catch(e) {
        console.error(e)
    }
}

module.exports = { calculateNextPayment, verifyPayment, mockPayment }