const router = require('express').Router();

const db = require('../database');

// helper functions
const { verifyToken } = require('../helpers');

const STATUSES = {
    NEW_BOOKING: 'NEW_BOOKING', //item just added
    CONFIRM_BOOKING: 'CONFIRM_BOOKING', // after lessor approve
    CONFIRM_ITEM_BY_LESSEE: 'CONFIRM_ITEM_BY_LESSEE', // after lessee received item
    CONFIRM_ITEM_BY_LESSOR: 'CONFIRM_ITEM_BY_LESSOR', // order finished (after lessor approve)
};


//middleware that aprove user token and make user obj available
//TODO: resue this function from index.js & delete it from her
async function privateApi(req, res, next) {
    try {
        const { token } = req.headers;

        const decoded = await verifyToken(token);

        const user = await db.users.getUserByEmail(decoded.email);

        req.user = user;

        // call next middleware
        next();
    } catch (err) {
        res.status(401).json({
            err: err.message,
        });
    }
}


// approve order by lessor
router.post('/approveBooking', privateApi, async (req, res) => {
    try {

        const { orderId, userType } = req.body;
        console.log('in aprove orders route*********', userType)
        //update order status
        //and return all orders from user(lessor)
        const orders = await db.orders.updateOrderStatus(orderId, STATUSES.CONFIRM_BOOKING, req.user._id.toString(), userType);
        res.json(orders);
    } catch (error) {
        console.log('approve Booking err', err.message);
        res.json({ err: error.message });
    }
});

// confirm receving item by lessee/lessor
router.post('/confirmReceiveItem', privateApi, async (req, res) => {
    try {
        const { userType, orderId } = req.body;

        const status = userType == 'lessee' ? STATUSES.CONFIRM_ITEM_BY_LESSEE : STATUSES.CONFIRM_ITEM_BY_LESSOR;
        //update order status
        //and return all updated orders to user
        const orders = await db.orders.updateOrderStatus(orderId, status, req.user._id.toString(), userType);
        res.json(orders);
    } catch (error) {
        console.log('confirmReceiveItem err', err.message);
        res.json({ err: error.message });
    }
});




module.exports = router;