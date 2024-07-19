// routes/orderHistory.js

import express from "express";
import OrderHistory from "../models/OrderHistory.js";
import nodemailer from "nodemailer";
import User from "../models/User.js";
import Product from '../models/Product.js'; // Adjust the path as needed


const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dev.harshmangal@gmail.com",
    pass: "qkjh xery vjem pysx",
  },
});

// router.post("/", async (req, res) => {
//   try {
//     const {
//       userId,
//       ShipDetails, // Ensure this matches the schema
//       products,
//       paymentMethod,
//       totalAmount,
//       discount,
//       codCharge,
//       finalAmount,
//       voucherCode, // Include voucherCode in the request body
//     } = req.body;

//     const newOrder = new OrderHistory({
//       userId,
//       ShipDetails, // Ensure this matches the schema
//       products,
//       paymentMethod,
//       totalAmount,
//       discount,
//       codCharge,
//       finalAmount,
//       voucherCode, // Set voucherCode in the new order
//     });

//     const savedOrder = await newOrder.save();
//     res.status(201).json(savedOrder);
//   } catch (error) {
//     res.status(400).json({
//       error: error.message,
//     });
//   }
// });
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      ShipDetails,
      products,
      paymentMethod,
      totalAmount,
      discount,
      codCharge,
      finalAmount,
      voucherCode,
    } = req.body;

    const newOrder = new OrderHistory({
      userId,
      ShipDetails,
      products,
      paymentMethod,
      totalAmount,
      discount,
      codCharge,
      finalAmount,
      voucherCode,
    
    });

    const savedOrder = await newOrder.save();

    if (!savedOrder) {
      return res.status(400).json({
        message: "Failed to save order",
      });
    }

    async function updateSalesCount(products) {
      for (const product of products) {
        try {
          // Retrieve the current product data from the database
          const currentProduct = await Product.findById(product.productId);
    
          if (!currentProduct) {
            console.error(`Product with ID ${product.productId} not found.`);
            continue;
          }
    
          // Calculate the new sales count
          const newSalesCount = currentProduct.salesCount + product.quantity;
    
          // Update the product with the new sales count and quantity
          const result = await Product.findByIdAndUpdate(
            product.productId,
            { salesCount: newSalesCount },
            { new: true } // Return the updated document
          );
    
          if (result) {
            console.log(`Successfully updated product with ID ${product.productId}:`, result);
          } else {
            console.error(`Failed to update product with ID ${product.productId}.`);
          }
        } catch (error) {
          console.error(`Error updating product with ID ${product.productId}:`, error);
        }
      }
    }
    
    
   
    updateSalesCount(products);
    console.log(products);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const mailOptions = {
      from: "dev.harshmangal@gmail.com",
      to: user.email,
      subject: "Order Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="text-align: center; padding: 10px 0; border-bottom: 1px solid #ddd;">
    <h1 style="margin: 0; color: pink;">Bud & Tulip</h1>
    <p style="margin: 0; font-size: 16px;">Your Order Has Been Confirmed Successfully!</p>
  </div>
  <div style="padding: 20px;">
    <p>Namaste ${user.firstName},</p>
    <p>Order ID: <strong>${savedOrder._id}</strong></p>
    <p>Order Date & Time: <strong>${new Date(savedOrder.createdAt).toLocaleString()}</strong></p>
    <p>Total Amount: <strong>₹ ${savedOrder.finalAmount}</strong></p>
    <p>Thank you for shopping with us!</p>
    <p>Best regards,</p>
    <p>Bud & Tulip</p>
  </div>
  <div style="padding: 20px; border-top: 1px solid #ddd;">
    <p style="text-align: center; font-weight: bold;">
      We are taking 5-18 working days currently. All pieces at Bud & Tulip are made to order and handcrafted with lots of love, care & gratitude.
    </p>
    <p style="text-align: center;">
      Please drop us an email at <a href="mailto:budandtulip@gmail.com">budandtulip@gmail.com</a> or WhatsApp us if you want order by any particular date.
    </p>
    <p style="text-align: center;">
      For any query WhatsApp us at <a href="tel:+919485701666">9485701666</a>.
    </p>
  </div>
  <div style="text-align: center; padding: 10px 0; border-top: 1px solid #ddd;">
    <p style="margin: 0; font-size: 12px;">Our Team Is Always Happy To Help!</p>
    <p style="margin: 0; font-size: 12px;">
      Love & Regards<br>
      Rashmi Ratusaria<br>
      Founder<br>
      Bud & Tulip
    </p>
  </div>
</div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        return res.status(500).send("Failed to send email");
      }
      console.log("Email sent:", info.response);
      res.status(201).json(savedOrder);
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      message: "Failed to create order",
    });
  }
});
router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await OrderHistory.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
      }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const user = await User.findById(updatedOrder.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // Send an email to the customer
    console.log(updatedOrder.userId.email);
    const mailOptions = {
      from: "dev.harshmangal@gmail.com",
      to: user.email,
      subject: "Order Status Update",
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="text-align: center; padding: 10px 0; border-bottom: 1px solid #ddd;">
        <h1 style="margin: 0; color: pink;">Bud & Tulip</h1>
        <p style="margin: 0; font-size: 16px;">Thank you for your order!</p>
      </div>
      <div style="padding: 20px;">
        <p>Namaste ${user.firstName},</p>
        <p>Your order status has been updated to: <strong>${status}</strong>.</p>
        <p>Order ID: <strong>${id}</strong></p>
        <p>Thank you for shopping with us!</p>
        <p>Best regards,</p>
        <p>Bud & Tulip</p>
      </div>
      <div style="padding: 20px; border-top: 1px solid #ddd;">
        <p style="text-align: center; font-weight: bold;">
          We are taking 5-18 working days currently. All pieces at Bud & Tulip are made to order and handcrafted with lots of love, care & gratitude.
        </p>
        <p style="text-align: center;">
          Please drop us an email at <a href="mailto:budandtulip@gmail.com">budandtulip@gmail.com</a> or WhatsApp us if you want order by any particular date.
        </p>
        <p style="text-align: center;">
          For any query WhatsApp us at <a href="tel:+919485701666">9485701666</a>.
        </p>
      </div>
      <div style="text-align: center; padding: 10px 0; border-top: 1px solid #ddd;">
        <p style="margin: 0; font-size: 12px;">Our Team Is Always Happy To Help!</p>
        <p style="margin: 0; font-size: 12px;">
          Love & Regards<br>
          Rashmi Ratusaria<br>
          Founder<br>
          Bud & Tulip
        </p>
      </div>
    </div>
  `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        return res.status(500).send("Failed to send email");
      }
      console.log("Email sent:", info.response);
      res.send("Order status updated and email sent");
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    console.log(OrderHistory.userId);
    res.status(500).json({
      message: "Failed to update order status",
    });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const orders = await OrderHistory.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
router.get("/orders/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await OrderHistory.find({
      userId,
    });
    if (!orders) {
      return res.status(404).json({
        message: "Orders not found for this user",
      });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
router.get("/:orderId", async (req, res) => {
  try {
    const order = await OrderHistory.findById(req.params.orderId)
      .populate("userId") // Populate user details
      .populate("ShipDetails") // Populate shipping address
      .populate("products._id");
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
export default router;
