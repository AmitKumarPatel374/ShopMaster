const orderModel = require("../model/order.model")
const UserModel = require("../model/user.model")
const { emailQueue } = require("../queues/emailQueue")

const createOrder = async (req, res) => {
  try {
    const userId = req.user._id
    const { amountToPay, currencyToPay, selectedMethod, address } = req.body
    console.log(address)

    const user = await UserModel.findById(userId).populate("cart.productId")

    if (!user || user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" })
    }
    const seller_id = user.cart[0].productId.createdBy

    const seller = await UserModel.findById({_id:seller_id})

    const items = user.cart.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
    }))

    // Create new order
    const order = await orderModel.create({
      userId,
      seller_id,
      address_id: address,
      items,
      price: {
        totalAmount: amountToPay,
        currency: currencyToPay,
      },
      paymentStatus: selectedMethod === "ONLINE" ? "Paid" : "Cash on delivery!",
      orderStatus: "Order Placed",
      tracking: {
        currentLocation: "Warehouse",
        history: [{ location: "Warehouse", status: "Order Placed" }],
      },
    })

    const orderId= order._id;


    // Clear cart after placing order
    user.cart = []
    await user.save()

     await emailQueue.add("order_place", {
      email: user.email,
      name: user.fullname || "customer",
      amountToPay,
      orderId
    })

     await emailQueue.add("order_place_seller", {
      email: seller.email,
      name: seller.fullname || "seller",
      userId,
      amountToPay,
      orderId
    })

    

    return res.status(201).json({
      message: "order created successfully!",
      order: order,
    })
  } catch (err) {
    console.log("error in fetchOrder->", err)
    return res.status(500).json({
      message: "internal server error!",
      error: err,
    })
  }
}

const getOrderByIdController = async (req, res) => {
  try {
    const order_id = req.params.order_id

    if (!order_id) {
      return res.status(404).json({
        message: "order_id not found",
      })
    }

    const order = await orderModel.findById(order_id)

    if (!order) {
      return res.status(400).json({
        message: "something went wrong",
      })
    }

    return res.status(200).json({
      message: "order gets successfully!",
      order: order,
    })
  } catch (error) {
    console.log("error in fetchOrder->", error)
    return res.status(500).json({
      message: "internal server error!",
      error: error,
    })
  }
}

const updateOrderController = async (req, res) => {
  try {
    const order_id = req.params.order_id
    const user = req.user;
    const { orderStatus, currentLocation, paymentStatus } = req.body

    if (!order_id) {
      return res.status(404).json({
        message: "order_id not found",
      })
    }

    const findOrder = await orderModel.findById({_id:order_id})
    const customer = await UserModel.findById({_id:findOrder.userId});

    const order = await orderModel.findByIdAndUpdate(
      { _id: order_id },
      {
        paymentStatus: paymentStatus,
        orderStatus: orderStatus,
        tracking: {
          currentLocation: currentLocation,
          history: [{ location: currentLocation, status: orderStatus }],
        },
      }
    )

    if (!order) {
      return res.status(400).json({
        message: "something went wrong",
      })
    }

    await emailQueue.add("update_order", {
      email: customer.email,
      name: customer.fullname || "customer",
      orderStatus,
      currentLocation,
      paymentStatus,
      order_id
    })

    await emailQueue.add("update_order_seller", {
      email: user.email,
      name: user.fullname || "customer",
      orderStatus,
      currentLocation,
      paymentStatus,
      order_id
    })

    

    return res.status(200).json({
      message: "order updated successfully!",
      order: order,
    })
  } catch (error) {
    console.log("error in fetchOrder->", error)
    return res.status(500).json({
      message: "internal server error!",
      error: error,
    })
  }
}

const getOrderController = async (req, res) => {
  try {
    const userId = req.user._id

    const orders = await orderModel.find({ userId }).populate("items.productId")

    if (!orders) {
      return res.status(400).json({
        message: "something went wrong",
      })
    }

    return res.status(200).json({
      message: "order gets successfully!",
      orders: orders,
    })
  } catch (error) {
    console.log("error in fetchOrder->", error)
    return res.status(500).json({
      message: "internal server error!",
      error: error,
    })
  }
}

const trackOrderController = async (req, res) => {
  try {
    const orderId = req.params.order_id

    const order = await orderModel.findById(orderId).populate("items.productId")

    if (!order) {
      return res.status(400).json({
        message: "something went wrong",
      })
    }

    return res.status(200).json({
      message: "order fetch successfully!",
      order: order,
    })
  } catch (error) {
    console.log("error in trackOrder->", error)
    return res.status(500).json({
      message: "internal server error!",
      error: error,
    })
  }
}

const adminOrdersController = async (req, res) => {
  try {
    const userId = req.user._id

    const order = await orderModel.find({ seller_id: userId }).populate("items.productId")

    if (!order) {
      return res.status(400).json({
        message: "something went wrong",
      })
    }
    return res.status(200).json({
      message: "orders fetch successfully!",
      orders: order,
    })
  } catch (error) {
    console.log("error in fetchAdmin Order->", error)
    return res.status(500).json({
      message: "internal server error!",
      error: error,
    })
  }
}

module.exports = {
  createOrder,
  getOrderController,
  updateOrderController,
  trackOrderController,
  adminOrdersController,
  getOrderByIdController,
}
