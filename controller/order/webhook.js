const stripe = require("../../config/stripe");
const addToCartModel = require("../../model/addToCartModel");
const orderModel = require("../../model/orderModel");

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;

const getLineItems = async (lineItems) => {
  let productItems = [];

  if (lineItems?.data?.length) {
    for (const item of lineItems.data) {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;
      const productData = {
        name: product.name,
        productId: productId,
        price: item.price.unit_amount / 100,
        quantiy: item.quantity,
        image: product.images,
      };

      productItems.push(productData);
    }
  }
  return productItems;
};
const webhook = async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  const payloadString = JSON.stringify(request.body);
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });

  try {
    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  switch (event.type) {
    case "checkout.session.completed":
      const sessions = event.data.object;
      const lineItems = await stripe.checkout.sessions.listLineItems(
        sessions.id
      );
      //console.log("TotalAmount",sessions.amount_total/100)
      const productDetails = await getLineItems(lineItems);

      const orderDetails = {
        productDetails: productDetails,
        email: sessions.customer_email,
        userId: sessions.metadata.userId,
        paymentDetails: {
          paymentId: sessions.payment_intent,
          payment_method_types: sessions.payment_method_types,
          payment_status: sessions.payment_status,
          shipping_options: sessions.shipping_options.map((el) => {
            return { ...el, shipping_amount: el.shipping_amount / 100 };
          }),
          totalAmount: sessions.amount_total / 100,
        },
      };

      const order = new orderModel(orderDetails);
      const saveOrder = await order.save();
      if (saveOrder?._id) {
        console.log(await addToCartModel.find({userId:sessions.metadata.userId}))
        const deleteCartItems = await addToCartModel.deleteMany({
          userId: sessions.metadata.userId,
        });
        
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.status(200).send();
};

module.exports = webhook;
